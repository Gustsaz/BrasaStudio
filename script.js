const darkModeBtn = document.querySelector(".dark-mode-btn");

// Inicializar com modo escuro por padrão
document.body.classList.add("dark-mode");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        // Animar a troca de tema
        document.body.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        document.body.style.opacity = "0.8";
        
        const isDark = document.body.classList.contains("dark-mode");
        
        if (isDark) {
            // Mudar para modo claro
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        } else {
            // Mudar para modo escuro
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
        }

        const isDarkAfterToggle = document.body.classList.contains("dark-mode");

        // Animar a troca das imagens
        const elements = [
            { selector: ".brasa", dark: "img/brasa_dark.png", light: "img/brasa.png" },
            { selector: ".dark-mode-btn img", dark: "img/dark-mode_dark.png", light: "img/dark-mode.png" },
            { selector: ".notifications img", dark: "img/notifications_dark.png", light: "img/notifications.png" },
            { selector: ".generic-avatar img", dark: "img/Generic_avatar_dark.png", light: "img/Generic_avatar.png" },
            { selector: ".settings img", dark: "img/settings_dark.png", light: "img/settings.png" },
            { selector: ".jogo-conteudo .tela", dark: "img/tela_dark.png", light: "img/tela-1.png" },
            { selector: ".jogo-conteudo .placa", dark: "img/Botao_dark.png", light: "img/Botao.png" },
            { selector: ".jogo-conteudo .nome-jogo", dark: "img/nome-jogo_dark.png", light: "img/nome-jogo.png" }
        ];

        elements.forEach(element => {
            const el = document.querySelector(element.selector);
            if (el) {
                el.style.transition = "opacity 0.3s ease";
                el.style.opacity = "0.5";
                
                setTimeout(() => {
                    el.src = isDarkAfterToggle ? element.dark : element.light;
                    el.style.opacity = "1";
                }, 150);
            }
        });

        setTimeout(() => {
            document.body.style.opacity = "1";
        }, 400);
    });
}

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}


// Define a cor da wave com base no atributo data-wave
document.querySelectorAll(".criador").forEach(criador => {
    const color = criador.getAttribute("data-wave") || "#3f68c5";
    const wave = criador.querySelector(".wave");
    if (wave) {
        wave.style.backgroundColor = color;
    }
});

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classes de animação aos elementos
    const elementsToAnimate = [
        { selector: '.empresa', animation: 'fade-in' },
        { selector: '.videos', animation: 'fade-in' },
        { selector: '.jogos', animation: 'fade-in' },
        { selector: '.criadores', animation: 'fade-in' },
        { selector: '.footer', animation: 'fade-in' },
        { selector: '.empresa-text', animation: 'slide-in-right' },
        { selector: '.empresa-imgs', animation: 'slide-in-left' },
        { selector: '.card', animation: 'scale-in' },
        { selector: '.jogos-container', animation: 'fade-in' },
        { selector: '.ultimo-comentario', animation: 'slide-in-left' }
    ];

    elementsToAnimate.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add(animation);
            observer.observe(el);
        });
    });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initScrollAnimations);
