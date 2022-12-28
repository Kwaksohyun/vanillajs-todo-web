const loginScreen = document.querySelector("#login-container");
const mainScreen = document.querySelector("#main-container");
const loginInput = document.querySelector("#login-form input");

const greeting = document.querySelector("#greeting");
const greeting2 = document.querySelector("#greeting2");

const logoutBtn = document.querySelector("#logout-btn");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// form의 submit event 감지
function OnLoginSubmit(event) { // argument로 event에 대한 정보를 준다.
    event.preventDefault();     // event의 기본 동작(페이지 새로고침)을 막는다.

    loginScreen.classList.add(HIDDEN_CLASSNAME);
    
    const username = loginInput.value;              // input으로 받은 유저정보 저장 
    localStorage.setItem(USERNAME_KEY, username);   // local Storage에 username 저장(브라우저가 기억)

    paintGreetings(username);   // input에 입력한 username을 가진 paintGreetings 호출
}


function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}!`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting2.innerText = `Have a good day :)`;
    greeting2.classList.remove(HIDDEN_CLASSNAME);

    mainScreen.classList.remove(HIDDEN_CLASSNAME);
}

// 1. local storage 확인
const savedUsername = localStorage.getItem(USERNAME_KEY);

// local storage에 user 정보의 유무 확인하기
if(savedUsername === null) {
    // show the login-form
    loginScreen.classList.remove(HIDDEN_CLASSNAME);
    loginScreen.addEventListener("submit", OnLoginSubmit);
} else {
    // show the greetings
    paintGreetings(savedUsername);      // local stoage에 저장된 username을 가진 paintGreetings 호출
}


// logout
function onLogoutBtnClick() {
    const logoutResult = confirm("입력하신 이름, 할 일 항목 등이 삭제됩니다.\n로그아웃하시겠습니까?");
    if(logoutResult == true) {      // 확인 = true, 취소 = false
        alert("로그아웃되었습니다.");
        localStorage.clear();
        window.location.reload();
    } else {
        return;
    }   
}

logoutBtn.addEventListener('click', onLogoutBtnClick);