// Asegura que el script se ejecute una vez que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    const banner = document.getElementById("banner-cookies");
    const botonAceptar = document.getElementById("btn-aceptar");
    const botonRechazar = document.getElementById("btn-rechazar");

    const estadoCookies = localStorage.getItem("cookiesAceptadas");

    if (estadoCookies === "true" || estadoCookies === "false") {

        banner.style.display = "none"; 
    }

   
    botonAceptar.onclick = function() {
        localStorage.setItem("cookiesAceptadas", "true"); 
        banner.style.display = "none";                 
        alert("¡Gracias! Has aceptado el uso de cookies en SmartWare."); 
    };

    // Evento onclick para el botón Rechazar
    botonRechazar.onclick = function() {
        localStorage.setItem("cookiesAceptadas", "false"); 
        banner.style.display = "none";                    
    };
});
