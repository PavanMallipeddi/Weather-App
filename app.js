const apikey = "014e02c5e9df0799983436d8cd3b2e10";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            // Update weather details
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon based on condition
            const weatherCondition = data.weather[0].main.toLowerCase();

            if (weatherCondition === "clear") {
                weatherIcon.src = "sun.png";
            } else if (weatherCondition === "clouds") {
                weatherIcon.src = "cloudy.png";
            } else if (weatherCondition === "thunderstorm") {
                weatherIcon.src = "storm.png";
            } else if (weatherCondition === "rain") {
                weatherIcon.src = "rainy-day.png";
            } else if (weatherCondition === "snow") {
                weatherIcon.src = "snow.png";
            } else {
                weatherIcon.src = "default.png"; // Fallback icon
            }

            // Display weather details
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
