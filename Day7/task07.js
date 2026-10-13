const footer = document.querySelector("footer");
const messageBox = document.querySelector("footer div");
const acceptLink = messageBox.querySelector("a");

const deleteBox = document.createElement("div");
const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete the cookie";

deleteBox.appendChild(deleteButton);

function cookieIsAccepted() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i = i + 1) {
    if (cookies[i].trim() === "acceptsCookies=true") {
      return true;
    }
  }

  return false;
}

function showAcceptedState() {
  messageBox.style.display = "none";
  footer.appendChild(deleteBox);
}

if (cookieIsAccepted() === true) {
  showAcceptedState();
}

acceptLink.addEventListener("click", function (event) {
  event.preventDefault();

  const expiration = new Date();

  expiration.setTime(
    expiration.getTime() + 24 * 60 * 60 * 1000
  );

  document.cookie =
    "acceptsCookies=true; expires=" +
    expiration.toUTCString() +
    "; path=/";

  showAcceptedState();
});

deleteButton.addEventListener("click", function () {
  document.cookie =
    "acceptsCookies=; max-age=0; path=/";

  deleteBox.remove();
  messageBox.style.display = "";
});