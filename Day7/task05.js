const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.beginPath();
context.moveTo(6, 6);
context.lineTo(14, 10);
context.lineTo(6, 14);
context.closePath();
context.fillStyle = 'white';
context.strokeStyle = 'white';
context.lineWidth = 1;
context.fill();
context.stroke();
const audio = document.querySelector('audio');
audio.src = 'https://universal-soundbank.com/sounds/13631.mp3';
const [pause, stop] = document.querySelectorAll('footer button');
function play() {
  audio.play().catch(() => {
    window.alert('The audio could not be played. Check your connection and the audio URL.');
  });
}
canvas.style.cursor = 'pointer';
canvas.tabIndex = 0;
canvas.setAttribute('role', 'button');
canvas.setAttribute('aria-label', 'Play music');
canvas.addEventListener('click', play);
canvas.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    play();
  }
});
pause.addEventListener('click', () => audio.pause());
stop.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
});
