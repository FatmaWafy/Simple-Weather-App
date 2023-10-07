let apiKEY = "da91e8a43099aa933d5180a6b7643ef4";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let Inp = document.querySelector(".search input");
let Btn = document.querySelector(".search button");
let weather = document.querySelector(".weather");
let weatherIcon = document.querySelector(".weather-icon");
let error = document.querySelector(".error");

async function CheckWeather(city) {
  let response = await fetch(apiURL + city + `&appid=${apiKEY}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    if (data.weather[0].main === "CloudS") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }
}

Btn.addEventListener("click", () => {
  CheckWeather(Inp.value);
});

document.onkeyup = function (e) {
  if (e.key === "Enter") {
    CheckWeather(Inp.value);
  }
};
