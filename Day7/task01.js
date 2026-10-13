const box = document.querySelector('footer > div');
let clicks = 0;
box.textContent = clicks;
box.addEventListener('click', () => {
  clicks += 1;
  box.textContent = clicks;
});
