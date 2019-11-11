'use strict'

var response;

const Http = new XMLHttpRequest();
const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal';

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
        if(response[key].animal_status_id == 1)
            strStatus = "Up for adoption";
        if(response[key].animal_status_id == 2)
            strStatus = "Euthanized";
        if(response[key].animal_status_id == 3)
            strStatus = "Adopted";

        //Bootstrap table structure
        var newText = "<tr>" +  
                        "<th scope='row'>" + key + "</th>" +
                        "<td>" + response[key].animal_name + "</td>" +
                        "<td>" + strStatus + "</td>" +
                        "<td>" + response[key].animal_id + "</td>" +  
                        "<td><button class='btn btn-warning' data-toggle='modal' data-target='#statusModal'>Modify status</button></td>" +
                        "<td><a href='modAnimal.html' class='btn btn-primary'>Modify data</a></td>" +
                        "<td><button class='btn btn-danger' data-toggle='modal' data-target='#eliminateModal'>Eliminate</button></td>" +
                    "</tr>";

        document.getElementById("animals-table").innerHTML += newText;  
    }
}