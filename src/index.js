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

function showWeather(response) {
  console.log(response);

  let cityName = document.querySelector("#cityName");
  let country = document.querySelector("#country");
  let weatherDescription = document.querySelector(".description");
  let weatherDescr = response.data.weather[0].description;
  let currentTemp = document.querySelector("#currentTemp");
  let realFeel = document.querySelector(".realTemp");
  cityName.innerHTML = response.data.name.toUpperCase().trim();
  country.innerHTML = response.data.sys.country;
  weatherDescription.innerHTML =
    weatherDescr.charAt(0).toUpperCase() + weatherDescr.slice(1);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
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

function currentTempF(event) {
  event.preventDefault();
  let currentTempF = document.querySelector("#currentTemp");
  currentTempF.innerHTML = "60";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", currentTempF);

function currentTempC(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#currentTemp");
  currentTempC.innerHTML = "20";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", currentTempC);
