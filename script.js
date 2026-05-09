let equipos = [];
let historial = [];

function generarID(){
    return Math.floor(Math.random() * 100000);
}

function registrarEquipo(){

    const nombre = document.getElementById("nombreEquipo").value;
    const estado = document.getElementById("estadoEquipo").value;

    if(nombre === ""){
        alert("Ingrese nombre");
        return;
    }

    const equipo = {
        id: generarID(),
        nombre: nombre,
        estado: estado
    };

    equipos.push(equipo);

    agregarHistorial("Equipo registrado: " + nombre);

    actualizarTabla();
    actualizarSelects();

    document.getElementById("nombreEquipo").value = "";
}

function registrarPrestamo(){

    const id = document.getElementById("equipoPrestamo").value;
    const usuario = document.getElementById("usuarioPrestamo").value;

    const equipo = equipos.find(e => e.id == id);

    if(equipo.estado === "Prestado"){
        alert("Equipo ya prestado");
        return;
    }

    equipo.estado = "Prestado";

    agregarHistorial("Préstamo de " + equipo.nombre + " para " + usuario);

    actualizarTabla();
}

function registrarDevolucion(){

    const id = document.getElementById("equipoDevolucion").value;

    const equipo = equipos.find(e => e.id == id);

    equipo.estado = "Disponible";

    agregarHistorial("Devolución de " + equipo.nombre);

    actualizarTabla();
}

function actualizarTabla(){

    const tabla = document.getElementById("tablaEquipos");

    tabla.innerHTML = "";

    equipos.forEach(equipo => {

        tabla.innerHTML += `
            <tr>
                <td>${equipo.id}</td>
                <td>${equipo.nombre}</td>
                <td>${equipo.estado}</td>
            </tr>
        `;
    });
}

function agregarHistorial(texto){

    const fecha = new Date().toLocaleString();

    historial.push(fecha + " - " + texto);

    mostrarHistorial();
}

function mostrarHistorial(){

    const lista = document.getElementById("historial");

    lista.innerHTML = "";

    historial.forEach(item => {

        lista.innerHTML += `<li>${item}</li>`;
    });
}

function actualizarSelects(){

    const prestamo = document.getElementById("equipoPrestamo");
    const devolucion = document.getElementById("equipoDevolucion");

    prestamo.innerHTML = "";
    devolucion.innerHTML = "";

    equipos.forEach(equipo => {

        prestamo.innerHTML += `
            <option value="${equipo.id}">
                ${equipo.nombre}
            </option>
        `;

        devolucion.innerHTML += `
            <option value="${equipo.id}">
                ${equipo.nombre}
            </option>
        `;
    });
}
