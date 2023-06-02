

let tasks=[];


function addTask(){

    let name=document.getElementById("task-name").value;
    let priority=document.getElementById("priority-i").value;

    if(name!=""){

        tasks.push({name :name , priority :priority, eName :name , ePriority :priority , inEdit :0});

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

        let tsk = tasks[i];

        taskHtm+= `<tr>
        <td>${i+1}</td>
        <td class="${tsk.inEdit? "d-none":""}">${tsk.name}</td>
        <td class="${tsk.inEdit? "d-none":""}">${tsk.priority}</td>
        <td class="${tsk.inEdit? "":"d-none"}" >
        <input id="task-name-i-${i}" type="text" value="${tsk.eName}" onchange="eName(${i},this)">
        </td>
        <td class="${tsk.inEdit? "":"d-none"}" >
        <select name="priority" id="priority-i-${i}" onchange="ePriority(${i},this)">
        <option value="Low" ${tsk.ePriority=='Low'? 'selected':''}>Low</option>
        <option value="Medium" ${tsk.ePriority=='Medium'? 'selected':''}>Medium</option>
        <option value="High" ${tsk.ePriority=='High'? 'selected':''}>High</option>
        </select>
        </td>
        <td>
            <button class="edit ${tsk.inEdit? "d-none":""}" onclick="edit(${i})">Edit</button>
            <button class="edit ${tsk.inEdit? "":"d-none"}" onclick="saveEdits(${i})">Save Edits</button>
            <button class="edit ${tsk.inEdit? "":"d-none"}" onclick="cancelEdits(${i})">Cancel Edits</button>
            <button class="delete ${tsk.inEdit? "d-none":""}" onclick="deleteTask(${i})">Delete</button>
        </td> 
        </tr>`;

    }
    

    taskHtm+= ( tasks.reduce((t,n)=>t+n.inEdit,0) >1 )? 
        `<tr>
            <td colspan="3"></td>
            <td>
                <button class="edit" onclick="saveAll()">Save All</button>
            </td>
        </tr>`
        :``;


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

function eName(i,e){
    tasks[i].eName = e.value;
}
function ePriority(i,e){
    tasks[i].ePriority = e.value;
}

function saveEdits(i){

    tasks[i].inEdit=0;

    tasks[i].name=tasks[i].eName;
    tasks[i].priority=tasks[i].ePriority;

    tableRender();
}

function saveAll(){

    for (let i=0;i<tasks.length;i++){
        if(tasks[i].inEdit){
            saveEdits(i);
        }
    }

    tableRender();
}

function cancelEdits(i){

    tasks[i].inEdit=0;

    tasks[i].eName=tasks[i].name;
    tasks[i].ePriority=tasks[i].priority;

    tableRender();
}

