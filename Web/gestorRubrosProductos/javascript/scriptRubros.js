let rubros = [];
document.addEventListener("DOMContentLoaded", function () {
    importarRubros();
    cargarTabla(rubros);

    let formularioAñadir = document.getElementById('nuevoRubro');
    formularioAñadir.addEventListener('submit', function (event) {
        event.preventDefault();
        añadirRubro();
    });

    let formularioEliminar = document.getElementById('eliminarRubro');
    formularioEliminar.addEventListener('submit', function (event) {
        event.preventDefault();
        eliminarRubro();
    });
});

function importarRubros() {
    let rubrosGuardados = localStorage.getItem("rubros");
    if (rubrosGuardados != null) {
        rubros = JSON.parse(rubrosGuardados);
    }
}

function guardarRubros() {
    localStorage.setItem("rubros", JSON.stringify(rubros));
}

function añadirRubro() {
    let nuevoRubro = document.getElementById("nombreAñadir").value.trim();
    if (nuevoRubro) {
        rubros.push(nuevoRubro);
        document.getElementById("nombreAñadir").value = "";
        guardarRubros();
        cargarTabla(rubros);
    }
}

function eliminarRubro() {
    let nombreEliminar = document.getElementById("nombreEliminar").value;
    let indice = rubros.findIndex(rubro => rubro === nombreEliminar);
    if (indice !== -1) {
        rubros.splice(indice, 1);
        cargarTabla(rubros);
        guardarRubros()
    } else {
        alert("Rubro no encontrado");
    }
    /* if (indicelocalstorage !== -1) {
        rubros.splice(indicelocalstorage, 1);
        guardarRubros()
    } else {
        alert("Rubro no encontrado");
    } */
    document.getElementById('eliminarRubro').reset();
}

function cargarTabla(array) {
    const tabla = document.getElementById("tablaRubros").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";
    array.forEach(rubro => {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${rubro}</td>`;
        tabla.appendChild(fila);
    });
}
