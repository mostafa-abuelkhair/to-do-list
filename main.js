

class task {

    name;
    priority;
    eName;
    ePriority;
    inEdit;
    date;
    status;
    eDate;
    eStatus;
    checked;

    constructor(n,p,en,ep,ie,d,s,ed,es,ch){

        this.name=n;
        this.priority=p;
        this.eName=en;
        this.ePriority=ep;
        this.inEdit=ie;
        this.date=d;
        this.status=s;
        this.eDate=ed;
        this.eStatus=es;
        this.checked=ch;

    }

}


class tasksList {

    tasks=[];
    tBody;

    constructor(b){
        this.tBody=b;
    }

    addTask(){

        let name=document.getElementById("task-name").value;
        let priority=document.getElementById("priority-i").value;
    
        if(name!=""){

            let d = (new Date()).toLocaleDateString('en-US');
    
            this.tasks.push( new task(name,priority,name,priority,0,d,'Not Done',d,'Not Done',0) );
    
            this.filter();
        }
        else{
            alert("Task name can't be empty");
        }
        
        document.getElementById("task-name").value='';
    }
    
    deleteTask(i){
    
        this.tasks.splice(i, 1);
    
        this.tableRender();
    }
    
    
    tableRender(){
    
        
        let taskHtm="";
    
        for (let i=0;i<this.tasks.length;i++){
    
            let tsk = this.tasks[i];
    
            taskHtm+= `<tr>
            <td>${i+1}</td>
            <td class="${tsk.inEdit? "d-none":""}">${tsk.name}</td>
            <td class="${tsk.inEdit? "d-none":""}">${tsk.priority}</td>
            <td class="${tsk.inEdit? "":"d-none"}" >
            <input id="task-name-i-${i}" type="text" value="${tsk.eName}" onchange="tList.eName(${i},this)">
            </td>
            <td class="${tsk.inEdit? "":"d-none"}" >
            <select name="priority" id="priority-i-${i}" onchange="tList.ePriority(${i},this)">
            <option value="Low" ${tsk.ePriority=='Low'? 'selected':''}>Low</option>
            <option value="Medium" ${tsk.ePriority=='Medium'? 'selected':''}>Medium</option>
            <option value="High" ${tsk.ePriority=='High'? 'selected':''}>High</option>
            </select>
            </td>
            <td class="${tsk.inEdit? "d-none":""}"> 
                ${tsk.date}
            </td>
            <td class="${tsk.inEdit? "d-none":""}"> 
                ${tsk.status}
            </td>
            <td class="${tsk.inEdit? "":"d-none"}" >
            <input id="task-date-i-${i}" type="text" value="${tsk.eDate}" onchange="tList.eDate(${i},this)">
            </td>
            <td class="${tsk.inEdit? "":"d-none"}" >
            <select name="status" id="status-i-${i}" onchange="tList.eStatus(${i},this)">
            <option value="Not Done" ${tsk.eStatus=='Not Done'? 'selected':''}>Not Done</option>
            <option value="Done" ${tsk.eStatus=='Done'? 'selected':''}>Done</option>
            </select>
            </td>

            <td>
                <button class="edit ${tsk.inEdit? "d-none":""}" onclick="tList.edit(${i})">Edit</button>
                <button class="edit ${tsk.inEdit? "":"d-none"}" onclick="tList.saveEdits(${i})">Save Edits</button>
                <button class="edit ${tsk.inEdit? "":"d-none"}" onclick="tList.cancelEdits(${i})">Cancel Edits</button>
                <button class="delete ${tsk.inEdit? "d-none":""}" onclick="tList.deleteTask(${i})">Delete</button>
                <input class="check" type="checkbox" ${tsk.checked? 'checked':''} onclick="tList.check(${i})">
            </td>
            </tr>`;
    
        }
        
        
        taskHtm+= `<tr><td colspan="5"></td><td>`;

        taskHtm+= ( this.tasks.reduce((t,n)=>t+n.inEdit,0) >1 )? 
            `
                    <button class="edit" onclick="tList.saveAll()">Save All</button>

            `
            :``;

            taskHtm+= ( this.tasks.length>0 )? 
            `
                    <button class="delete" onclick="tList.DeleteChecked()">Delete Checked</button>
            `
            :``;
        
        taskHtm+= `</td></tr>`;
    
    
        this.tBody.innerHTML=taskHtm;
    }
    
    
    filter(){
    
        let f = document.getElementById("filter").value;
    
        if(f==2){
            this.tasks.sort(function(a, b){return (a.priority=='Medium')? -1 :1 });
            this.tasks.sort(function(a, b){return (a.priority=='High')? -1 :1 });
        }
        else if(f==1){
            this.tasks.sort(function(a, b){return (a.priority=='Medium')? -1 :1 });
            this.tasks.sort(function(a, b){return (a.priority=='Low')? -1 :1 });
        }
    
        this.tableRender();
    
    }
    
    
    edit(i){
        this.tasks[i].inEdit=1;
        this.tableRender();
    }
    
    eName(i,e){
        this.tasks[i].eName = e.value;
    }

    ePriority(i,e){
        this.tasks[i].ePriority = e.value;
    }

    eDate(i,e){
        this.tasks[i].eDate = e.value;
    }

    eStatus(i,e){
        this.tasks[i].eStatus = e.value;
    }

    check(i,e){
        this.tasks[i].checked=this.tasks[i].checked? 0:1;
    }
    
    saveEdits(i){
    
        this.tasks[i].inEdit=0;
    
        this.tasks[i].name=this.tasks[i].eName;
        this.tasks[i].priority=this.tasks[i].ePriority;
        this.tasks[i].date=this.tasks[i].eDate;
        this.tasks[i].status=this.tasks[i].eStatus;
    
        this.tableRender();
    }
    
    saveAll(){
    
        for (let i=0;i<this.tasks.length;i++){
            if(this.tasks[i].inEdit){
                this.saveEdits(i);
            }
        }
    
    }

    
    cancelEdits(i){
    
        this.tasks[i].inEdit=0;
    
        this.tasks[i].eName=this.tasks[i].name;
        this.tasks[i].ePriority=this.tasks[i].priority;
    
        this.tableRender();
    }

    DeleteChecked(){

        for (let i=0;i<this.tasks.length;i++){
            if(this.tasks[i].checked){
                this.deleteTask(i);
                i--;
            }
        }

    }
    
}



let tList = new tasksList( document.getElementById("tasks") );

