let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
    name: "Paris",
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
    name: "Tokyo",
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
    name: "Lisbon",
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
    name: "San Francisco",
  },
  moscow: {
    temp: -5,
    humidity: 20,
    name: "Moscow",
  },
};

let currentCity = prompt("Please, enter a city...");
currentCity = currentCity.toLowerCase().trim();

if (weather[currentCity] !== undefined) {
  alert(
    `It is currently ${Math.round(weather[currentCity].temp)}°C (${Math.round(
      weather[currentCity].temp * 1.8 + 32
    )}°F) in ${weather[currentCity].name} with a humidity of ${
      weather[currentCity].humidity
    }%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${currentCity}`
  );
}
