const button = document.querySelector("button");

button.addEventListener("click", function () {
    const paragraphs = document.querySelectorAll("p");

    for (let i = 0; i < paragraphs.length; i = i + 1) {
        paragraphs[i].style.display = "none";
    }
});