let productos = [];

document.addEventListener("DOMContentLoaded", function () {
    importarProductos();
    cargarTabla(productos);

    let formularioAñadir = document.getElementById('nuevoProducto');
    formularioAñadir.addEventListener('submit', function (event) {
        event.preventDefault();
        añadirProducto();
    });

    let formularioActualizar = document.getElementById('actualizarProducto');
    formularioActualizar.addEventListener('submit', function (event) {
        event.preventDefault();
        actualizarProducto();
    });

    let formularioEliminar = document.getElementById('eliminarProducto');
    formularioEliminar.addEventListener('submit', function (event) {
        event.preventDefault();
        eliminarProducto();
    });
});

function importarProductos() {
    let productosGuardados = localStorage.getItem("productos");
    if (productosGuardados != null) {
        productos = JSON.parse(productosGuardados);
    }
}

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function añadirProducto() {
    let nuevoProducto = {
        nombre: document.getElementById("nombreProducto").value.trim(),
        precio: parseFloat(document.getElementById("precioProducto").value),
        stock: parseInt(document.getElementById("stockProducto").value),
        rubro: document.getElementById("rubroProducto").value.trim()
    };
    if (nuevoProducto.nombre && !isNaN(nuevoProducto.precio) && !isNaN(nuevoProducto.stock) && nuevoProducto.rubro) {
        productos.push(nuevoProducto);
        document.getElementById("nuevoProducto").reset();
        guardarProductos();
        cargarTabla(productos);
    }
}

function actualizarProducto() {
    let nombreProductoActualizar = document.getElementById("nombreProductoActualizar").value.trim();
    let producto = productos.find(p => p.nombre === nombreProductoActualizar);

    if (producto) {
        let nuevoPrecio = parseFloat(document.getElementById("nuevoPrecio").value);
        let nuevoStock = parseInt(document.getElementById("nuevoStock").value);
        let nuevoRubro = document.getElementById("nuevoRubro").value.trim();

        if (!isNaN(nuevoPrecio)) producto.precio = nuevoPrecio;
        if (!isNaN(nuevoStock)) producto.stock = nuevoStock;
        if (nuevoRubro) producto.rubro = nuevoRubro;

        document.getElementById("actualizarProducto").reset();
        guardarProductos();
        cargarTabla(productos);
    } else {
        alert("Producto no encontrado");
    }
}

function eliminarProducto() {
    let nombreProductoEliminar = document.getElementById("nombreProductoEliminar").value.trim();
    productos = productos.filter(p => p.nombre !== nombreProductoEliminar);
    document.getElementById('eliminarProducto').reset();
    guardarProductos();
    cargarTabla(productos);
}

function cargarTabla(array) {
    const tabla = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";
    array.forEach(producto => {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${producto.nombre}</td>
                          <td>${producto.precio}</td>
                          <td>${producto.stock}</td>
                          <td>${producto.rubro}</td>
                          <td><button onclick="editarProducto('${producto.nombre}')">Editar</button></td>`;
        tabla.appendChild(fila);
    });
}

function editarProducto(nombre) {
    let producto = productos.find(p => p.nombre === nombre);
    if (producto) {
        document.getElementById("nombreProductoActualizar").value = producto.nombre;
        document.getElementById("nuevoPrecio").value = producto.precio;
        document.getElementById("nuevoStock").value = producto.stock;
        document.getElementById("nuevoRubro").value = producto.rubro;
    }
}
