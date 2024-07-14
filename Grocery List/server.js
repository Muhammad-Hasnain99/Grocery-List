//select elements
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const container = document.querySelector(".grocery-container")
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const clearBtn = document.querySelector(".clear-btn")
const List = document.querySelector(".grocery-list")


let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit",addItem)
clearBtn.addEventListener("click" , clearItems)

function addItem(e){
    e.preventDefault();
    const value = grocery.value
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        const element = document.createElement(`article`)
        element.classList.add("grocery-item")

        const attr = document.createAttribute(`data-id`)
        attr.value = id;
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title text-xl">${value}</p>
                         <div class="btn-container absolute right-2 opacity-[0.5] top-2 space-x-1">
                        <button type="button" class="delete-btn">
                            <i class='bx bxs-trash' style='color:#e80909'  ></i>
                        </button>
                    </div>`;

     const deleteBtn = element.querySelector(".delete-btn")
     deleteBtn.addEventListener("click", deleteItem)

     List.appendChild(element)
    displayAlert("Item Added To The List" , "success")
    container.classList.add("show-container")

    addToTheLocalStorage()
    setBackToDefault()
    }
    else if(value && editFlag){
        console.log("editing")
    }
    else{
        displayAlert("Please Enter Value" , "danger")
    }
}
//Display Alert
function displayAlert(text,action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    },1000)
}

function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit"
}

function addToTheLocalStorage(){
    console.log("edit to Local storage")
}

//Clear Items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item")
    if(items.length > 0){
        items.forEach(function(item){
            List.removeChild(item);
        });
    }
    container.classList.remove("show-container")
    displayAlert("Empty List" , "danger")
}

//Delete Item
function deleteItem(e){
 const element = e.currentTarget.parentElement.parentElement;
 List.removeChild(element)
 if(List.children.length === 0){
    container.classList.remove("show-container")
 }
 displayAlert("Item Removed", "danger")
}