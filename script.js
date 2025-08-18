
const darkModeBtn = document.querySelector(".dark-mode-btn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
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
