const clock = document.querySelector("h2.clock");
const todaysDay = document.querySelector("h1#todays-day");
const todaysDate = document.querySelector("h1#todays-date");

function getClock() {
    const todayD = new Date();

    const year = todayD.getFullYear();
    const month = String(todayD.getMonth()+1);
    const date = Math.floor(todayD.getDate());
    
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = weekday[todayD.getDay()];

    const hours = String(todayD.getHours()).padStart(2, "0");
    const minutes = String(todayD.getMinutes()).padStart(2, "0");
    const seconds = String(todayD.getSeconds()).padStart(2, "0");
    
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    todaysDay.innerText = `${day}`
    todaysDate.innerText = `${year}.${month}.${date}`;
}

getClock();                     // 웹사이트가 load되자마자 function 실행(즉시 호출)
setInterval(getClock, 1000);    // 매 1초마다 시:분:초 실행