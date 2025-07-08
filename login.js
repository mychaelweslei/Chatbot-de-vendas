const CHATBOT_PAGE = "t.html";

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); // <--- evita o POST padrão
    login();
});

function login() {
    const emailInput = document.getElementById("email");
    const message = document.getElementById("message");
    const email = emailInput.value.trim();

    message.textContent = "";
    message.className = "";

    if (!isValidEmail(email)) {
        showMessage("Por favor, insira um e-mail válido.", "error");
        return;
    }

    localStorage.setItem("userEmail", email);

    showMessage("✅ E-mail salvo com sucesso! Redirecionando...", "success");

    setTimeout(() => {
        window.location.href = CHATBOT_PAGE;
    }, 1000);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showMessage(text, type) {
    const message = document.getElementById("message");
    message.textContent = text;
    message.className = type;
}

window.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const saved = localStorage.getItem("userEmail");

    emailInput.focus();

    if (saved) {
        emailInput.value = saved;
    }

    emailInput.addEventListener("input", () => {
        showMessage("", "");
    });
});
