// Presentation identity only; hosted access is enforced by the hosting platform.
export function isCommonsPublisher(config, registry) {
  return config?.name === 'Embassy Commons' && registry?.chapters?.some(chapter => chapter.id === 'nl-dutch-bitcoin-embassy' && chapter.status === 'source') === true;
}
