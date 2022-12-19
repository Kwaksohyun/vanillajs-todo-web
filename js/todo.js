const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

// 오직 toDos array의 내용을 localStorage에 넣는 것
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.currentTarget.parentElement;                 // <button>의 부모인 <li>
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));  // toDos DB에서 todo 삭제
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    
    const input = document.createElement("input");
    input.type = 'checkbox';
    input.id = 'chk_todo_'+ newTodo.id;
    const label = document.createElement("label");
    label.htmlFor = 'chk_todo_'+ newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.type = 'button';
    const buttonImage = document.createElement("img");
    buttonImage.src = 'images/icon/cancel_icon.png';
    
    button.addEventListener("click", deleteToDo);

    li.appendChild(input);
    li.appendChild(label);
    label.appendChild(span);       // <label> 태그 안에 <span>태그
    li.appendChild(button);       // <li> 태그 안에 <input>,<label>,<button> 태그
    button.appendChild(buttonImage);
    
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();     // submit 기본동작인 새로고침이 일어나지 않음
    const newTodo = toDoInput.value;
    toDoInput.value = "";       // input에서 엔터를 누를 때마다 입력한 것을 비움

    const newTodoObj = {
        id:Date.now(),
        text: newTodo
    }
    toDos.push(newTodoObj);

    paintToDo(newTodoObj);  // #2. 화면에 보여줌
    saveToDos(newTodo);     // #3. 저장
}

// #1. 사용자가 submit하면
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); // string

if(savedToDos !== null) {
    const parseToDos = JSON.parse(savedToDos);  // array
    toDos = parseToDos;              // 전에 있던 toDo들 복원
    parseToDos.forEach(paintToDo);  // parseToDos의 각 item을 화면에 출력
}