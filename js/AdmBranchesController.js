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
    var strStatus = "";
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

        document.getElementById("animals-table").innerHTML += newText;  
    }
}
