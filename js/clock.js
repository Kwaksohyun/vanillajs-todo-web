const clock = document.querySelector("h2#clock");
const todaysDate = document.querySelector("h2#todays-date");

const calendar = document.querySelector("#calendar");
const calMonth = document.querySelector(".cal__month");
const calWeekDay = document.querySelector(".cal-wrap__weekday");
const calWrapDates = document.querySelector(".cal-wrap__dates");

const todayDate = new Date();
const year = todayDate.getFullYear();
const month = String(todayDate.getMonth()+1);
const date = Math.floor(todayDate.getDate());
const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getClock() {
    const day = weekday[todayDate.getDay()];

    const hours = String(todayDate.getHours()).padStart(2, "0");
    const minutes = String(todayDate.getMinutes()).padStart(2, "0");
    const seconds = String(todayDate.getSeconds()).padStart(2, "0");
    
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    todaysDate.innerText = `${year}.${month}.${date} (${day})`;
}

getClock();                     // 웹사이트가 load되자마자 function 실행(즉시 호출)
setInterval(getClock, 1000);    // 매 1초마다 시:분:초 실행


// calendar

// 이번 달의 첫째날 요일
const firstDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getDay();

// 이번 달의 마지막날, 마지막 날짜
const lastDay = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 0);
const lastDate = lastDay.getDate();

function showCalendar() {
    calMonth.innerText = month;

    for(let i=0; i<weekday.length; i++) {
        const span1 = document.createElement("span");
        span1.className = "weekday__day"
        span1.innerText = weekday[i][0];

        calWeekDay.appendChild(span1);
    }

    for(let k=0; k<firstDay; k++) {
        const span2 = document.createElement("span");
        span2.className = "dates__date";
        span2.innerText = "";
        calWrapDates.appendChild(span2);
    }

    for(let j=1; j<=lastDate; j++) {
        const span2 = document.createElement("span");
        span2.className = "dates__date";
        span2.innerText = j;
        calWrapDates.appendChild(span2); 
    }
}

showCalendar();