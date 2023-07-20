const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = document.querySelectorAll('.player__slider');
const fullScreen = document.querySelector('.fullscreen');

const playHandler = () => {
  const switching = video.paused ? 'play' : 'pause';
  video[switching]();
};

function updateButtonHandler() {
  const switching = this.paused ? '►' : '❚ ❚';
  toggle.textContent = switching;
}

function skipHandler() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function progressHandler() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;

  if (percent === 100) {
    progressBar.style.flexBasis = 0;
  }
}

function scrubHandler(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleRangeUpdateHandler() {
  video[this.name] = this.value;
}

function fullScreenHandler() {
  if (player) {
    player.classList.toggle('fullscreen');
  }
}

video.addEventListener('click', playHandler);
video.addEventListener('pause', updateButtonHandler);
video.addEventListener('play', updateButtonHandler);
video.addEventListener('timeupdate', progressHandler);
toggle.addEventListener('click', playHandler);
fullScreen.addEventListener('click', fullScreenHandler);
skipButtons.forEach((btn) => btn.addEventListener('click', skipHandler));
let mousedown = false;
progress.addEventListener('click', scrubHandler);
progress.addEventListener('mousemove', (e) => mousedown && scrubHandler(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
ranges.forEach((range) =>
  range.addEventListener('change', handleRangeUpdateHandler)
);
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdateHandler)
);
