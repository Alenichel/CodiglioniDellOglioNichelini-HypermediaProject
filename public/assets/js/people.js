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
    let img = "https://media-exp1.licdn.com/dms/image/C5603AQEMhbtxEDwGLg/profile-displayphoto-shrink_200_200/0?e=1593648000&v=beta&t=0JrjJp-vXnjamt_KpbquJAWtpUJWMtRRM1sWT2utuiE"
    let name = "Alessandro"
    let surname = "Nichelini"
    $('#people-fr').append(append_person(img, name, surname));
})