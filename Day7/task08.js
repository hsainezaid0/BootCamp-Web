const links = document.querySelectorAll("a");

for (let i = 0; i < links.length; i = i + 1) {
    const target = links[i].getAttribute("target");

    if (target !== "_blank") {
        links[i].style.opacity = "0.5";
    }
}