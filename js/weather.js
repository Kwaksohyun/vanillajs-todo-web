const API_KEY = "764d9c5ad8b4438b88c959267f544f23";

function onGeoOK(position) {
    // user의 위치좌표
    const lat = position.coords.latitude;       // 위도
    const log = position.coords.longitude;      // 경도
    
    // user의 위치의 현재 날씨
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const city = document.querySelector("#weather span:first-child");
            const temp = document.querySelector("#weather span:nth-child(2)");
            const weather = document.querySelector("#weather span:last-child");
            const weatherIcon = document.querySelector("#weather img");

            city.innerText = data.name;
            temp.innerText = `${data.main.temp}°`;
            weather.innerText = `${data.weather[0].main}`;
            weatherIcon.src = `images/weather_icons/${data.weather[0].icon}.png`;
        });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);