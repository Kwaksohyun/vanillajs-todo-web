const dDayForm = document.getElementById("dDay-form");
const dDayTitleInput = dDayForm.querySelector(`input[type="text"]`);
const dDayDateInput = dDayForm.querySelector(`input[type="date"]`);
const dDayList = document.getElementById("dDay-list");

let dDays = [];

function paintDDay(newdDayObj) {
    const li = document.createElement("li");
    li.id = newdDayObj.id;

    const div = document.createElement("div");
    const spanTitle = document.createElement("span");
    spanTitle.className = 'dDay-title';
    spanTitle.innerText = newdDayObj.title;

    const spanDate = document.createElement("span");
    spanDate.className = 'dDay-date';
    spanDate.innerText = newdDayObj.date;


    // d-day 구하기
    const todayD = new Date();
    const dDay = new Date(`"${newdDayObj.date}"`) - todayD;     // ms 단위(1초=1000ms)
    
    const day = Math.floor(dDay/1000/60/60/24)+1;
    
    const spanDDay = document.createElement("span");

    if(day > 0) {
        spanDDay.innerText = `D-${day}`;
    } else if(day == 0) {
        spanDDay.innerText = `D-Day`;
    } else {
        spanDDay.innerText = `D+` + Math.abs(day);
    }

    li.appendChild(div);
    div.appendChild(spanTitle);
    div.appendChild(spanDate);
    li.appendChild(spanDDay);
    dDayList.appendChild(li);
}


function handleDDaySubmit(event) {
    event.preventDefault();

    const newdDayTitle = dDayTitleInput.value;
    dDayTitleInput.value = "";

    const newdDayDate = dDayDateInput.value;    //2022-12-19
    const newdDayObj = {
        id:Date.now()*2,
        title: newdDayTitle,
        date: newdDayDate
    } 
    dDays.push(newdDayObj);
    
    paintDDay(newdDayObj);
}

dDayForm.addEventListener("submit", handleDDaySubmit);
