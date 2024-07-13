const catalogo = [
    {
        nombre: "Agaricus Campestris x500gr",
        precio: 4000,
        stock: 76,
        categoria: "Comestibles"
    },
    {
        nombre: "Pleurotus Ostreatus x500gr",
        precio: 3000,
        stock: 102,
        categoria: "Comestibles"
    },
    {
        nombre: "Hericium Erinaceus x10gr",
        precio: 14000,
        stock: 12,
        categoria: "Comprimidos"
    },
    {
        nombre: "Ganoderma Linghzi x10gr",
        precio: 17000,
        stock: 34,
        categoria: "Comprimidos"
    },
    {
        nombre: "Inonotus Obliquus x10ml",
        precio: 12000,
        stock: 212,
        categoria: "Extracto"
    }
]
document.addEventListener("DOMContentLoaded", function () {
    cargarTabla(catalogo);
    cargarCategorias(catalogo);
    calcularValorTotalInventario()
    let formulario = document.getElementById('nuevoProducto');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarProducto();
    });
    
    let combobox = document.getElementById('seleccionarCategoria');
    combobox.addEventListener('change', function () {
        filtrarPorCategoria(this.value);
    });
    let formularioActualizar = document.getElementById('actualizarStock');
    formularioActualizar.addEventListener('submit', function (event) {
        event.preventDefault();
        actualizarStockProducto();
    });

    let formularioEliminar = document.getElementById('eliminarProducto');
    formularioEliminar.addEventListener('submit', function (event) {
        event.preventDefault();
        eliminarProducto();
    });
});

function cargarTabla(array) {
    const tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";
    array.forEach(producto => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
        `;
        tabla.appendChild(fila);
    });
}
function cargarCategorias(array) {
    const categorias = [...new Set(array.map(producto => producto.categoria))];
    const combobox = document.getElementById("seleccionarCategoria");
    combobox.innerHTML = '<option value="todas">Todas</option>';
    categorias.forEach(categoria => {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        combobox.appendChild(opcion);
    });
}
function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const categoria = document.getElementById('categoria').value;

    let nuevoProducto = {
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoria: categoria
    };

    catalogo.push(nuevoProducto);
    cargarTabla(catalogo);
    cargarCategorias(catalogo);
    calcularValorTotalInventario()
    document.getElementById('nuevoProducto').reset();
}
function filtrarPorCategoria(categoria) {
    if (categoria === "todas") {
        cargarTabla(catalogo);
    } else {
        const filtrado = catalogo.filter(producto => producto.categoria === categoria);
        cargarTabla(filtrado);
    }
}
function actualizarStockProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const nuevoStock = parseInt(document.getElementById('nuevoStock').value);

    const producto = catalogo.find(prod => prod.nombre === nombreProducto);
    if (producto) {
        producto.stock = nuevoStock;
        cargarTabla(catalogo);
        calcularValorTotalInventario()
    } else {
        alert("Producto no encontrado");
    }

    document.getElementById('actualizarStock').reset();
}
function eliminarProducto() {
    const nombreEliminar = document.getElementById('nombreEliminar').value;

    const indice = catalogo.findIndex(prod => prod.nombre === nombreEliminar);
    if (indice !== -1) {
        catalogo.splice(indice, 1);
        cargarTabla(catalogo);
        cargarCategorias(catalogo);
        calcularValorTotalInventario()
    } else {
        alert("Producto no encontrado");
    }

    document.getElementById('eliminarProducto').reset();
}

function calcularValorTotalInventario() {
    let valorTotal = 0;
    catalogo.forEach(producto => {
        valorTotal += producto.precio * producto.stock;
        console.log(valorTotal);
    });
    const valorTotalElemento = document.getElementById('valorTotalInventario');
    valorTotalElemento.textContent = `$${valorTotal}`;
}