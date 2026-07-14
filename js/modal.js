document.addEventListener('DOMContentLoaded', function() {

    // ARRAY ÚNICO DE SERVICIOS (Configuración de Tarifas)
    // Cada objeto contiene: id (valor), nombre y precio por m²
    const servicios = [
        { id: "minibodega", nombre: "Minibodega (Pymes)", precio: 35.00 },
        { id: "industrial", nombre: "Almacenaje Industrial", precio: 18.50 },
        { id: "crossdocking", nombre: "Cross-Docking", precio: 45.00 }
    ];

    // EJEMPLO: Si quieres agregar otro servicio más (ej: "Depósito Legal"):
    // servicios.push({ id: "legal", nombre: "Depósito Legal (Documentos)", precio: 65.00 });
    // Y automáticamente aparecerá en las opciones del select

    // GENERAR OPCIONES DEL SELECT DINÁMICAMENTE
    const selectServicio = document.getElementById('tipo_servicio');
    if (selectServicio) {
        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.id;
            option.textContent = servicio.nombre;
            selectServicio.appendChild(option);
        });
    }

    const formulario = document.getElementById('formulario-contacto');
    const modal = document.getElementById('modal-exito');

    if (!formulario || !modal) return;

    // Prevenir envío por defecto y procesar datos en el modal
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Captura de datos ingresados en el formulario antes de resetearlo
        const rucIngresado = document.getElementById('ruc').value;
        const razonSocial = document.getElementById('empresa').value;
        const servicioSeleccionadoId = document.getElementById('tipo_servicio').value;
        const metrosCuadrados = parseFloat(document.getElementById('espacio').value);

        // 2. Buscar el objeto del servicio seleccionado usando .find()
        const servicioEncontrado = servicios.find(servicio => servicio.id === servicioSeleccionadoId);

        let htmlResumen = "";

        if (servicioEncontrado) {
            // Asociación de datos desde el objeto del servicio
            const precioUnitario = servicioEncontrado.precio;
            const nombreFormateado = servicioEncontrado.nombre;
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