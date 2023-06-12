
const sampleForm = document.getElementById("simpledetails");
sampleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let form = e.currentTarget;

  var elements = document.getElementById("simpledetails").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        console.log(item.value);
        obj[item.name] = item.value;
    }

  let url ="http://localhost:8081/web/check";
  let urlSubmit = "http://localhost:8081/web/save";
  console.log(url); 
  // const jsonobject = JSON.stringify({first_name:"Rakesh Rahul"});
  // console.log(jsonobject);
  try {
    
    await getResponseCheck(url);
    await postFormCheck(urlSubmit, obj);
    
    console.log("this form is working****");
  } catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
  }
});

async function getResponseCheck(url) {
  
  let fetchOptions = {
    
    method: "GET",
    
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }
  };

  const  res = await fetch(url, fetchOptions); 
  console.log("***");
  console.log(res);
  const body = await res.json();
  console.log(body.message);

  if (!res.ok) {
    console.log("In error block");
    let error = await res.text();
    throw new Error(error);
  }
}

async function postFormCheck(url, obj) {
  console.log(obj);
  let fetchOptions = {
    
    method: "POST",
    
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: JSON.stringify(obj)
  };

  const  res = await fetch(url, fetchOptions);
  console.log(res);
  const body = await res.json();
  console.log(body.message);  

   location.replace("newpage.html"); 
   
  if (!res.ok) {
    console.log("In error block");
    let error = await res.text();
    throw new Error(error);
  }
}

