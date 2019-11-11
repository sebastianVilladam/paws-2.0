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
    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/branch";
    var str = "animal_id='" + document.getElementById("formInput").value + "'" + 
              "&animal_name='" + document.getElementById("formInput1").value + "'" + 
              "&animal_kind='" + document.getElementById("formInput2").value + "'" +
              "&animal_entry_date='" + document.getElementById("formInput3").value + "'" +
              "&branch_id=" + document.getElementById("formInput4").value;              

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