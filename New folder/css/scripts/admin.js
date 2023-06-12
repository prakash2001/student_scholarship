 
async function getResponseCheck() {

  let url ="http://localhost:8081/web/getrecord";
  console.log(url); 
  let fetchOptions = {
    
    method: "GET",
    
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }
  };

  const  res = await fetch(url, fetchOptions); 
  console.log(res);
  const body = await res.json();
  
  for(var i=0;body[i];i++){
    // console.log(body[i]);
    // console.log(body[i].id);
    // console.log(body[i].first_name);
    // console.log(body[i].last_name);
    // console.log(body[i].phone_number);
    // console.log(body[i].gender);
    // console.log(body[i].email);
    // console.log(body[i].percentange);

    const jsonResponse = JSON.stringify(body[i]);
   
    makeTableRow(jsonResponse);
    // checktable();
  }

  if (!res.ok) {
    console.log("In error block");
    let error = await res.text();
    throw new Error(error);
  }
}

function addRow() {
  var root = document.getElementById('mytab').getElementsByTagName('tbody')[0];
  var rows = root.getElementsByTagName('tr');
  var clone = cloneEl(rows[rows.length - 1]);
  // cleanUpInputs(clone);
  root.appendChild(clone);
}
function cloneEl(el) {
  var clo = el.cloneNode(true);
  return clo;
}
function cleanUpInputs(obj) {
  for (var i = 0; n = obj.childNodes[i]; ++i) {
    if (n.childNodes && n.tagName != 'INPUT') {
      cleanUpInputs(n);
    } else if (n.tagName == 'INPUT' && n.type == 'text') {
      n.value = '';
    }
  }  
}


function makeTableRow(jsonResponse){

const data = JSON.parse(jsonResponse); 


const tableBody = document.getElementById("table-body");

// Create table row element
const tableRow = document.createElement("tr");
tableRow.id = "tr-" + data["id"]; 
// console.log(tableRow.id);

const fieldOrder = ["id", "first_name", "last_name", "phone_number", "gender", "email", "percentange", "status", "change"];

// Iterate over object properties
for (let i = 0; i < fieldOrder.length; i++) {
      const field = fieldOrder[i];
      const tableData = document.createElement("td");
      tableData.id = "td-" + field;

      if (field === "status") {
        // Create select element
        const select = document.createElement("select");
  
        // Assign ID to the select element based on the field name
        select.id = "select-" + field +"-"+data["id"];
  
        // Iterate over options for the select element
        const options = ["pending", "approved"];
        for (let i = 0; i < options.length; i++) {
          const option = document.createElement("option");
          option.value = options[i];
          option.text = options[i];
  
          // Set the selected option based on the JSON value
          if (options[i] === data[field]) {
            option.selected = true;
          }
  
          select.appendChild(option);
        }
  
        // Append the select element to the table data
        tableData.appendChild(select);
      } 
      else if(field == "change") {
        const button = document.createElement("button");
        button.innerText = 'Update';
        button.setAttribute('id', 'change');
        button.addEventListener('click', () => {
        buttonResponse(tableRow.id);
        });
        tableData.appendChild(button);
      } 
      else {
      tableData.textContent = data[field];
      }
      tableRow.appendChild(tableData)
}

// Append the table row to the table body
tableBody.appendChild(tableRow);
}



async function getSelect(optionValue){
    const tableData = document.createElement("td");
    const select = document.createElement("select");
    select.id = "select-" + optionValue;
    const options = ["pending", "approved"];
    for (let i = 0; i < options.length; i++) {
      const option = document.createElement("option");
      option.value = options[i];
      option.text = options[i];

      // Set the selected option based on the JSON value
      if (options[i] === optionValue) {
        option.selected = true;
      }
      select.appendChild(option);
    }
    tableData.appendChild(select);
    return tableData;
}



function checktable(){
// JSON response string
const jsonResponse = '{"name": "John", "age": 30, "email": "john@example.com"}';

// Parse JSON response
const data = JSON.parse(jsonResponse);

// Get table body element
const tableBody = document.getElementById("table-body");

// Create table row element
const tableRow = document.createElement("tr");

// Iterate over object properties
for (let key in data) {
  if (data.hasOwnProperty(key)) {
    // Create table data element
    const tableData = document.createElement("td");

    // Check if the field is the one to render as select
    if (key === "age") {
      // Create select element
      const select = document.createElement("select");

      // Assign ID to the select element based on the field name
      select.id = "select-" + key;

      // Iterate over options for the select element
      const options = ["Option 1", "Option 2", "Option 3"];
      for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];

        // Set the selected option based on the JSON value
        if (options[i] === data[key]) {
          option.selected = true;
        }

        select.appendChild(option);
      }

      // Append the select element to the table data
      tableData.appendChild(select);
    } else {
      // Create text node for non-select fields
      const textNode = document.createTextNode(data[key]);

      // Append the text node to the table data
      tableData.appendChild(textNode);
    }

    // Append the table data to the table row
    tableRow.appendChild(tableData);
  }
}

// Append the table row to the table body
tableBody.appendChild(tableRow);

}

function buttonResponse(tableRowId){
  // console.log(tableRowId);
  let tableRow = document.getElementById(tableRowId);
  let id = tableRow.cells[0].textContent;
  let status = document.getElementById("select-status-"+id);
  // console.log("***" + id + "***" + status.value);
  const jsonobject = JSON.stringify({"id":id, "status":status.value});
  console.log(jsonobject);
  postFormCheck(jsonobject);
}


async function postFormCheck(obj) {
  console.log(obj);
  let url = "http://localhost:8081/web/update";
  let fetchOptions = {
    
    method: "POST",
    
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: obj
  };

  const  res = await fetch(url, fetchOptions);
  console.log(res);
  const body = await res.json();
  console.log(body.message);  

  // location.replace("newpage.html"); 
   
  if (!res.ok) {
    console.log("In error block");
    let error = await res.text();
    throw new Error(error);
  }
}