"use strict";

function img_dimension(){
    let height = $('.magic-column').height();
    let width = $('.magic-column').width();
    $(".img-profile").css('height', Math.min(height, width));
    $(".img-profile").css('width', Math.min(height, width));
}

function append_person(img, name, surname, id){
    return $('<div class="col-sm-6 col-md-4 col-lg-2 col-12 text-center magic-column">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + img + '">'),
        $('<h4>').text(name),
        $('<h5>').text(surname),
        $(`<a class="stretched-link" href="/pages/person.html?id=${id}"></a>`)
    );
}

$(document).ready(function() {
    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            for (let s of json){
                let fs = s.firstName
                let ln = s.lastName
                let img = s.picture
                let id = s.id
                $('#people-row').append(append_person(img, fs, ln, id));
                img_dimension();
            }
        })
    })
})

$(window).on("resize", img_dimension)