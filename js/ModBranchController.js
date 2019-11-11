'use strict'

/**
 * gets data send from url
 */
function processData()
{
    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);
    console.log(id);
    setBranchData(id);
}

/*
*set the data from request on every info field
*/
function setBranchData(branchId)
{    
    const Http = new XMLHttpRequest();
    const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/branch';

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => 
    {
        if (Http.readyState == 4 && Http.status == 200) 
        {
            var response = JSON.parse(Http.responseText);
            for (var key in response) 
            {
                //checks if the ID corresponds the selected branch
                if(response[key].branch_id == branchId)
                {                    
                    document.getElementById("branch-name").innerHTML = response[key].branch_name;
                    document.getElementById("formInput").value = response[key].branch_id;
                    document.getElementById("formInput1").value = response[key].branch_name;
                    document.getElementById("formInput2").value = response[key].branch_address;
                    document.getElementById("formInput3").value = response[key].branch_phone;
                    document.getElementById("formInput4").value = response[key].branch_employee_number;                    
                }
            }         
        }
    }
}

function submitInfo()
{
    console.log("preparing....");
    var branch_id = document.getElementById("formInput").value;
    var branch_name = document.getElementById("formInput1").value;
    var branch_address = document.getElementById("formInput2").value;
    var branch_phone = document.getElementById("formInput3").value;
    var branch_employee_number = document.getElementById("formInput4").value;

    const data = { branch_id, branch_name, branch_address, branch_phone, branch_employee_number};
    const options = {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)        
    }

    fetch('https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/branch', options).then(resp =>{
        alert(resp);
        console.log(resp);
    });
}