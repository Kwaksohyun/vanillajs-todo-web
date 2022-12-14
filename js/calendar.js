// const todayDate = new Date();
// const month = String(todayDate.getMonth()+1);
// const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const calendar = document.querySelector("#calendar");
const calMonth = document.querySelector(".cal__month");
const calWeekDay = document.querySelector(".cal-wrap__weekday");
const calWrapDates = document.querySelector(".cal-wrap__dates");

// 이번 달의 첫째 날 요일
const firstDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).getDay();

// 이번 달의 마지막 날, 마지막 날짜
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

    for(let j=0; j<firstDay; j++) {
        const span2 = document.createElement("span");
        span2.className = "dates__date";
        span2.innerText = "";
        calWrapDates.appendChild(span2);
    }

    for(let k=1; k<=lastDate; k++) {
        const span2 = document.createElement("span");
        span2.className = "dates__date";
        span2.innerText = k;
        calWrapDates.appendChild(span2); 
    }

    // 오늘 날짜 표시
    const datesDate = document.querySelectorAll(".dates__date");
    if((calMonth.innerText == new Date().getMonth()+1) && (year == new Date().getFullYear())) {
        for(let l=0; l<datesDate.length; l++) {
            if(parseInt(datesDate[l].innerText) === new Date().getDate()) {
                datesDate[l].classList.add("today");
                break;
            }
        }
    }
}

showCalendar();