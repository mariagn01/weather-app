//Ready-function for displaying the weather in users location when the page loads
$(document).ready(() => {
    getUserLocation();
});

//OpenWeather API for weather data
const apiKey = "b34c4a754804708e5c37d3ea57290f6c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&";

//Function for fetching weather data
async function checkWeather() {
    // Fetching the city searched by the user
    let city = $("#input-city").val();

    try {
        // Fetching data from OpenWeather API
        const response = await fetch(apiUrl + "q=" + city + `&appid=${apiKey}`);
        
        // Check if the response status is OK (200–299)
        if (!response.ok) {
            // If response is not OK, throw an error
            throw new Error("City not found or an error occurred. Please check the spelling and try again.");
        }
        
        // Parse the JSON data
        let data = await response.json();

        // Display the JSON-object in the console for debugging
        console.log(data);

        // Updating the fields with weather data
        $("#city").html(data.name);
        $("#temp").html(Math.round(data.main.temp) + "°C");
        $("#humidity").html(data.main.humidity + "%");
        $("#wind").html(data.wind.speed + " km/h");

        let weatherIcon = $("#weather-icon");

        // Updating the weather icon based on the condition received from the API
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.attr("src", "assets/images/clouds.png");
                break;
            case "Rain":
                weatherIcon.attr("src", "assets/images/rain.png");
                break;
            case "Thunderstorm":
                weatherIcon.attr("src", "assets/images/thunderstorm.png");
                break;
            case "Tornado":
                weatherIcon.attr("src", "assets/images/tornado.png");
                break;
            case "Clear":
                weatherIcon.attr("src", "assets/images/clear.png");
                break;
            case "Snow":
                weatherIcon.attr("src", "assets/images/snow.png");
                break;
            case "Drizzle":
                weatherIcon.attr("src", "assets/images/drizzle.png");
                break;
            case "Mist":
                weatherIcon.attr("src", "assets/images/mist.png");
                break;
            default:
                weatherIcon.attr("src", "assets/images/clouds.png");
                console.error("Weather condition not recognized:", data.weather[0].main);
        }

        // Displaying the weather container
        $(".weather").show();
        $(".error").hide(); // Hide error message if data is valid

    } catch (error) {
        // Handle errors such as network issues or invalid responses
        $(".weather").hide(); // Hide the weather container in case of an error
        $(".error").html(error.message).show(); // Display error message to the user
    }
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
            $(".error").html("Unable to retrieve your location. Please enter a city manually.").show();
            console.error(error)
        });
    } else {
        $(".error").html("Geolocation is not supported by this browser.").show();
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
                    weatherIcon.attr("src", "assets/images/clouds.png");
                    break;
                case "Rain":
                    weatherIcon.attr("src", "assets/images/rain.png");
                    break;
                case "Thunderstorm":
                    weatherIcon.attr("src", "assets/images/thunderstorm.png");
                    break;
                case "Tornado":
                    weatherIcon.attr("src", "assets/images/tornado.png");
                    break;
                case "Clear":
                    weatherIcon.attr("src", "assets/images/clear.png");
                  break;
                case "Snow":
                    weatherIcon.attr("src", "assets/images/snow.png");
                    break;
                case "Drizzle":
                    weatherIcon.attr("src", "assets/images/drizzle.png");
                    break;
                case "Mist":
                    weatherIcon.attr("src", "assets/images/mist.png");
                    break;
                default:
                    weatherIcon.attr("src", "assets/images/clouds.png");
                    console.error("Weather condition not recognized:", data.weather[0].main);
            }

        // Displaying the container
        $(".weather").show();
    } catch (error) {
        alert(error.message);
    }
}