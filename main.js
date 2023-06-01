

let tasks=[];


function addTask(){

    let name=document.getElementById("task-name").value;
    let priority=document.getElementById("priority-i").value;

    if(name!=""){

        tasks.push({"name":name , "priority":priority , "inEdit":0});

        filter();
    }
    else{
        alert("Task name can't be empty");
    }

}

function deleteTask(i){

    tasks.splice(i, 1);

    tableRender();
}


function tableRender(){

    let tBody=document.getElementById("tasks");
    let taskHtm="";

    for (let i=0;i<tasks.length;i++){

        taskHtm+= `<tr>
        <td>${i+1}</td>
        <td class="${tasks[i].inEdit? "d-none":""}">${tasks[i].name}</td>
        <td class="${tasks[i].inEdit? "d-none":""}">${tasks[i].priority}</td>
        <td class="${tasks[i].inEdit? "":"d-none"}" "><input id="task-name-i-${i}" type="text" value="${tasks[i].name}"></td>
        <td class="${tasks[i].inEdit? "":"d-none"}" >
        <select name="priority" id="priority-i-${i}">
        <option value="Low" ${tasks[i].priority=='Low'? 'selected':''}>Low</option>
        <option value="Medium" ${tasks[i].priority=='Medium'? 'selected':''}>Medium</option>
        <option value="High" ${tasks[i].priority=='High'? 'selected':''}>High</option>
        </select>
        </td>
        <td>
            <button class="edit ${tasks[i].inEdit? "d-none":""}" onclick="edit(${i})">Edit</button>
            <button class="edit ${tasks[i].inEdit? "":"d-none"}" onclick="saveEdits(${i})">Save Edits</button>
            <button class="edit ${tasks[i].inEdit? "":"d-none"}" onclick="cancelEdits(${i})">Cancel Edits</button>
            <button class="delete ${tasks[i].inEdit? "d-none":""}" onclick="deleteTask(${i})">Delete</button>
        </td> 
        </tr>`;

    }

    tBody.innerHTML=taskHtm;
}


function filter(){

    let f = document.getElementById("filter").value;

    if(f==2){
        tasks.sort(function(a, b){return (a.priority=='Medium')? -1 :1 });
        tasks.sort(function(a, b){return (a.priority=='High')? -1 :1 });
    }
    else if(f==1){
        tasks.sort(function(a, b){return (a.priority=='Medium')? -1 :1 });
        tasks.sort(function(a, b){return (a.priority=='Low')? -1 :1 });
    }

    tableRender();

}


function edit(i){
    tasks[i].inEdit=1;
    tableRender();
}

function saveEdits(i){

    tasks[i].inEdit=0;

    let name=document.getElementById("task-name-i-"+i).value;
    let priority=document.getElementById("priority-i-"+i).value;

    tasks[i].name=name;
    tasks[i].priority=priority;

    tableRender();
}

function cancelEdits(i){

    tasks[i].inEdit=0;

    tableRender();
}