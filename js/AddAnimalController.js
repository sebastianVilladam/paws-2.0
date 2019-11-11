'use strict'

function submitInfo()
{
    console.log("preparing....");
    var animal_name = document.getElementById("formInput").value;
    var animal_kind = document.getElementById("formInput2").value;
    var animal_entry_date = document.getElementById("formInput3").value;
    var animal_created_on = document.getElementById("formInput4").value;
    var branch_id = document.getElementById("formInput5").value;
    var animal_status_id = document.getElementById("formInput6").value;
    var animal_age = document.getElementById("formInput7").value;

    const data = {animal_name, animal_kind, animal_entry_date, animal_created_on, branch_id, animal_status_id, animal_age};
    const options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)        
    }

    fetch('https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal', options).then(resp =>{
        alert(resp);
        console.log(resp);
    });
}