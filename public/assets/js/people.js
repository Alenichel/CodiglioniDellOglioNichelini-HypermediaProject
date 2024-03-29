"use strict";

function img_dimension(){
    let height = $('.magic-column').height();
    let width = $('.magic-column').width();
    $(".img-profile").css('height', Math.min(height, width));
    $(".img-profile").css('width', Math.min(height, width));
}

function append_person(img, name, surname, id){
    return $('<div class="col-md-4 col-lg-2 col-6 text-center magic-column mt-3">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + img + '">'),
        $(`<a class="stretched-link blue-link" href="/pages/person.html?id=${id}"></a>`).append(
            $('<p class="page-content no-margin-title">').text(name),
            $('<p class="page-content no-margin-title">').text(surname),
        )
    );
}

$(document).ready(function() {
    load_navbar();
    load_footer();
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