const dDayFormBtn = document.querySelector(".dDay-form__display-btn");
const dDAyFormBtnImg = dDayFormBtn.querySelector("img");

const dDayForm = document.getElementById("dDay-form");
const dDayTitleInput = dDayForm.querySelector(`input[type="text"]`);
const dDayDateInput = dDayForm.querySelector(`input[type="date"]`);
const dDayList = document.getElementById("dDay-list");

const PLUS_CLASSNAME = "plus";
const DDAY_KEY = "ddays";

let dDays = [];

function handleDDayFormDisplayBtnClick() {
    const isFormDisplayed = dDayFormBtn.classList.contains(PLUS_CLASSNAME);

    if(isFormDisplayed) {
        // plus인 상태
        dDayFormBtn.classList.remove(PLUS_CLASSNAME);
        dDayForm.classList.remove(HIDDEN_CLASSNAME);
        dDAyFormBtnImg.src = 'images/icon/minus_circle_icon.png';
    } else {
        dDayFormBtn.classList.add(PLUS_CLASSNAME);
        dDayForm.classList.add(HIDDEN_CLASSNAME);
        dDAyFormBtnImg.src = 'images/icon/plus_circle_icon.png';
    }
}

function saveDDays() {
    localStorage.setItem(DDAY_KEY, JSON.stringify(dDays));
}

function deleteDDay(event) {
    const li = event.currentTarget.parentElement;
    li.remove();
    dDays = dDays.filter((newdDayObj) => newdDayObj.id !== parseInt(li.id));
    saveDDays();
}

function paintDDay(newdDayObj) {
    const li = document.createElement("li");
    li.className = 'dDay-list__item';
    li.id = newdDayObj.id;

    const div1 = document.createElement("div");
    div1.className = 'dDay-list__item-info';

    const div2 = document.createElement("div");
    div2.className = 'item-info__title';

    const dDayImage = document.createElement("img");
    dDayImage.src = 'images/icon/calendar_check_icon.png';

    const div3 = document.createElement("div");
    div3.className = 'item-info__text';
    const spanTitle = document.createElement("span");
    spanTitle.className = 'dDay-title';
    spanTitle.innerText = newdDayObj.title;

    const spanDate = document.createElement("span");
    spanDate.className = 'dDay-date';
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfTheWeek = new Date(newdDayObj.date).getDay();
    spanDate.innerText = `${newdDayObj.date} (${week[dayOfTheWeek]})`;

    const button = document.createElement("button");
    button.type = 'button';
    const buttonImg = document.createElement("img");
    buttonImg.src = 'images/icon/delete_icon.png';

    button.addEventListener("click", deleteDDay);
    
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

    li.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(dDayImage);
    div2.appendChild(div3);
    div3.appendChild(spanTitle);
    div3.appendChild(spanDate);
    div1.appendChild(spanDDay);
    li.appendChild(button);
    button.appendChild(buttonImg);

    dDayList.appendChild(li);
}

function handleDDaySubmit(event) {
    event.preventDefault();

    const newdDayTitle = dDayTitleInput.value;
    dDayTitleInput.value = "";

    const newdDayDate = dDayDateInput.value;    //2022-12-19(string)
    const newdDayObj = {
        id:Date.now()*2,
        title: newdDayTitle,
        date: newdDayDate
    } 
    dDays.push(newdDayObj);

    paintDDay(newdDayObj);
    saveDDays(newdDayObj);
}

dDayFormBtn.addEventListener("click", handleDDayFormDisplayBtnClick);
dDayForm.addEventListener("submit", handleDDaySubmit);

const savedDDays = localStorage.getItem(DDAY_KEY);

if(savedDDays !== null) {
    const parseDDays = JSON.parse(savedDDays);
    dDays = parseDDays;
    parseDDays.forEach(paintDDay);
}