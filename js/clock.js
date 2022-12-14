const clock = document.querySelector("h2#clock");
const todaysDate = document.querySelector("h2#todays-date");

function getClock() {
    const todayDate = new Date();

    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth()+1);
    const date = Math.floor(todayDate.getDate());
    
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = weekday[todayDate.getDay()];

    const hours = String(todayDate.getHours()).padStart(2, "0");
    const minutes = String(todayDate.getMinutes()).padStart(2, "0");
    const seconds = String(todayDate.getSeconds()).padStart(2, "0");
    
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    todaysDate.innerText = `${year}.${month}.${date} (${day})`;
}

getClock();                     // 웹사이트가 load되자마자 function 실행(즉시 호출)
setInterval(getClock, 1000);    // 매 1초마다 시:분:초 실행