// Este pedacito es para que cada vez que cambie el contenido en la página se escuche a los eventos
document.addEventListener("DOMContentLoaded", function () {
    // este ejecuta la función de conseguirClima cuando aprietan el botón para conseguirlo en la página web
    let formularioUbicacion = document.getElementById('formUbicacion');
    formularioUbicacion.addEventListener('submit', function (event) {
        event.preventDefault();
        conseguirClima();
    });
});

// función principal
async function conseguirClima() {
    // identificar las constantes principales
    const clima = document.getElementById("clima");
    const latitud = document.getElementById("flat").value;
    const longitud = document.getElementById("flon").value;
    try {
        // fetchear a la api con los valores que conseguimos antes
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&exclude=daily,hourly,minutely,alerts&lat=${latitud}&lon=${longitud}&appid=733bdb8b5071d16412de913033867b80`)
        // jsonizar
        const conMeteorologicas = await respuesta.json();
        console.log(conMeteorologicas)
        // identificar los eventos climatológicos
        if (conMeteorologicas.weather[0].main == "Rain") {
            console.log("Hay que meter el ténder adentro")
            // cambiar la página web
            clima.innerHTML = `
                <h2>Lluvioso en ${conMeteorologicas.name}</h2>
                <img src="./rain.webp";
                <h4>La temperatura es de: ${conMeteorologicas.main.temp}°C</h4>
                <h4>La humedad es de: ${conMeteorologicas.main.humidity}%</h4>
                <h4>El viento está a: ${conMeteorologicas.wind.speed}m/s</h4>
            `;
        }
        else if (conMeteorologicas.weather[0].main == "Clouds") {
            console.log("El sol está tapado")
            clima.innerHTML = `
                <h2>Nublado en ${conMeteorologicas.name}</h2>
                <img src="./nublado.gif">
                <h4>La temperatura es de: ${conMeteorologicas.main.temp}°C</h4>
                <h4>La humedad es de: ${conMeteorologicas.main.humidity}%</h4>
                <h4>El viento está a: ${conMeteorologicas.wind.speed}m/s</h4>
            `;
        }
        else if (conMeteorologicas.weather[0].main == "Clear") {
            console.log("Hay solcito")
            clima.innerHTML = `
                <h2>Despejado en ${conMeteorologicas.name}</h2>
                <img src="./despejado.gif">
                <h4>La temperatura es de: ${conMeteorologicas.main.temp}°C</h4>
                <h4>La humedad es de: ${conMeteorologicas.main.humidity}%</h4>
                <h4>El viento está a: ${conMeteorologicas.wind.speed}m/s</h4>
            `;
        }
        // "puede fallar" -tusam
    } catch (error) {
        return -1;
    }
}
