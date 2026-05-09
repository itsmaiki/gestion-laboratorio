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

    agregarHistorial(
        "Equipo registrado: " + nombre,
        "registro"
    );

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

    agregarHistorial(
        "Préstamo de " + equipo.nombre + " para " + usuario,
        "prestamo"
    );

    actualizarTabla();
}

function registrarDevolucion(){

    const id = document.getElementById("equipoDevolucion").value;

    const equipo = equipos.find(e => e.id == id);

    equipo.estado = "Disponible";

    agregarHistorial(
        "Devolución de " + equipo.nombre,
        "devolucion"
    );

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

function agregarHistorial(texto, tipo = "info"){

    const fecha = new Date();

    const fechaTexto =
        fecha.toLocaleDateString() +
        " " +
        fecha.toLocaleTimeString();

    historial.unshift({
        mensaje: texto,
        fecha: fechaTexto,
        tipo: tipo
    });

    mostrarHistorial();
}

function mostrarHistorial(){

    const lista = document.getElementById("historial");

    lista.innerHTML = "";

    historial.forEach(item => {

        let color = "#333";

        if(item.tipo === "prestamo"){
            color = "#ef6c00";
        }

        if(item.tipo === "devolucion"){
            color = "#2e7d32";
        }

        if(item.tipo === "registro"){
            color = "#1565c0";
        }

        lista.innerHTML += `
            <li style="
                margin-bottom:10px;
                padding:10px;
                border-left:5px solid ${color};
                background:#f5f5f5;
                list-style:none;
                border-radius:5px;
            ">
                <strong>${item.fecha}</strong><br>
                ${item.mensaje}
            </li>
        `;
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
