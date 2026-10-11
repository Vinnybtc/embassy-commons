// Portable ZIP writer: STORE, UTF-8 names, CRC-32. No server or dependency.
const encoder = new TextEncoder();
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let value = n;
  for (let i = 0; i < 8; i++) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
  crcTable[n] = value >>> 0;
}

export function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) value = crcTable[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

export function safeFilePath(path) {
  return typeof path === 'string' && path.length > 0 && !path.startsWith('/') &&
    !/[\\\u0000-\u001f\u007f]/.test(path) && !/^[a-zA-Z]:/.test(path) &&
    path.split('/').every(part => part !== '' && part !== '.' && part !== '..');
}

function header(size) { return { bytes: new Uint8Array(size), view: null }; }
function fields(record) { record.view = new DataView(record.bytes.buffer); return record; }
function concat(chunks, size) {
  const output = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
  return output;
}

export function zipFiles(files) {
  if (!files || typeof files !== 'object' || Array.isArray(files)) throw new TypeError('files must be a path-to-text object');
  const entries = Object.entries(files).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length > 65535) throw new RangeError('ZIP64 is not supported');
  const localChunks = [], centralChunks = [];
  let offset = 0, centralSize = 0;
  for (const [path, content] of entries) {
    if (!safeFilePath(path)) throw new Error(`Unsafe ZIP path: ${path}`);
    if (typeof content !== 'string') throw new TypeError(`ZIP file must be text: ${path}`);
    const name = encoder.encode(path), data = encoder.encode(content);
    if (name.length > 65535 || data.length > 0xffffffff || offset > 0xffffffff) throw new RangeError('ZIP64 is not supported');
    const crc = crc32(data);
    const local = fields(header(30));
    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, 20, true);
    local.view.setUint16(6, 0x0800, true);
    // Fixed 2026-10-11 midnight makes archives reproducible.
    local.view.setUint16(12, ((2026 - 1980) << 9) | (10 << 5) | 11, true);
    local.view.setUint32(14, crc, true);
    local.view.setUint32(18, data.length, true);
    local.view.setUint32(22, data.length, true);
    local.view.setUint16(26, name.length, true);
    localChunks.push(local.bytes, name, data);
    const central = fields(header(46));
    central.view.setUint32(0, 0x02014b50, true);
    central.view.setUint16(4, 20, true);
    central.view.setUint16(6, 20, true);
    central.view.setUint16(8, 0x0800, true);
    central.view.setUint16(14, ((2026 - 1980) << 9) | (10 << 5) | 11, true);
    central.view.setUint32(16, crc, true);
    central.view.setUint32(20, data.length, true);
    central.view.setUint32(24, data.length, true);
    central.view.setUint16(28, name.length, true);
    central.view.setUint32(42, offset, true);
    centralChunks.push(central.bytes, name);
    centralSize += 46 + name.length;
    offset += 30 + name.length + data.length;
  }
  if (offset + centralSize > 0xffffffff) throw new RangeError('ZIP64 is not supported');
  const end = fields(header(22));
  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(8, entries.length, true);
  end.view.setUint16(10, entries.length, true);
  end.view.setUint32(12, centralSize, true);
  end.view.setUint32(16, offset, true);
  return concat([...localChunks, ...centralChunks, end.bytes], offset + centralSize + 22);
}
