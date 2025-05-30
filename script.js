// Inicialización del primer slider
var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true, // Activar el bucle
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

// Inicialización del segundo slider
var swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }
    }
});

// Manejo de los cambios de pestañas
let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input) {
    input.addEventListener('change', function() {
        let id = input.getAttribute('aria-value');
        let thisSwiper = document.getElementById('swiper' + id);
        if (thisSwiper) {
            thisSwiper.swiper.update();
        }
    });
});

// Función para actualizar los datos del Swiper con los datos del clima
function updateWeatherData() {
    // URL para obtener datos de ThingSpeak (reemplaza con tu URL)
    const url = 'https://api.thingspeak.com/channels/2486720/feeds/last.json?api_key=043PBL6XGH5UWLYE';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extraer datos de la respuesta
            const temperature = data.field1;
            const humidity = data.field2;
            const windSpeed = data.field3;
            const precipitation = data.field4;

            // Actualizar Swiper con los datos del clima
            // Aquí puedes agregar lógica para actualizar el contenido de tus slides
            // por ejemplo, actualizar el texto de las diapositivas
            document.querySelector('.temperature-slide').textContent = `Temperature: ${temperature}°C`;
            document.querySelector('.humidity-slide').textContent = `Humidity: ${humidity}%`;
            document.querySelector('.wind-slide').textContent = `Wind Speed: ${windSpeed} km/h`;
            document.querySelector('.precipitation-slide').textContent = `Precipitation: ${precipitation} mm`;

            // Actualizar el Swiper después de modificar el contenido
            swiper1.update();
            swiper2.update();
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Llamar a la función para actualizar los datos al cargar la página
document.addEventListener('DOMContentLoaded', updateWeatherData);
