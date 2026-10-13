const buttons = document.querySelectorAll("footer button");

const plusButton = buttons[0];
const minusButton = buttons[1];

const colorSelect = document.querySelector("footer select");

let fontSize = parseFloat(
  getComputedStyle(document.body).fontSize
);

plusButton.addEventListener("click", function () {
  fontSize = fontSize + 1;

  document.body.style.fontSize = fontSize + "px";
});

minusButton.addEventListener("click", function () {
  if (fontSize > 1) {
    fontSize = fontSize - 1;

    document.body.style.fontSize = fontSize + "px";
  }
});

colorSelect.addEventListener("change", function () {
  document.body.style.backgroundColor = colorSelect.value;
});