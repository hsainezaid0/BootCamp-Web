const box = document.querySelector("footer div");

let text = "";

document.addEventListener("keydown", function (event) {
  if (
    event.key.length === 1 &&
    event.ctrlKey === false &&
    event.altKey === false &&
    event.metaKey === false
  ) {
    text = text + event.key;

    text = text.slice(-42);

    box.textContent = text;
  }
});