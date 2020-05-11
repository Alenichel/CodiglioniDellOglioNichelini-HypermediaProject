"use-strict";

function append_person(img, name, surname){
    return $('<div class="col-sm-12 col-md-2 col-12 text-center">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + img + '">'),
        $('<h4>').text(name),
        $('<h5>').text(surname)
    );
}

$(document).ready(function() {
    /*
        call api people. for person in person, do:
     */
    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            for (let s of json){
                let fs = s.firstName
                let ln = s.lastName
                let img = s.picture
                $('#people-fr').append(append_person(img, fs, ln));
            }
        })
    })
})