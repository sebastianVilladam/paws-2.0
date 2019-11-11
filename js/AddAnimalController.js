'use strict'

function submitInfo()
{
    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal";
    var str = "animal_name=" + document.getElementById("formInput").value + 
              "&animal_kind=" + document.getElementById("formInput2").value +
              "&animal_entry_date=" + document.getElementById("formInput3").value +
              "&animal_created_on=" + document.getElementById("formInput4").value +
              "&branch_id=" + document.getElementById("formInput5").value +
              "&animal_status_id=" + document.getElementById("formInput6").value +
              "&animal_age=" + document.getElementById("formInput7").value;

    var ret = postSubmit(url, str) ;

    if (ret.match(/^XHR error/)) 
    {
        console.log(ret);
        return;
    }
    else
        console.log(ret);
}

function postSubmit(url, str)
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
            req.open("POST", url, false); 
            alert("preparing");                
            req.send(str); 
            alert("sended");
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