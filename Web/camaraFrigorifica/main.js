const camarasFrigorificas = [
    {
        id: 1,
        tipo: "Frutillas",
        capacidadMaxima: 1000,
        cantidadActual: 800
    },
    {
        id: 2,
        tipo: "Frambuesas",
        capacidadMaxima: 1500,
        cantidadActual: 1500
    },
    {
        id: 3,
        tipo: "Arándanos",
        capacidadMaxima: 2000,
        cantidadActual: 1800
    },
    {
        id: 4,
        tipo: "Moras",
        capacidadMaxima: 1200,
        cantidadActual: 1200
    },
    {
        id: 5, tipo: "Grosellas",
        capacidadMaxima: 1800,
        cantidadActual: 1500
    },
    {
        id: 6,
        tipo: "Frambuesas",
        capacidadMaxima: 2500,
        cantidadActual: 2000
    }
];

document.addEventListener("DOMContentLoaded", function () {
    cargarTabla(nuevoArray);
});

let nuevoArray = [{}]
camarasFrigorificas.forEach(frutaFina => {
    nuevoArray.push(frutaFina);
});
nuevoArray.splice(0, 1)

function cargarTabla(array) {
    const tabla = document.getElementById("Tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";
    array.forEach(frutaFina => {
        if(frutaFina.id != null) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${frutaFina.id}</td>
            <td>${frutaFina.tipo}</td>
            <td>${frutaFina.capacidadMaxima}</td>
            <td>${frutaFina.cantidadActual}</td>
        `;
        tabla.appendChild(fila);
        }
    })
}

function mostrarTotalFrutas() {
    let total = 0;
    camarasFrigorificas.forEach(camara => {
        total += camara.cantidadActual;
    });
    alert(`La cantidad total de frutas almacenadas es: ${total}`);
}

function mostrarMaxFrutas() {
    let maxCamara = camarasFrigorificas[0];
    camarasFrigorificas.forEach(camara => {
        if (camara.cantidadActual > maxCamara.cantidadActual) {
            maxCamara = camara;
        }
    });
    alert(`La cámara con mayor cantidad de frutas es: ID ${maxCamara.id} (${maxCamara.tipo}) con ${maxCamara.cantidadActual} frutas`);
}

function mostrarMinFrutas() {
    let minCamara = camarasFrigorificas[0];
    camarasFrigorificas.forEach(camara => {
        if (camara.cantidadActual < minCamara.cantidadActual) {
            minCamara = camara;
        }
    });
    alert(`La cámara con menor cantidad de frutas es: ID ${minCamara.id} (${minCamara.tipo}) con ${minCamara.cantidadActual} frutas`);
}

function mostrarPromedioCapacidad() {
    let totalCapacidad = 0;
    camarasFrigorificas.forEach(camara => {
        totalCapacidad += camara.cantidadActual;
    });
    let promedio = (totalCapacidad / camarasFrigorificas.length).toFixed(2);
    alert(`El promedio de capacidad utilizada es: ${promedio}`);
}

function mostrarCamarasLlenas() {
    let camarasLlenas = [];
    camarasFrigorificas.forEach(camara => {
        if (camara.cantidadActual === camara.capacidadMaxima) {
            camarasLlenas.push(camara);
        }
    });
    if (camarasLlenas.length > 0) {
        let mensaje = "Cámaras llenas al 100%:\n";
        camarasLlenas.forEach(camara => {
            mensaje += `ID ${camara.id} (${camara.tipo})\n`;
        });
        alert(mensaje);
    } else {
        alert("No hay cámaras llenas al 100%");
    }
}

function mostrarPorcentajesCapacidad() {
    let mensaje = "Porcentajes de capacidad utilizada:\n";
    camarasFrigorificas.forEach(camara => {
        let porcentaje = ((camara.cantidadActual / camara.capacidadMaxima) * 100).toFixed(2);
        mensaje += `ID ${camara.id} (${camara.tipo}): ${porcentaje}%\n`;
    });
    alert(mensaje);
}
