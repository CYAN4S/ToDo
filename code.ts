const userInput = <HTMLInputElement>document.getElementById("userInput");
const addButton = <HTMLButtonElement>document.getElementById("addButton");
const toDoList = <HTMLUListElement>document.getElementById("toDoList");

function closeList(params: HTMLLIElement) {
    toDoList.removeChild(params);
}

function checkList(params: HTMLLIElement) {
    if (params.className === "list") {
        params.className = "list done";
    } else {
        params.className = "list";
    }
}

function addList(): boolean {
    let inputString = userInput.value;

    if (inputString === ``) {
        alert(`You must write something.`);
        return false;
    }

    let li = document.createElement("li");
    li.className = "list";
    li.onclick = function () { checkList(li); };

    li.appendChild(document.createTextNode(inputString));

    let bt = document.createElement("a");
    bt.appendChild(document.createTextNode(" 삭제"));
    bt.onclick = function () { closeList(li); };
    bt.className = "closeButton";
    li.appendChild(bt);

    toDoList.appendChild(li);

    userInput.value = "";

    return true;
}

userInput.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
});