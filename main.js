const todoControl = document.querySelector (".todo-control"),
todoList = document.querySelector (".todo-list"),
todoCompleted = document.querySelector (".todo-completed"),
todoContainer = document.querySelector (".todo-container");

let obj = [
{
value: "Сварить кофе",
completed: false
},

{
value: "Помыть посуду",
completed: true
}
];
LoadData();
function SaveData(){
    localStorage.setItem("objs", JSON.stringify(obj));
}
function LoadData(){
    obj = JSON.parse(localStorage.getItem("objs"));
}
const render = () =>{
SaveData();
todoList.textContent="";
todoCompleted.textContent="";
if (obj===null)obj=[]
obj.forEach((el) =>{
const li = document.createElement("li");
li.classList.add("todo-item");
li.innerHTML = `<span class="text-todo">${el.value}</span>
<div class="todo-buttons">
<button class="todo-remove"></button>
<button class="todo-complete"></button>
</div>`;
if (el.completed) todoCompleted.append(li);
else todoList.append(li);

})
}
render();

todoControl.addEventListener("submit", (event) =>{
event.preventDefault();
const input = todoControl.querySelector("input");
if ((input.value.length==0) && !(/^\s+$/.test(input.value))){
return
}
else {
newObj = {value: input.value, completed: false}
obj.push(newObj);   
render();
input.value="";}
} );

const search = (elem) =>{
const elemText = elem.querySelector("span").textContent,
elemCompleted = todoCompleted.contains(elem);
obj.forEach((el, index) =>{
if(el.value === elemText) {
if (el.completed === elemCompleted) {
ind = index;
}
}
})
return ind;



}

todoContainer.addEventListener("click", (event) =>{
event.preventDefault();
const target = event.target;
if(!target.matches("button")) return;

if (target.matches(".todo-remove")){
let index = search(target.closest("li"));


obj.splice(index,1);
};
if(target.matches(".todo-complete")){
    obj[search(target.closest("li"))].completed = !obj[search(target.closest("li"))].completed;
}
render();});
render();
// if (target.matches('.todo-complete'))
// let index = search(target.closest("li"));

