var id = 1;
var arr=[];
function savetext() {
    //start date
    var sdate = document.getElementById("selectDate");
    var entereddate = sdate.value;
    var date = new Date(entereddate);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    //end date
    var eDate = document.getElementById("EndDate");
    var lastDate = eDate.value;
    var endD = new Date(lastDate);
    var emonth = endD.getMonth() + 1;
    var eyear = endD.getFullYear();

    // excluded date
    var excluded = document.getElementById("exclude");
    var exdate = excluded.value;
    var exda = new Date(exdate);

    // lead count
    var leadcount = document.getElementById("lead");
    var getlead = leadcount.value;

    if (entereddate > lastDate) {
        alert("Start Date cannot by greater than End Date");
    }
    if (exda < date || exda > endD) {
        alert("Invalid Selection, Excluded Dates should be in between Start and End Date");
    }
    if (isNaN(date) || isNaN(endD) || getlead == "" || !isNaN(exda)) {
        alert("Enter Complete Details Except excluded dates which should be included after Saving the rest data by clicking save button");
    }

    if (!isNaN(date) && !isNaN(endD) && isNaN(exda) && getlead != "" && date<endD) {
        var superparent = document.getElementById("grid");
        var parent = document.createElement("div");

        //action column
        var action = document.createElement("div");
        action.innerHTML = `<button onclick="Save()" id="cancel">Done</button>`;
        parent.appendChild(action);

        //id column
        var pid = document.createElement("div");
        pid.innerHTML = id;
        pid.className = `${id}`;
        id++;
        parent.appendChild(pid);

        // start date column
        var startDate = document.createElement("div");
        startDate.innerHTML = date.getDate() + "/" + month + "/" + year;
        parent.appendChild(startDate);

        //end date column
        var End = document.createElement("div");
        End.textContent = endD.getDate() + "/" + emonth + "/" + eyear;
        parent.appendChild(End);

        // month and year
        var monthyear = document.createElement("div");
        monthyear.textContent = month + ", " + year;
        parent.appendChild(monthyear);

        let dateValue = [];
        const excludedDatesElement = document.createElement("div");
        excludedDatesElement.id = `${id}`;
        excluded.addEventListener("input", function () {
        const inputvalue = excluded.value;
        var valid = new Date(inputvalue);
        if(valid>date && valid<endD){
            dateValue.push(inputvalue);
            updateDisplayedValues();
        }
        else{
            alert('Excluded date should be in between Start and End Date');
           }
        });
        function updateDisplayedValues() {
        var elemnt = document.getElementById(id);
        elemnt.textContent = dateValue.join(", ");
        }
        parent.appendChild(excludedDatesElement);
        
        // enter no of day
        // lets consider on average day to be 30
        var mothTotal = emonth - month;
        var no_of_days = mothTotal * 30 - date.getDate() + endD.getDate();
        var No_days = document.createElement("div");
        No_days.textContent = no_of_days;
        parent.appendChild(No_days);

        var lead = document.createElement("div");
        lead.textContent = getlead;
        parent.appendChild(lead);

        var drr = document.createElement("div");
        drr.textContent = getlead / no_of_days;
        parent.appendChild(drr);

        var currentTime = document.createElement("div");
        var presnt = new Date();
        var time=presnt.getDate() +"/" +(presnt.getMonth() + 1) +"/" +presnt.getFullYear() +"," +presnt.getHours() +":" +presnt.getMinutes() +":" +presnt.getSeconds();
        currentTime.textContent =time;
        parent.appendChild(currentTime);
        superparent.appendChild(parent);

        //saving data in URL using AJAX
        arr = [date,endD,dateValue,no_of_days,getlead/no_of_days,time];
    }
}
function remove() {
    var stDate = document.getElementById("selectDate");
    var endDate = document.getElementById("EndDate");
    var excluded = document.getElementById("exclude");
    var lead = document.getElementById("lead");
    stDate.value = "";
    endDate.value = "";
    excluded.value = "";
    lead.value = "";
}
console.log(arr);
function Save(){
    var stDate = document.getElementById("selectDate");
    var endDate = document.getElementById("EndDate");
    var excluded = document.getElementById("exclude");
    var lead = document.getElementById("lead");
    stDate.value = "";
    endDate.value = "";
    excluded.value = "";
    lead.value = "";
    const postData ={
        data:arr
    };
    const url = "https://example.com/your-api-endpoint";

    // Send a POST request to the server
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        alert("Data saved: " + data.message);
    })
    .catch(error => {
        // Handle errors or network issues
        alert("Error: " + error.message);
    });
}