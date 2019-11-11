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
        //data-toggle='modal' data-target='#statusModal'
        var newText = "<tr>" +  
                        "<th scope='row'>" + key + "</th>" +
                        "<td>" + response[key].animal_name + "</td>" +
                        "<td>" + strStatus + "</td>" +
                        "<td>" + response[key].animal_id + "</td>" +  
                        "<td>" + 
                            "<form action='animalStatus.html'>" +
                                "<input type='hidden' name='id' value='" + response[key].animal_id + "'/>" +
                                "<input class='btn btn-warning' type='submit' value='Change status'/>" +
                            "</form>" + 
                        "</td>" +
                        "<td>" + 
                            "<form action='modAnimal.html'>" +
                                "<input type='hidden' name='id' value='" + response[key].animal_id + "'/>" +
                                "<input class='btn btn-primary' type='submit' value='Modify data'/>" +
                            "</form>" + 
                        "</td>" +                        
                        "<td>" + 
                            "<form action='delAnimal.html'>" +
                                "<input type='hidden' name='id' value='" + response[key].animal_id + "'/>" +
                                "<input class='btn btn-danger' type='submit' value='Eliminate'/>" +
                            "</form>" + 
                        "</td>" +
                    "</tr>";

        document.getElementById("animals-table").innerHTML += newText;  
    }
}