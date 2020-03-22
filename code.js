var userInput = document.getElementById("userInput");
var addButton = document.getElementById("addButton");
var toDoList = document.getElementById("toDoList");
function closeList(params) {
    toDoList.removeChild(params);
    localStorage.setItem("todo", toDoList.innerHTML);
}
function checkList(params) {
    if (params.className === "list") {
        params.className = "list done";
    }
    else {
        params.className = "list";
    }
    localStorage.setItem("todo", toDoList.innerHTML);
}
function addList() {
    var inputString = userInput.value;
    if (inputString === "") {
        alert("You must write something.");
        return false;
    }
    var li = document.createElement("li");
    li.className = "list";
    //li.onclick = function () { checkList(li); };
    li.addEventListener("click", function () { checkList(li); });
    li.appendChild(document.createTextNode(inputString));
    var dd = document.createElement("span");
    dd.appendChild(document.createTextNode(" " + new Date().toLocaleString()));
    dd.className = "time";
    li.appendChild(dd);
    var bt = document.createElement("a");
    bt.appendChild(document.createTextNode(" 삭제"));
    bt.onclick = function () { closeList(li); };
    bt.className = "closeButton";
    li.appendChild(bt);
    toDoList.appendChild(li);
    userInput.value = "";
    localStorage.setItem("todo", toDoList.innerHTML);
    return true;
}
userInput.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
});
if ("todo" in localStorage) {
    toDoList.innerHTML = localStorage.getItem("todo");
    var listclasses = toDoList.getElementsByClassName("list");
    var _loop_1 = function (iterator) {
        iterator.addEventListener("click", function () { checkList(iterator); });
        var i = iterator.getElementsByTagName("a")[0];
        i.addEventListener("click", function () { closeList(iterator); });
    };
    for (var _i = 0, listclasses_1 = listclasses; _i < listclasses_1.length; _i++) {
        var iterator = listclasses_1[_i];
        _loop_1(iterator);
    }
}
