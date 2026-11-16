const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

const myEmail = "zamar.ramazanova@gmail.com";

year.textContent = String(new Date().getFullYear());

menuButton.addEventListener("click", toggleMenu);

siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        closeMenu();
    }
});

form.addEventListener("submit", sendMessage);

function toggleMenu() {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
    siteNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
}

function sendMessage(event) {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();

    if (!name || !email || !message) {
        showNote("Заполните имя, почту и сообщение.");
        return;
    }

    const subject = encodeURIComponent("Сообщение с портфолио от " + name);
    const body = encodeURIComponent(name + " (" + email + ")\n\n" + message);
    window.location.href = "mailto:" + myEmail + "?subject=" + subject + "&body=" + body;
    showNote("Открываю почту с готовым письмом.");
    form.reset();
}

function showNote(text) {
    formNote.textContent = text;
}
