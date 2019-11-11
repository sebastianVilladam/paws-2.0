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
                    "<form action='DELETE'>" +
                        "<input type='hidden' id='id' value='" + response[key].animal_id + "'/>" +
                        "<button class='btn btn-danger' type='submit' value='' onclick='deleteAnimal()'>Eliminate</button>" +
                    "</form>";              
                }
            }         
        }
    }
}

function deleteAnimal()
{
    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal";
    var str = "animal_id=" + document.getElementById("id").value;

    var ret = putSubmit(url, str) ;

    if (ret.match(/^XHR error/)) 
    {
        console.log(ret);
        return;
    }
    else
        console.log(ret);
}

function putSubmit(url, str)
{
    var req;

    if (window.XMLHttpRequest) 
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) 
        req = new ActiveXObject("Microsoft.XMLHTTP");
        
    if (req != undefined) 
    {
        req.overrideMimeType("application/json"); 
        try 
        {            
            req.open("DELETE", url, false); 
            
            req.send(str);             
        }
        catch(err) 
        {
            alert("couldnt complete request. Is JS enabled for that domain?\\n\\n" + err.message);
            return false;
        }

        if (req.readyState == 4) 
        {             
            if (req.status == 200)                  
                alert(req.responseText);
            else                
                alert("XHR error: " + req.status +" "+req.statusText);
        }
    }

    alert("req for getAsync is undefined");
}