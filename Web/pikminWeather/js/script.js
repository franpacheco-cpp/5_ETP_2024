document.addEventListener("DOMContentLoaded", function () {
    let formularioUbicacion = document.getElementById('formUbicacion');
    formularioUbicacion.addEventListener('submit', function (event) {
        event.preventDefault();
        conseguirClima();
    });
});

async function conseguirClima(){
    const clima = document.getElementById("clima");
    const latitud = document.getElementById("flat").value;
    const longitud = document.getElementById("flon").value;
    try {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&exclude=daily,hourly,minutely,alerts&lat=${latitud}&lon=${longitud}&appid=733bdb8b5071d16412de913033867b80`)
        const conMeteorologicas = await respuesta.json();
        console.log(conMeteorologicas)
        if(conMeteorologicas.weather[0].main == "Rain"){
            console.log("Hay que meter el ténder adentro")
            clima.innerHTML = `
                <h2>Lluvioso en ${conMeteorologicas.name}</h2>
                <img src="./rain.webp";
            `;
        }
        else if(conMeteorologicas.weather[0].main == "Clouds"){
            console.log("El sol está tapado")
            clima.innerHTML = `
                <h2>Nublado en ${conMeteorologicas.name}</h2>
                <img src="./nublado.gif">
            `;
        }
        else if(conMeteorologicas.weather[0].main == "Clear"){
            console.log("Hay solcito")
            clima.innerHTML = `
                <h2>Despejado en ${conMeteorologicas.name}</h2>
                <img src="./despejado.gif">
            `;
        }
    } catch (error) {
        return -1;
    }
}
