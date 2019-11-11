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
                    document.getElementById("name").innerHTML = response[key].animal_name;
                    document.getElementById("id").innerHTML = response[key].animal_id;
                    document.getElementById("kind").innerHTML = response[key].animal_kind;
                    document.getElementById("entry").innerHTML = response[key].animal_entry_date;
                    document.getElementById("age").innerHTML = response[key].animal_age;
                    document.getElementById("created").innerHTML = response[key].animal_created_on;
                    document.getElementById("branch").innerHTML = response[key].branch_id;
                    document.getElementById("delete-form").innerHTML = 
                    "<div>" +
                        "<input type='hidden' id='formInput' value='" + response[key].animal_id + "' name='animal_id'/>" +
                        "<button class='btn btn-danger' type='submit' value='' onclick='deleteAnimal()'>Eliminate</button>" +
                    "</div>";              
                }
            }         
        }
    }
}

function deleteAnimal()
{
    console.log("preparing....");
    var animal_id = document.getElementById("formInput").value;
    
    const data = {animal_id};
    const options = {
        method: 'DELETE',
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