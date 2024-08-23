//Ready-function for displaying the weather in users location when the page loads
$(document).ready(() => {
    getUserLocation();
});

//OpenWeather API for weather data
const apiKey = "b34c4a754804708e5c37d3ea57290f6c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&";

//Function for fetching weather data
async function checkWeather () {
    //Fetching the city searched by user
    let city = $("#input-city").val();

    //Fetching data from OpenWeather API and parsing the JSON response
    const response = await fetch(apiUrl + "q=" + city + `&appid=${apiKey}`);
    let data = await response.json();

    //Displaying the JSON-object in the console for possibility to validate the information
    console.log(data);

    // Updating the fields
    $("#city").html(data.name)
    $("#temp").html(Math.round(data.main.temp) + "°C")
    $("#humidity").html(data.main.humidity + "%")
    $("#wind").html(data.wind.speed + " km/h")

    let weatherIcon = $("#weather-icon");

    // Updating the weather icon based on the condition received from the API
    if (data.weather[0].main === "Clouds") {
        weatherIcon.attr("src", "images/clouds.png");
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.attr("src", "images/rain.png");
    } else if (data.weather[0].main === "Thunderstorm") {
        weatherIcon.attr("src", "images/thunderstorm.png");
    } else if (data.weather[0].main === "Tornado") {
        weatherIcon.attr("src", "images/tornado.png");
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.attr("src", "images/clear.png");
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.attr("src", "images/snow.png");
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.attr("src", "images/drizzle.png");
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.attr("src", "images/mist.png");
    }

    //Displaying the container
    document.querySelector(".weather").style.display = "block";
}

//Requesting users location with Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // Fetch weather data using the user's coordinates
            getWeather(lat, lon);
        }, (error) => {
            // Handle error (e.g., if user denies location access)
            alert("Unable to retrieve your location. Please enter a city manually.");
            console.error(error)
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function for fetching weather data based on the user's coordinates
async function getWeather(lat, lon) {
    try {
            const response = await fetch(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            let data = await response.json();

            // Displaying the JSON-object in the console for validation
            console.log(data);

            // Updating the fields with the received data
            $("#city").html(data.name);
            $("#temp").html(Math.round(data.main.temp) + "°C");
            $("#humidity").html(data.main.humidity + "%");
            $("#wind").html(data.wind.speed + " km/h");

            let weatherIcon = $("#weather-icon");

            // Updating the weather icon based on the condition received from the API
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.attr("src", "images/clouds.png");
                    break;
                case "Rain":
                    weatherIcon.attr("src", "images/rain.png");
                    break;
                case "Thunderstorm":
                    weatherIcon.attr("src", "images/thunderstorm.png");
                    break;
                case "Tornado":
                    weatherIcon.attr("src", "images/tornado.png");
                    break;
                case "Clear":
                    weatherIcon.attr("src", "images/clear.png");
                  break;
                case "Snow":
                    weatherIcon.attr("src", "images/snow.png");
                    break;
                case "Drizzle":
                    weatherIcon.attr("src", "images/drizzle.png");
                    break;
                case "Mist":
                    weatherIcon.attr("src", "images/mist.png");
                    break;
                default:
                    weatherIcon.attr("src", "images/default.png"); // Fallback icon
                    console.error("Weather condition not recognized:", data.weather[0].main);
            }

        // Displaying the container
        document.querySelector(".weather").style.display = "block";    
    } catch (error) {
        alert(error.message);
    }
}