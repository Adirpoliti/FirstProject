const elements = () => {
    const todoTask = document.getElementById("todoTask");
    const todoTaskDescription = document.getElementById("todoTaskDescription");
    const todoTime = document.getElementById("todoTime");
    const newTask = document.getElementById("newTask");
    const todoDate = document.getElementById("todoDate");
}

const validation = () => {
    elements
    if (todoTask.value === "") {
        alert("Enter Todo Task name")
        todoTask.style.outlineColor = "red";
        todoTask.focus();
        return false
    } else if (todoTaskDescription.value === "") {
        alert("Enter Todo Task Description")
        todoTaskDescription.style.outlineColor = "red";
        todoTaskDescription.focus();
        return false
    } else if (todoDate.value === "") {
        alert("Enter Todo Due Date")
        todoDate.style.outlineColor = "red";
        todoDate.focus();
        return false
    } else if (todoTime.value === "") {
        alert("Enter Todo Due Time")
        todoTime.style.outlineColor = "red";
        todoTime.focus();
        return false
    }
    newTask.addEventListener("click", () => cleanForm())
    return uploadNewTodoToLocalStorage()
}

const getLocalStorageArray = () => {
    const storageArray = localStorage.getItem("todoTasks");
    if (storageArray) {
        return JSON.parse(storageArray);
    } else {
        return []
    }
}

const createNewTodoObject = (todoTask, todoTaskDescription, todoDate, todoTime) => {
    return { todoTask, todoTaskDescription, todoDate, todoTime }
}

const updateObjToLocalStorage = (newArray) => {
    localStorage.setItem("todoTasks", JSON.stringify(newArray))
}

const uploadNewTodoToLocalStorage = () => {
    const newUserObj = createNewTodoObject(todoTask.value, todoTaskDescription.value, todoDate.value, todoTime.value)
    const storageArray = getLocalStorageArray();
    storageArray.push(newUserObj)
    updateObjToLocalStorage(storageArray)
    cleanForm();
    ShowTask();
}

const ShowTask = () => {
    const storageArray = getLocalStorageArray();
    const showTaskDiv = document.getElementById("todoShowTasks")
    const date = new Date();
    let index = 0;
    showTaskDiv.innerHTML = ""
    for (const tasks of storageArray) {
        showTaskDiv.innerHTML += `
        <div class = "card">
            <h2> ${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()} </h2>
            <h3> ${tasks.todoTask}</h3>
            <hr/>
            <div id="todoDescriptionDiv"><p>${tasks.todoTaskDescription}</p></div>
            <span>Due date<br/> ${tasks.todoDate} <br/>Due Time<br/> ${tasks.todoTime} </span><br/>
            <div><button class="btn" id="delete" onclick="deleteItem(${index})">Delete </button>
            <button class="btn" id="edit" onclick="editItem(${index})">Edit </button>
            </div>
        `
        index++
    }
    getPresentDate();
    return index;
}

const getPresentDate = () => {
    const dateInput = document.getElementById("todoDate");
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let newDate = changeFormat(date);
    if (newDate[1].length === 1) {
        newDate = newDate.split('-');
        newDate[1] = '0' + newDate[1];
        newDate = newDate.toString();
        newDate = newDate.replaceAll(",", "-");
        dateInput.setAttribute("min", newDate);
    } else {
        dateInput.setAttribute("min", newDate);
    }
}

const cleanForm = () => {
    todoTask.value = "";
    todoTask.style.outlineColor = ""
    todoTaskDescription.value = "";
    todoTaskDescription.style.outlineColor = ""
    todoDate.value = "";
    todoDate.style.outlineColor = ""
    todoTime.value = "";
    todoTime.style.outlineColor = ""
}

const deleteButton = (index) => {
    return `<button class="btn" onclick="deleteItem(${index})"> Delete </button>`
}

const deleteItem = (index) => {
    const storageArray = getLocalStorageArray();
    storageArray.splice(index, 1);
    updateObjToLocalStorage(storageArray);
    ShowTask();
}

const editItem = (index) => {
    elements
    const storageArray = getLocalStorageArray();
    for (const field in storageArray[index]) {
        if (field === "todoTask") todoTask.value = storageArray[index][field]
        if (field === "todoTaskDescription") todoTaskDescription.value = storageArray[index][field]
        if (field === "todoTime") todoTime.value = storageArray[index][field]
        if (field === "todoDate") todoDate.value = storageArray[index][field]
    }
    const newTaskButtons = document.getElementById("newTaskButtons")
    const editTaskButtons = document.getElementById("editTaskButtons")
    newTaskButtons.setAttribute("hidden", true)
    editTaskButtons.removeAttribute("hidden")
    saveChange.addEventListener("click", () => deleteItem(index))
    updateObjToLocalStorage(storageArray);
}

const changeFormat = (date) => {
    const d_arr = date.split("-");
    return d_arr[2] + '-' + d_arr[1] + '-' + d_arr[0];
}

const editValidation = (index) => {
    elements
    if (todoTask.value === "") {
        alert("Enter Todo Task name")
        todoTask.style.outlineColor = "red";
        todoTask.focus();
        return false
    } else if (todoTaskDescription.value === "") {
        alert("Enter Todo Task Description")
        todoTaskDescription.style.outlineColor = "red";
        todoTaskDescription.focus();
        return false
    } else if (todoDate.value === "") {
        alert("Enter Todo Due Date")
        todoDate.style.outlineColor = "red";
        todoDate.focus();
        return false
    } else if (todoTime.value === "") {
        alert("Enter Todo Due Time")
        todoTime.style.outlineColor = "red";
        todoTime.focus();
        return false
    }
    saveChange.addEventListener("click", () => cleanForm())
    const newTaskButtons = document.getElementById("newTaskButtons")
    const editTaskButtons = document.getElementById("editTaskButtons")
    newTaskButtons.removeAttribute("hidden")
    editTaskButtons.setAttribute("hidden", true)
    return uploadEditTodoToLocalStorage()
}

const cancelChange = () => {
    const newTaskButtons = document.getElementById("newTaskButtons")
    const editTaskButtons = document.getElementById("editTaskButtons")
    newTaskButtons.removeAttribute("hidden")
    editTaskButtons.setAttribute("hidden", true)
}

const uploadEditTodoToLocalStorage = () => {
    const newUserObj = createNewTodoObject(todoTask.value, todoTaskDescription.value, todoDate.value, todoTime.value)
    const storageArray = getLocalStorageArray();
    storageArray.push(newUserObj)
    updateObjToLocalStorage(storageArray)
    cleanForm();
    ShowTask();
}