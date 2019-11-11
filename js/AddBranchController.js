'use strict'

function submitInfo()
{
    console.log("preparing....");
    var branch_name = document.getElementById("formInput").value;
    var branch_address = document.getElementById("formInput2").value;
    var branch_phone = document.getElementById("formInput3").value;
    var branch_employee_number = document.getElementById("formInput4").value;

    const data = {branch_name, branch_address, branch_phone, branch_employee_number};
    const options = {
        method: 'POST',
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