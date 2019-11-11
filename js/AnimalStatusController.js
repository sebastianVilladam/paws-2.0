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
                    document.getElementById("formInput").value = response[key].animal_id;
                    document.getElementById("name").innerHTML = response[key].animal_name;                    
                }
            }         
        }
    }
}

function changeStatus()
{
    console.log("preparing....");
    var animal_id = document.getElementById("formInput").value;
    var animal_status_id = document.getElementById("formInput1").value;

    const data = {animal_id, animal_status_id};
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
