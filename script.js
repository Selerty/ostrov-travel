const hero = document.querySelector('.hero');
const video = document.querySelector('#hero-video');
const toggle = document.querySelector('#video-toggle');
const toggleIcon = toggle.querySelector('use');
const toggleText = toggle.querySelector('span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;
let videoFailed = false;
let observerPaused = false;

function prepareVideo() {
  if (!video.getAttribute('src')) {
    video.src = video.dataset.src;
    video.load();
  }
}
function updateVideoButton() {
  const playing = !video.paused && !videoFailed;
  toggle.setAttribute('aria-label', playing ? 'Приостановить фоновое видео' : 'Воспроизвести фоновое видео');
  toggleIcon.setAttribute('href', playing ? '#pause' : '#play');
  toggleText.textContent = playing ? 'Пауза видео' : 'Включить видео';
  hero.classList.toggle('is-playing', playing);
}
async function playBackground() {
  if (videoFailed) return;
  prepareVideo();
  try { await video.play(); } catch { updateVideoButton(); }
}
video.addEventListener('playing', () => {
  hero.classList.add('has-played');
  updateVideoButton();
});
video.addEventListener('pause', updateVideoButton);
video.addEventListener('error', () => {
  videoFailed = true;
  hero.classList.remove('is-playing', 'has-played');
  toggle.disabled = true;
  toggleText.textContent = 'Видео недоступно';
  toggle.setAttribute('aria-label', 'Видео недоступно. Показана фотография.');
});
toggle.addEventListener('click', () => {
  if (video.paused) { manuallyPaused = false; playBackground(); }
  else { manuallyPaused = true; video.pause(); }
});
if (!reducedMotion.matches && !navigator.connection?.saveData) playBackground();
reducedMotion.addEventListener('change', event => {
  if (event.matches) { manuallyPaused = true; video.pause(); }
});
const visibilityObserver = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting && !video.paused) { observerPaused = true; video.pause(); }
  else if (entry.isIntersecting && observerPaused) {
    observerPaused = false;
    if (!manuallyPaused && !reducedMotion.matches) playBackground();
  }
}, { threshold: 0.05 });
visibilityObserver.observe(hero);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (!video.paused) { observerPaused = true; video.pause(); }
  } else if (observerPaused && !manuallyPaused && !reducedMotion.matches && !dialog.open) {
    observerPaused = false;
    playBackground();
  }
});

const dialog = document.querySelector('#film-dialog');
const film = document.querySelector('#film-video');
let wasPlaying = false;
document.querySelector('#watch-film').addEventListener('click', async () => {
  wasPlaying = !video.paused;
  video.pause();
  dialog.showModal();
  if (!film.src) film.src = video.dataset.src;
  try { await film.play(); } catch { /* Native controls remain available. */ }
});
document.querySelector('#close-film').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  film.pause();
  if (wasPlaying && !manuallyPaused && !reducedMotion.matches) playBackground();
});

const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Открыть меню'); }
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const finder = document.querySelector('#trip-finder');
const departure = document.querySelector('#departure');
const today = new Date();
departure.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const tripSummary = document.querySelector('#trip-summary');
function showSelection(destination, date, travelers) {
  const when = date ? new Date(`${date}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : 'даты подберём вместе';
  const people = { '1': '1 путешественник', '2': '2 путешественника', '3': '3 путешественника', '4': '4 путешественника' }[travelers];
  tripSummary.textContent = `Ваше путешествие: ${destination}\n${when} · ${people}`;
  tripSummary.hidden = false;
}
finder.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(finder);
  showSelection(data.get('destination'), data.get('departure'), data.get('travelers'));
  document.querySelector('#contact').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
document.querySelectorAll('[data-trip]').forEach(link => link.addEventListener('click', () => {
  const selection = new FormData(finder);
  showSelection(link.dataset.trip, selection.get('departure'), selection.get('travelers'));
}));
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.textContent = 'Так будет выглядеть отправка заявки. Сейчас это демонстрация: данные остаются только на странице, заявка не отправлена.';
  status.hidden = false;
});

// Keep the native traveler control readable at phone widths.
const compactLayout = window.matchMedia('(max-width: 720px)');
const travelerOptions = [...document.querySelector('#travelers').options];
const fullTravelerLabels = travelerOptions.map(option => option.textContent);
function adaptTravelerLabels() {
  travelerOptions.forEach((option, index) => {
    option.textContent = compactLayout.matches ? ['2 человека', '1 человек', '3 человека', '4 человека'][index] : fullTravelerLabels[index];
  });
}
adaptTravelerLabels();
compactLayout.addEventListener('change', adaptTravelerLabels);
