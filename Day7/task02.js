const box = document.querySelector("footer div");

box.addEventListener("click", function () {
  let name = "";
  while (name === "") {
    name = prompt("What's your name?");

    // Cancel returns null.
    if (name === null) {
      name = "";
    }

    name = name.trim();
  }

  const answer = confirm(
    "Are you sure that " + name + " is your name ?"
  );

  if (answer === true) {
    const message = "Hello " + name + "!";

    alert(message);
    box.textContent = message;
  }
});