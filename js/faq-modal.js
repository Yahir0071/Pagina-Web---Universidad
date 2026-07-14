document.addEventListener('DOMContentLoaded', function() {

    const formulario = document.getElementById('formulario-pregunta');
    const modal = document.getElementById('modal-pregunta');

    if (!formulario || !modal) return;

    // Prevenir envío por defecto y procesar datos en el modal
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura de datos ingresados en el formulario
        const nombre = document.getElementById('faq-nombre').value;
        const correo = document.getElementById('faq-correo').value;
        const pregunta = document.getElementById('faq-duda').value;

        // Construcción del resumen para el modal
        let htmlResumen = `
            <h4 style="color: #0056b3; margin-bottom: 8px;">Resumen de tu consulta:</h4>
            <p style="margin: 4px 0;"><strong>Nombre o Empresa:</strong> ${nombre}</p>
            <p style="margin: 4px 0;"><strong>Correo:</strong> ${correo}</p>
            <p style="margin: 4px 0; color: #555;"><strong>Tu pregunta:</strong> <br/>${pregunta}</p>
        `;

        // Inyección del contenido generado en el modal
        const contenedorResumen = document.getElementById('modal-resumen-pregunta');
        if (contenedorResumen) {
            contenedorResumen.innerHTML = htmlResumen;
        }

        // Despliegue del modal y limpieza del formulario
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
    const modal = document.getElementById('modal-pregunta');
    if (modal) {
        modal.classList.add('activo');
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-pregunta');
    if (modal) {
        modal.classList.remove('activo');
    }
}