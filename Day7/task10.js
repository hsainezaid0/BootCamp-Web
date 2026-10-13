const input = document.querySelector("#listItem");
const button = document.querySelector("button");

button.addEventListener("click", function (event) {
    event.preventDefault();

    const item = document.createElement("div");

    item.textContent = input.value;

    input.after(item);

    input.value = "";
});