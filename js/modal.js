document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    const modal = document.getElementById('modal-exito');

    if (!formulario || !modal) return;

    // ==========================================
    // ARRAYS PARALELOS (Configuración de Tarifas)
    // ==========================================
    // El primer array contiene los identificadores del elemento <select>
    const tiposServicio = ["minibodega", "industrial", "crossdocking"];
    // El segundo array almacena los precios correspondientes por metro cuadrado (m²)
    const preciosPorMetro = [35.00, 18.50, 45.00]; 
    // El tercer array guarda los nombres comerciales limpios para la interfaz
    const nombresServicio = ["Minibodega (Pymes)", "Almacenaje Industrial", "Cross-Docking"];

    // Prevenir envío por defecto y procesar datos en el modal
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Captura de datos ingresados en el formulario antes de resetearlo
        const rucIngresado = document.getElementById('ruc').value;
        const razonSocial = document.getElementById('empresa').value;
        const servicioSeleccionado = document.getElementById('tipo_servicio').value;
        const metrosCuadrados = parseFloat(document.getElementById('espacio').value);

        // 2. Uso de funciones de arrays (.indexOf) sobre los arrays paralelos
        const indice = tiposServicio.indexOf(servicioSeleccionado);

        let htmlResumen = "";

        if (indice !== -1) {
            // Asociación de datos utilizando el mismo índice en los vectores paralelos
            const precioUnitario = preciosPorMetro[indice];
            const nombreFormateado = nombresServicio[indice];
            const costoTotal = precioUnitario * metrosCuadrados;

            // Construcción de la estructura de presentación para el modal
            htmlResumen = `
                <h4 style="color: #0056b3; margin-bottom: 8px;">Resumen del Perfilamiento:</h4>
                <p style="margin: 4px 0;"><strong>Empresa:</strong> ${razonSocial} (RUC: ${rucIngresado})</p>
                <p style="margin: 4px 0;"><strong>Servicio:</strong> ${nombreFormateado}</p>
                <p style="margin: 4px 0;"><strong>Espacio Evaluado:</strong> ${metrosCuadrados} m²</p>
                <p style="margin: 10px 0 4px 0; font-size: 1.1rem; color: #28a745;">
                    <strong>Presupuesto Estimado:</strong> S/ ${costoTotal.toFixed(2)} / mes
                </p>
            `;
        } else {
            htmlResumen = `<p style="color: #dc3545;">No se pudo calcular la cotización del servicio seleccionado.</p>`;
        }

        // 3. Inyección del contenido generado dentro del contenedor asignado en el HTML
        const contenedorResumen = document.getElementById('modal-resumen');
        if (contenedorResumen) {
            contenedorResumen.innerHTML = htmlResumen;
        }

        // 4. Despliegue de la interfaz modular y limpieza de los campos de entrada
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