'use strict'

var response;
var branches = [];
var filter = false;
var filteredBranch = 0;
const Http = new XMLHttpRequest();
const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animal';

Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => 
{
    if (Http.readyState == 4 && Http.status == 200) 
    {
        response = JSON.parse(Http.responseText);
        
        fixDates();
        orderByDate();
        getBranches();
        setBranches();
        printCards();
    }
}

function fixDates()
{
    for (var key in response) 
    {
        var date = response[key].animal_entry_date;
        var orderedDate = date.slice(0, 10);
        response[key].animal_entry_date = orderedDate;
    }
}

function getBranches()
{
    for (var key in response) 
    {
        var branchId = response[key].branch_id;
        if(chekBranch(branchId))
            branches.push(branchId);    
    }
}

function chekBranch(branchId)
{
    for (var key in branches) 
    {
        if(branchId == branches[key])
        {
            return false;
        }
    }
   
    return true;
}

function setBranches()
{
    var newText = "<option value='0'>No filter</option>";

    for (var key in branches) 
    {
        newText += "<option value='" + branches[key] + "'>Branch # " + branches[key] + "</option>"; 
    }

    document.getElementById("branch-filter").innerHTML = newText;
}

function orderByDate()
{
    response.sort(function(a, b)
    {
        var keyA = dateToNumber(a.animal_entry_date);
        var keyB = dateToNumber(b.animal_entry_date);
        
        if(keyA < keyB) 
            return -1;
        if(keyA > keyB) 
            return 1;
        return 0;
    });
}

function dateToNumber(date)
{
    date = date.replace("-", "");
    date = date.replace("-", "");
    return date;
}

function orderByName()
{
    response.sort(function(a, b)
    {
        var keyA = a.animal_name;
        var keyB = b.animal_name;
        
        if(keyA < keyB) 
            return -1;
        if(keyA > keyB) 
            return 1;
        return 0;
    });
}

function orderByType()
{
    response.sort(function(a, b)
    {
        var keyA = a.animal_kind;
        var keyB = b.animal_kind;
        
        if(keyA < keyB) 
            return -1;
        if(keyA > keyB) 
            return 1;
        return 0;
    });
}

function printCards()
{
    for (var key in response) 
    {
        if(response[key].animal_status_id != 1)
            continue;
        if(filter)
            if(response[key].branch_id != filteredBranch)
                continue;
        //Bootstrap card structure for the animal info
        var newText = "<div class='col-md-4'>" +  
                        "<div class='card'>"+
                            "<image alt='animal image' src='" + response[key].animal_picture_address + "' class='card-img-top' style: 'width: 100%; height: 100%'></image>" +
                            "<div class='card-body>" +
                                "<h5 class='card-title'>" + response[key].animal_name + "</h5><br>" +                        
                                "<p class='card-text'>Kind: " + response[key].animal_kind + "<br>" +
                                "Entry date: " + response[key].animal_entry_date + "<br>" +
                                "Age: " + response[key].animal_age + "<br>" + 
                                "Branch: " + response[key].branch_id + "</p>" + 
                                "<form>" +
                                    "<input type='hidden' name='id' value='" + response[key].animal_id + "'/>" +
                                    "<input class='btn btn-primary' type='submit' value='find more'id='btn1'/>" +
                                "</form>" +                                    
                            "</div>" +
                        "</div>" +
                    "</div>";

        document.getElementById("animals_list").innerHTML += newText;  
    }
}

function changeSortMethod()
{
    var selectedValue = document.getElementById("sort-option").value;
    
    document.getElementById("animals_list").innerHTML = "";

    if(selectedValue == 1)
        orderByDate();
    if(selectedValue == 2)
        orderByName();
    if(selectedValue == 3)
        orderByType();

    printCards();
}

function setBranchFilter()
{
    var selectedValue = document.getElementById("branch-filter").value;
    console.log(selectedValue);
    document.getElementById("animals_list").innerHTML = "";

    if(selectedValue == 0)
    {
        filter = false;
        filteredBranch = 0;
    }
    else
    {
        filter = true;
        filteredBranch = selectedValue;
    }

    printCards();
}