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
    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal";
    var str = "animal_id=" + document.getElementById("formInput").value + 
              "&animal_name=" + document.getElementById("formInput1").value + 
              "&animal_kind=" + document.getElementById("formInput2").value +
              "&animal_entry_date=" + document.getElementById("formInput3").value +
              "&branch_id=" + document.getElementById("formInput4").value +
              "&animal_age=" + document.getElementById("formInput5").value;

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
            req.open("PUT", url, false); 
            alert("preparing request");                
            req.send(str); 
            alert("sende....");
        }
        catch(err) 
        {
            alert("couldnt complete request. Is JS enabled for that domain?\\n\\n" + err.message);
            return false;
        }

        if (req.readyState == 4) 
        {             
            if (req.status == 200)  
                //return req.responseText ; 
                alert("good");
            else
                //return "XHR error: " + req.status +" "+req.statusText; 
                alert("bad");
        }
    }

    alert("req for getAsync is undefined");
}