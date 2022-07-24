let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let monthes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = monthes[now.getMonth()];
let hour = ("0" + now.getHours()).slice(-2);
let minutes = ("0" + now.getMinutes()).slice(-2);
let dayCurrent = document.querySelector(".weekDay");
dayCurrent.innerHTML = day;
let dateCurrent = document.querySelector(".date");
dateCurrent.innerHTML = month.toUpperCase() + " " + date;
let timeCurrent = document.querySelector(".time");
timeCurrent.innerHTML = hour + ":" + minutes;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
     <ul class="forecast1" >
         <li class="forecastDay" id="forecastDay1">${formatDay(
           forecastDay.dt
         )}</li>
            <li class="forecastImage" id="forecastImage1">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" id="forecastImage" width="42"/>
            </li>
          <li class="forecastTemp" id="forecastTemp1">${Math.round(
            forecastDay.temp.day
          )}°</li>
       </ul>
  </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "88a416ced747d697656c3ab76d89fef3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let currentImage = document.querySelector("#currentImage");
  let cityName = document.querySelector("#cityName");
  let country = document.querySelector("#country");
  let weatherDescription = document.querySelector("#description");
  let weatherDescr = response.data.weather[0].description;
  let currentTemp = document.querySelector("#currentTemp");
  let realFeel = document.querySelector(".realTemp");
  let wind = document.querySelector("#wind");
  celsiusTemp = response.data.main.temp;
  realFeelCelsius = response.data.main.feels_like;

  cityName.innerHTML = response.data.name.toUpperCase().trim();
  country.innerHTML = response.data.sys.country;
  weatherDescription.innerHTML =
    weatherDescr.charAt(0).toUpperCase() + weatherDescr.slice(1);
  currentTemp.innerHTML = Math.round(celsiusTemp);
  realFeel.innerHTML = Math.round(realFeelCelsius);
  wind.innerHTML = response.data.wind.speed;
  currentImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentImage.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let searchElement = searchInput.value.toLowerCase().trim();
  let searchElementCap =
    searchElement.charAt(0).toUpperCase() + searchElement.slice(1);
  let apiKey = "88a416ced747d697656c3ab76d89fef3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchElementCap}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "88a416ced747d697656c3ab76d89fef3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function currentCity() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentCity);
