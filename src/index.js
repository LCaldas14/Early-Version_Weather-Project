import "./styles.css";

let now = new Date();

let h2 = document.querySelector("#clock-24h");
let hour = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
h2.innerHTML = `${hour}: ${minutes}`;

let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let h1 = document.querySelector("#date-month-day");
let date = now.getDate();
let month = months[now.getMonth()];
let day = days[now.getDay()];

h1.innerHTML = `${date} ${month}, ${day}`;

function searchSubmit(event) {
  event.preventDefault();
  let p = document.querySelector("#looking-for-city");
  p.innerHTML = `searching for ${searchInput.value}..`;
}

let searchInput = document.querySelector("#search-input");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  console.log(`The temperature in ${city} is ${temperature} degrees C`);
  let p = document.querySelector("p");
  p.innerHTML = city;
  let h3 = document.querySelector("#currentTemp");
  h3.innerHTML = `${temperature} °C`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} km/h`;
  let humid = document.querySelector("#humid");
  humid.innerHTML = `${response.data.main.humidity}%`;
}

let apiKey = "616b14cbd38253313b3b8852fa77335d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=616b14cbd38253313b3b8852fa77335d&units=metric`;

axios.get(apiUrl).then(showTemp);

function showPosition(position) {
  alert(
    `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`
  );

  let longitude = position.coords.latitude;
  let latitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=616b14cbd38253313b3b8852fa77335d&units=metric`;

  axios.get(apiUrl);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationbutton = document.querySelector("#geolocate");
locationbutton.addEventListener("click", getCurrentPosition);
