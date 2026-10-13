const paragraphs = document.querySelectorAll("p");

for (let i = 0; i < paragraphs.length; i = i + 1) {
    const paragraph = paragraphs[i];

    paragraph.addEventListener("mouseenter", function () {
        paragraph.classList.add("blue");
    });

    paragraph.addEventListener("mouseleave", function () {
        paragraph.classList.remove("blue");
    });

    paragraph.addEventListener("click", function () {
        paragraph.classList.toggle("highlighted");
    });
}