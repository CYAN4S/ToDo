const userInput = document.getElementById("userInput");
const addButton = document.getElementById("addButton");
const toDoList = document.getElementById("toDoList");

function closeList(params) {
    let closeButton = params;
    let list = closeButton.parentElement;
    list.parentElement.removeChild(list);
}

function checkList(params) {
    if (params.className === "list") {
        params.className = "list done";
    }
    else {
        params.className = "list";
    }
}

function addList() {
    let inputString = userInput.value;

    if (inputString === ``) {
        alert("You must write something.");
        return false;
    }

    let li = document.createElement("li");
    li.className = "list";
    li.onclick = function () { checkList(this); }

    let tx = document.createTextNode(inputString);
    li.appendChild(tx);

    let bt = document.createElement("a");
    bt.appendChild(document.createTextNode(" 삭제"));
    bt.onclick = function () { closeList(this); }
    bt.className = "closeButton";
    li.appendChild(bt);

    toDoList.appendChild(li);

    userInput.value = "";

    return true;
}

userInput.addEventListener("keyup",
    function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addButton.click();
        }
    }
);