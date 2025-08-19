const darkModeBtn = document.querySelector(".dark-mode-btn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        // HEADER
        document.querySelector(".dark-mode-btn img").src = isDark ? "img/dark-mode_dark.png" : "img/dark-mode.png";
        document.querySelector(".notifications img").src = isDark ? "img/notifications_dark.png" : "img/notifications.png";
        document.querySelector(".settings img").src = isDark ? "img/settings_dark.png" : "img/settings.png";

        // JOGO-CONTEUDO
        document.querySelector(".jogo-conteudo .tela").src = isDark ? "img/tela_dark.png" : "img/tela-1.png";
        document.querySelector(".jogo-conteudo .placa").src = isDark ? "img/Botao_dark.png" : "img/Botao.png";
        document.querySelector(".jogo-conteudo .nome-jogo").src = isDark ? "img/nome-jogo_dark.png" : "img/nome-jogo.png";
        document.querySelector(".jogo-conteudo .logo-jogo").src = isDark ? "img/logo2_dark.png" : "img/logo2.png";
    });
}

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY === 0) {
            header.style.opacity = "1";  
        } else {
            header.style.opacity = "0.2"; 
        }
    });
}
