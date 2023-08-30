const tableBodyTrs=document
.querySelector(".tableBody")
.querySelectorAll(".tr");
//console.log(tableBodyTrs);


function createForm(){
  let form = document.createElement("form");

  form.innerHTML=`
  <th>
        <input type="text" class="orange" placeholder="Enter Day"/>
      </th>
      <td>
        <input type="time" class="green" id="start-work"/>
      </td>

      <td>
        <input type="time" class="blue" id="start-break"/>
      </td>

      <td>
        <input type="time" class="blue" id="end-break"/>
      </td>

      <td>
      <input type="time" class="green" id="end-work">
    </td>

      <td>
        <input class="workedHours purple" value="00:00"/>
      </td>
      
  
        <button class="btn" type="submit">Add</button>
      </td> 
  `;
  return form;
}

// console.log(createForm());

 (async ()=>{
    tableBodyTrs.forEach(tr => tr.appendChild(createForm()));
 })();

 const forms=document.querySelectorAll("form");
 //console.log(forms);

 forms.forEach(form=>form.addEventListener("submit",function (e){
   e.preventDefault();

   const day = e.target.children[0].value;
   //console.log(day);
   const startWork = e.target.children[1].value;
   const startBreak = e.target.children[2].value;
   const endBreak = e.target.children[3].value;
   const endWork = e.target.children[4].value;
   let worked = e.target.children[5];
   let submitBtn = e.target.children[6];

   //validation

   //validateSusmission(day,startWork,endWork,submitBtn);

   //Calc the daily hours worked

   worked.value = calcDailyWorkedHours(startWork,endWork,startBreak,endBreak);

  //Calc Total Hours worked

  calculateTotalWorkedHours();
 })
 );
 //todo: Create validation Function

 function validateSusmission(day, startWork,  endWork, submitBtn) {
   if(day===""|| startWork===""|| endWork===""){
     alert("Complete work day, start and end work hour");

   }else{
     submitBtn.classList.add("btn-green");
     submitBtn.innerHTML="&#10004";
     return true;
   }
 }

 //todo: Create function calcDailyWorkedHours

 function calcDailyWorkedHours(startWork,endWork,startBreak,endBreak) {
   startWork=startWork.split(":");
   endWork = endWork.split(":");
   startBreak = startBreak.split(":");
   endBreak = endBreak.split(":");

   //Work time
const startWorkDate = new Date(0, 0, 0,startWork[0], startWork[1], 0);

const endWorkDate = new Date(0, 0, 0, endWork[0], endWork[1], 0);
const diffWork=endWorkDate.getTime() - startWorkDate.getTime();

// Break time
const startBreakDate = new Date(0, 0, 0,startBreak[0], startBreak[1], 0);

const endBreakDate = new Date(0, 0, 0, endBreak[0], endBreak[1], 0);
const diffBreak=endBreakDate.getTime() - startBreakDate.getTime();

let diffFinal= (isNaN (diffWork) ? 0 : diffWork) - (isNaN(diffBreak) ? 0 : diffBreak);

let hours = Math.floor(diffFinal /1000 / 60 /60 );

diffFinal -= hours * 1000 * 60 * 60;
const minutes = Math.floor(diffFinal / 1000 / 60);

console.log(diffFinal);
return (hours < 0 ? "0" : "") + hours + ":" +(minutes < 9 ? "0" : "") + minutes;
 }

 //Tdo: create a function to calculateTotalWorkedHours

 function calculateTotalWorkedHours(){
   const allWorkedHours = document.querySelectorAll(".workedHours");

   let arrayOfWorkedHours = Array.from(allWorkedHours);

   console.log(arrayOfWorkedHours);
 }