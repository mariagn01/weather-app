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
