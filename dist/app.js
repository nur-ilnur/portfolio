const grid = document.querySelector('#project-grid');
const shortsGrid = document.querySelector('#shorts-grid');
const podcastsGrid = document.querySelector('#podcasts-grid');
const playIcon = '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4 20 12 7 20Z"/></svg></span>';
const arrowIcon = '<svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const categories = { youtube: 'YouTube', podcast: 'Подкаст', integration: 'Интеграция', shorts: 'Shorts / Reels' };
function makeCard(project) {
  const card = document.createElement('article');
  card.className = `project-card${project.category === 'shorts' ? ' short-card' : ''}`;
  card.dataset.category = project.category;
  const action = document.createElement(project.youtubeId ? 'button' : 'a');
  action.className = 'project-action';
  action.setAttribute('aria-label', `Смотреть: ${project.title}${project.youtubeId ? '' : ' на Яндекс Диске'}`);
  if (project.youtubeId) {
    action.type = 'button';
    action.addEventListener('click', () => openVideo(project));
  } else {
    action.href = project.url;
    action.target = '_blank';
    action.rel = 'noopener noreferrer';
  }
  const img = document.createElement('img');
  img.src = project.image;
  img.alt = project.title;
  img.loading = 'lazy';
  img.decoding = 'async';
  action.append(img);
  action.insertAdjacentHTML('beforeend', playIcon);
  const platform = document.createElement('span');
  platform.className = 'project-platform';
  platform.textContent = project.youtubeId ? 'YouTube' : 'Яндекс Диск';
  if (!project.youtubeId) platform.insertAdjacentHTML('beforeend', ' ' + arrowIcon);
  action.append(platform);
  const info = document.createElement('div');
  info.className = 'project-info';
  const text = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = project.title;
  const category = document.createElement('p');
  category.textContent = `${categories[project.category]} · Монтаж`;
  text.append(title, category);
  const arrow = document.createElement('span');
  arrow.className = 'project-arrow';
  arrow.innerHTML = arrowIcon;
  arrow.setAttribute('aria-hidden', 'true');
  info.append(text, arrow);
  card.append(action, info);
  return card;
}
window.PORTFOLIO_PROJECTS.forEach(project => {
  const target = project.category === 'shorts' ? shortsGrid : project.category === 'podcast' ? podcastsGrid : grid;
  target.append(makeCard(project));
});
// Counts follow the project list when works are added or moved.
document.querySelectorAll('[data-count]').forEach(element => {
  const count = window.PORTFOLIO_PROJECTS.filter(project => element.dataset.count === 'all' || project.category === element.dataset.count).length;
  element.textContent = element.hasAttribute('data-count-pad') ? String(count).padStart(2, '0') : String(count);
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.project-card').forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
    grid.hidden = ['shorts', 'podcast'].includes(selected);
    document.querySelector('#shorts-section').hidden = !['all', 'shorts'].includes(selected);
    document.querySelector('#podcasts-section').hidden = !['all', 'podcast'].includes(selected);
    const count = window.PORTFOLIO_PROJECTS.filter(project => selected === 'all' || project.category === selected).length;
    document.querySelector('#filter-status').textContent = `Работ в выбранной категории: ${count}`;
  });
});
const dialog = document.querySelector('#video-dialog');
let videoTrigger;
function openVideo(project) {
  videoTrigger = document.activeElement;
  dialog.classList.toggle('video-portrait', project.category === 'shorts');
  document.querySelector('#video-title').textContent = project.title;
  document.querySelector('#video-original').href = project.url;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0`;
  iframe.title = project.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('#video-container').replaceChildren(iframe);
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.querySelector('#video-container').replaceChildren(); document.body.classList.remove('modal-open'); videoTrigger?.focus(); });

const showreel = document.querySelector('#showreel');
showreel.addEventListener('click', event => {
  event.preventDefault();
  openVideo({ title: 'Шоурил', category: 'showreel', youtubeId: showreel.dataset.youtubeId, url: showreel.href });
});
