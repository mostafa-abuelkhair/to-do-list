

let tasks=[];


function addTask(){

    let name=document.getElementById("task-name").value;
    let priority=document.getElementById("priority-i").value;

    if(name!=""){

        tasks.push({"name":name , "priority":priority});
        
        tableRender();
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
        <td>${tasks[i].name}</td>
        <td>${tasks[i].priority}</td>
        <td>
            <button class="delete" onclick="deleteTask(${i})">Delete</button>
        </td> 
        </tr>`;

    }

    tBody.innerHTML=taskHtm;
}