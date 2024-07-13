const imagenes = [
    {titulo: "cover", descripcion: "Portada del cómic", imagen: "./recursos/cover.png"},
    {titulo: "pag1", descripcion: "1° Página", imagen: "./recursos/page1.png"},
    {titulo: "pag2", descripcion: "2° Página", imagen: "./recursos/page2.png"},
    {titulo: "pag3", descripcion: "3° Página", imagen: "./recursos/page3.png"},
    {titulo: "pag4", descripcion: "4° Página", imagen: "./recursos/page4.png"}
]

let imagenActual = 0;

function cargarFoto(array){
    const carrusel = document.getElementById("carrusel");
    carrusel.innerHTML = ""
    carrusel.innerHTML = `<img src="${imagenes[imagenActual].imagen}" alt="${imagenes[imagenActual].descripcion}" onclick="siguiente(imagenes)"></img>`
}

function siguiente(array){
    if (imagenActual < array.length-1) {
        imagenActual++;
        cargarFoto(imagenes);
    }
    else {
        imagenActual = 0;
        cargarFoto(imagenes);
    }

}
