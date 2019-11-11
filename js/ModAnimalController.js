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
    setAnimalData(id);
}

/*
*set the data from request on every info field
*/
function setAnimalData(animalId)
{    
    const Http = new XMLHttpRequest();
    const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal';

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => 
    {
        if (Http.readyState == 4 && Http.status == 200) 
        {
            var response = JSON.parse(Http.responseText);
            for (var key in response) 
            {
                //checks if the ID corresponds the selected animal
                if(response[key].animal_id == animalId)
                {
                    document.getElementById("animal-name").innerHTML = response[key].animal_name;
                    document.getElementById("formInput").value = response[key].animal_id;
                    document.getElementById("formInput1").value = response[key].animal_name;
                    document.getElementById("formInput2").value = response[key].animal_kind;
                    document.getElementById("formInput3").value = response[key].animal_entry_date;
                    document.getElementById("formInput4").value = response[key].branch_id;
                    document.getElementById("formInput5").value = response[key].animal_age;
                }
            }         
        }
    }
}

function submitInfo()
{
    console.log("preparing....");
    var animal_id = document.getElementById("formInput").value;
    var animal_name = document.getElementById("formInput1").value;
    var animal_kind = document.getElementById("formInput2").value;
    var animal_entry_date = document.getElementById("formInput3").value;    
    var branch_id = document.getElementById("formInput4").value;
    var animal_age = document.getElementById("formInput5").value;

    const data = {animal_id, animal_name, animal_kind, animal_entry_date,branch_id,animal_age};
    const options = {
        method: 'PUT',
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