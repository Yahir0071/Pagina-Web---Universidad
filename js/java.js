

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Selección de los elementos del DOM usando los nuevos IDs
    const banner = document.getElementById("banner-cookies");
    const btnNecesarias = document.getElementById("btn-necesarias");
    const btnPersonalizar = document.getElementById("btn-personalizar");
    const btnAceptarTodas = document.getElementById("btn-aceptar-todas");

    const estadoCookies = sessionStorage.getItem("cookiesAceptadas");
    if (estadoCookies === "true") {
        banner.style.display = "none"; 
    }

    function procesarAceptacion() {
        sessionStorage.setItem("cookiesAceptadas", "true"); 
        banner.style.display = "none";                    
    }

    btnNecesarias.onclick = function() {
        procesarAceptacion();
    };

    btnAceptarTodas.onclick = function() {
        procesarAceptacion();
        alert("¡Excelente! Has permitido todas las cookies para mejorar tu experiencia en SmartWare.");
    };

    btnPersonalizar.onclick = function() {
        alert("Abriendo el panel dinámico de configuración de privacidad...");
        procesarAceptacion();
    };
});
