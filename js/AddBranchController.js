'use strict'

function submitInfo()
{
    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/branch";
    var str = "branch_name=" + document.getElementById("formInput").value + 
              "&branch_address=" + document.getElementById("formInput2").value +
              "&branch_phone=" + document.getElementById("formInput3").value +
              "&branch_employee_number=" + document.getElementById("formInput4").value;              

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
}