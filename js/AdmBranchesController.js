'use strict'

var response;

const Http = new XMLHttpRequest();
const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/branch';

Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => 
{
    if (Http.readyState == 4 && Http.status == 200) 
    {
        response = JSON.parse(Http.responseText);
        
        printList();
    }
}

function printList()
{
    for (var key in response) 
    {
        //Bootstrap table structure        
        var newText = "<tr>" +  
                        "<th scope='row'>" + key + "</th>" +
                        "<td>" + response[key].branch_name + "</td>" +                        
                        "<td>" + response[key].branch_id + "</td>" +                          
                        "<td>" + 
                            "<form action='modBranch.html'>" +
                                "<input type='hidden' name='id' value='" + response[key].branch_id + "'/>" +
                                "<input class='btn btn-primary' type='submit' value='Modify data'/>" +
                            "</form>" + 
                        "</td>" +                                                                       
                    "</tr>";

        document.getElementById("branches-table").innerHTML += newText;  
    }
}

function orderByName()
{
    response.sort(function(a, b)
    {
        var keyA = a.branch_name;
        var keyB = b.branch_name;
        
        if(keyA < keyB) 
            return -1;
        if(keyA > keyB) 
            return 1;
        return 0;
    });
}

function changeSortMethod()
{   
    document.getElementById("branches-table").innerHTML = "";
    console.log("canging sort");
    orderByName();
    printList();
}
