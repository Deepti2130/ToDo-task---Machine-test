const cl = console.log;

const selected = document.getElementById("selected");
const todolist = document.getElementById("todolist");

const todourl = `https://jsonplaceholder.typicode.com/todos`;


let todoArr = [];

const templating = (arr) => {
    let result = " ";

    let completed = " ";

    arr.forEach((ele,i) => {
        (ele.completed == true) ? completed = "Yes" : completed = "No"

        result += `<tr>
                        <td>${i+1}</td>
                        <td>${ele.title}</td>
                        <td>${ele.userId}</td>
                        <td>${completed}</td>
                    </tr>`
        
    });
    todolist.innerHTML = result;
}

const makeApiCall = async (methodName, api_url, msgBody)=>{

    msgBody = msgBody ? JSON.stringify(msgBody) : null;

    let res = await fetch(api_url,{
     method:methodName,
     body:msgBody,
     headers:{
        "token":"Token from LS"
     }
    })
    return res.json()
}

const objArr = (obj) => {
    for (const key in obj) {
        todoArr.push({...obj[key], id:key})
            
        }
        return todoArr
    }

const fetchPosts = async () =>{
    let data = await makeApiCall("GET", todourl);
    // cl(data)
    let arr = objArr(data);
    // cl(arr)
    templating(arr)
}
fetchPosts();




const onchangestatus = (eve) => {
  let todofilter = todoArr
  if(eve.target.value !== "all"){
    todofilter = todoArr.filter(ele=> ele.completed === JSON.parse(eve.target.value)); 
  }
  templating(todofilter);

//    (eve.target.value === "all") ? eve.target.value = "true" : eve.target.value = "false";
//    templating(todoArr);
    // }else if(eve.target.value === "true"){
    //     todofilter = todoArr.filter(ele=> ele.completed === true);
    //     templating(todofilter);
    // }else{
    //     todofilter = todoArr.filter(ele=> ele.completed === false);
    //     templating(todofilter);
    // }
    
}





selected.addEventListener("change", onchangestatus);