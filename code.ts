const userInput = <HTMLInputElement>document.getElementById("userInput");
const addButton = <HTMLButtonElement>document.getElementById("addButton");
const toDoList = <HTMLUListElement>document.getElementById("toDoList");

function closeList(params: HTMLLIElement) {
    toDoList.removeChild(params);
    localStorage.setItem("todo", toDoList.innerHTML);
}

function checkList(params: HTMLLIElement) {
    if (params.className === "list") {
        params.className = "list done";
    } else {
        params.className = "list";
    }
    localStorage.setItem("todo", toDoList.innerHTML);
}

function addList(): boolean {
    let inputString = userInput.value;

    if (inputString === ``) {
        alert(`You must write something.`);
        return false;
    }

    let li = document.createElement("li");
    li.className = "list";
    //li.onclick = function () { checkList(li); };
    li.addEventListener("click", function () { checkList(li); });

    li.appendChild(document.createTextNode(inputString));

    let dd = document.createElement("span");
    dd.appendChild(document.createElement("br"));
    dd.appendChild(document.createTextNode("" + new Date().toLocaleString()));
    dd.className = "time";
    li.appendChild(dd);

    let bt = document.createElement("a");
    bt.appendChild(document.createTextNode(" 삭제"));
    bt.onclick = function () { closeList(li); };
    bt.className = "closeButton";
    li.appendChild(bt);

    toDoList.appendChild(li);

    userInput.value = "";

    localStorage.setItem("todo", toDoList.innerHTML);

    return true;
}

userInput.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
});

if ("todo" in localStorage) {
    toDoList.innerHTML = <string>localStorage.getItem("todo");
    const listclasses = toDoList.getElementsByClassName("list");
    for (const iterator of listclasses) {
        iterator.addEventListener("click", function () { checkList(<HTMLLIElement>iterator); });
        let i = iterator.getElementsByTagName("a")[0];
        i.addEventListener("click", function () {closeList(<HTMLLIElement>iterator)});
    }
}