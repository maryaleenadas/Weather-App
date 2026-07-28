const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".city");
const timeField = document.querySelector(".date-time");
const conditionField = document.querySelector(".condition p");
const imageField = document.querySelector(".condition img");
const searchField = document.querySelector(".search-input");
const form = document.querySelector("form");

form.addEventListener("submit", searchLocation);

let target = "Kochi";
const fetchWeather = async (targetLocation) => {
  let url = ` http://api.weatherapi.com/v1/current.json?key=28c45ba14f284cc18ff170037260206&q=${targetLocation}&aqi=no `;
  try {
    const response = await fetch(url);
  const data = await response.json();
  

  let locationName = data.location.name;
  let temp = data.current.temp_c;
  let time = data.location.localtime;
  let condition = data.current.condition.text;
  let image = data.current.condition.icon;

  updateData(locationName, temp, time, condition, image);
  } catch (error) {
    alert(error);
  }

  
};
fetchWeather(target);

function searchLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchWeather(target);
}


  function updateData(locationName, temp, time, condition, image) {
    locationField.innerText = locationName;
    temperatureField.innerText = temp;
    conditionField.innerText = condition;
    imageField.src = image;

    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    timeField.innerText = `${splitTime} - ${splitDate}`;
  }


function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
