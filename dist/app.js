const grid = document.querySelector('#project-grid');
const shortsGrid = document.querySelector('#shorts-grid');
const playIcon = '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4 20 12 7 20Z"/></svg></span>';
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
  platform.textContent = project.youtubeId ? 'YouTube' : 'Яндекс Диск ↗';
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
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');
  info.append(text, arrow);
  card.append(action, info);
  return card;
}
window.PORTFOLIO_PROJECTS.forEach(project => (project.category === 'shorts' ? shortsGrid : grid).append(makeCard(project)));
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.project-card').forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
    grid.hidden = selected === 'shorts';
    document.querySelector('#shorts-section').hidden = !['all', 'shorts'].includes(selected);
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
