const button = document.querySelector(".button");
const API_KEY = "";
const tempSection = document.querySelector(".temperature");
const placeSection = document.querySelector(".place");
const iconSection = document.querySelector(".icon");
const descSection = document.querySelector(".description");

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(success, fail);
});

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
};

const fail = () => {
  alert("좌표를 받아올 수 없음");
};

const getWeather = async (lat, lon) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = json.main.temp;
      const place = json.name;
      const description = json.weather[0].description;

      tempSection.innerText = temperature;
      placeSection.innerText = place;
      descSection.innerText = description;

      const icon = json.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      iconSection.setAttribute("src", iconURL);
    })
    .catch((error) => {
      alert(error);
    });
};
