// Modal de Éxito - Contacto
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const modal = document.getElementById('modal-exito');

    if (!formulario || !modal) return;

    // Prevenir envío por defecto y mostrar modal
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        abrirModal();
        formulario.reset();
    });

    // Cerrar modal al hacer clic fuera de la caja
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar modal al presionar Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('activo')) {
            cerrarModal();
        }
    });
});

function abrirModal() {
    const modal = document.getElementById('modal-exito');
    if (modal) {
        modal.classList.add('activo');
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-exito');
    if (modal) {
        modal.classList.remove('activo');
    }
}