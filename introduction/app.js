import { dbeBrand } from './brand.js';
import { openSourcePage, homeIntroductionSection, applicationPage } from './commons-entry.js';
import { prepareIntroduction } from './lib/introduction.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const views = [['overview','Overview'],['opensource','Open source'],['apply','Introduction']];
let view = 'overview', draft = {}, prepared = null, toastTimer;
function toast(message) { $('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4000); }
function intro(label,title,description) { return `<section class="page-intro"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#overview">Home</a><span>/ ${views.find(([id])=>id===view)?.[1]??'Embassy Commons'}</span></nav><div class="eyebrow">${label}</div><h1 class="page-title">${title}</h1><p>${description}</p></section>`; }
function rings() { return `<svg class="rings" viewBox="0 0 2500 2694" aria-hidden="true">${[[1250,1249,1242],[1250,1499.5,1076],[1250,1534,773],[1250,1628,594],[1250,1962,633],[1250,1962,512]].map(([cx,cy,r])=>`<circle class="ring" cx="${cx}" cy="${cy}" r="${r}"/>`).join('')}</svg>`; }
function overview() { return `<section class="hero"><div class="hero-copy"><div class="eyebrow">DUTCH BITCOIN EMBASSY · EMBASSY COMMONS</div><h1>One foundation.<br>Every embassy.<br>Your own path.</h1><p>Built by volunteers to help people and Bitcoin. Your team runs its own website, hosting, data and decisions. No required affiliation.</p><div class="hero-actions"><a class="button" href="#opensource">Start independently <span>→</span></a><a class="button outline" href="#apply">Request an introduction</a></div></div><div class="hero-visual">${rings()}</div><span class="hero-hint">OPEN SOURCE · LOCAL OWNERSHIP</span></section>${homeIntroductionSection()}<section class="section"><div class="section-heading"><div><div class="eyebrow">INDEPENDENT BY DESIGN</div><h2>Your community.<br>Your responsibility.</h2><p>Fork the source, adapt the knowledge and host your own initiative. No DBE login, paid subscription, central database or continuing permission is required to run the supplied toolkit.</p></div><a class="text-link" href="https://github.com/Vinnybtc/embassy-commons" target="_blank" rel="noopener">Get the source code <span>↗</span></a></div></section>`; }
function updateHeader() { const solid=view==='overview'?window.scrollY>($('.hero')?.offsetHeight??0)-64:window.scrollY>16;$('.site-header').classList.toggle('solid',solid);$('.brand-logo').src=view==='overview'&&!solid?dbeBrand.light:dbeBrand.dark; }
function render(scroll=true) {
  document.body.dataset.view=view;
  document.title='Embassy Commons · '+(views.find(([id])=>id===view)?.[1]??'Overview');
  document.querySelector('link[rel="icon"]').href=dbeBrand.favicon;
  $('.wordmark').innerHTML=`<img class="brand-logo" src="${view==='overview'?dbeBrand.light:dbeBrand.dark}" alt=""><span class="brand-copy">Dutch Bitcoin<br>Embassy</span>`;
  $('#nav').innerHTML=views.map(([id,name])=>`<a href="#${id}" class="${view===id?'active':''}" ${view===id?'aria-current="page"':''}>${name}</a>`).join('');$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');
  $('#main').innerHTML=view==='apply'?applicationPage(intro,esc,draft,prepared):view==='opensource'?openSourcePage(intro):overview();
  $('#footer').innerHTML=`<div class="footer-top"><a class="footer-brand" href="#overview" aria-label="Dutch Bitcoin Embassy Commons"><img src="${dbeBrand.light}" alt="Dutch Bitcoin Embassy"></a><p class="footer-intro">Voluntarily shared to help people and Bitcoin. Independently run by each local community.</p></div><div class="footer-cols"><div class="footer-col"><h3>EMBASSY COMMONS</h3><a href="#overview">Overview</a><a href="#opensource">Open source</a><a href="#apply">Request an introduction</a></div><div class="footer-col"><h3>START INDEPENDENTLY</h3><a href="https://github.com/Vinnybtc/embassy-commons" target="_blank" rel="noopener">Source code ↗</a><a href="https://github.com/Vinnybtc/embassy-commons/blob/main/docs/SELF-HOST.md" target="_blank" rel="noopener">Self-hosting guide ↗</a></div><div class="footer-col"><h3>RIGHTS</h3><a href="https://opensource.org/license/mit" target="_blank" rel="noopener">Code · MIT</a><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Knowledge · CC BY 4.0</a></div><div class="footer-col"><h3>DUTCH BITCOIN EMBASSY</h3><a href="https://www.dutchbitcoinembassy.com/community/" target="_blank" rel="noopener">Community ↗</a><a href="mailto:info@dutchbitcoinembassy.com">Contact the volunteers</a></div></div><div class="footer-base"><span>DUTCH BITCOIN EMBASSY · COMMONS</span><span>VOLUNTARY · OPEN SOURCE · INDEPENDENT</span></div>`;
  if(view==='apply') { $('#introduction-form').addEventListener('input',capture);$('#introduction-form').addEventListener('submit',submit); }
  if(scroll) window.scrollTo({top:0,behavior:'instant'});
  updateHeader();
}
function capture() { draft=Object.fromEntries(new FormData($('#introduction-form')));if(prepared){prepared=null;$('.introduction-result')?.remove();} }
function submit(event) { event.preventDefault();capture();if(!$('#introduction-form').reportValidity())return;try{prepared=prepareIntroduction(draft);render(false);$('.introduction-result').scrollIntoView({behavior:'smooth',block:'start'});}catch(error){$('#introduction-errors').textContent=error.message;$('#introduction-errors').classList.add('visible');} }
document.addEventListener('click',async event=>{ if(event.target.closest('a.skip')){event.preventDefault();$('#main').focus();$('#main').scrollIntoView({block:'start'});return;}if(event.target.closest('[data-action="copy-introduction"]')&&prepared){try{await navigator.clipboard.writeText(prepared.body);toast('Message copied. Review and send it from your email app.');}catch{toast('Select and copy the message above.');}} });
$('#menu').addEventListener('click',()=>{$('#nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String($('#nav').classList.contains('open')));});
window.addEventListener('scroll',updateHeader,{passive:true});
function route(){const next=location.hash.slice(1);if(next==='main'){render(false);$('#main').focus();return;}view=views.some(([id])=>id===next)?next:'overview';render();}
window.addEventListener('hashchange',route);
route();
