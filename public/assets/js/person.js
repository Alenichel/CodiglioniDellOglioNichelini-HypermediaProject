"use strict";

function build_st_column(imgURL, id, peopleSize, email, phone_number, facebook, instagram, twitter) {
    return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + imgURL + '">'),
        $('<div class="row mt-3">').append(
            $('<div class="col text-left ml-0 ml-md-5">').append(
                id !== 1 ? $(`<a href="/pages/person.html?id=${id - 1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-left"></i></a>`) : null
            ),
            $('<div class="col text-right mr-0 mr-md-5">').append(
                id !== peopleSize ? $(`<a href="/pages/person.html?id=${id + 1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-right"></i></a>`) : null
            )
        ),
        $('<div class="mt-3">').append(
            instagram ? $(`<a href="${instagram}" target="_blank" class="btn-social btn-instagram"><i class="fab fa-instagram"></i></a>`) : null,
            facebook ? $(`<a href="${facebook}" target="_blank" class="btn-social btn-facebook"><i class="fab fa-facebook-f"></i></a>`) : null,
            twitter ? $(`<a href="${twitter}" target="_blank" class="btn-social btn-twitter"><i class="fab fa-twitter"></i></a>`) : null,
            email ? $(`<a href="mailto:${email}" target="_blank" class="btn-social btn-email"><i class="far fa-envelope"></i></a>`) : null,
            phone_number ? $(`<a href="#" target="_blank" class="btn-social btn-vimeo"><i class="fas fa-phone"></i></a>`) : null,
        )
    )
}

function build_services() {
    return (
        $('<div class="row">').append(
            $('<div class="col-sm-12 col-md-4 col-12 col text-center">').append(
                $('<div class="service">').append(
                    $('<a href="#" target="_blank" class="btn-social btn-instagram" style="background-color: lightgray"><i class="fas fa-chalkboard-teacher"></i></a>'),
                    $('<p>Private tutoring</p>'),
                    $('<p>Math, Computer science, Physics</p>')
                )
            )
        )
    )
}

function build_nd_column(first_name, last_name, description) {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2>').text(first_name + " " + last_name),
        $('<p>(HARDCODED)Contact for: <a href="#"> Christmas Party</a></p>'),
        $('<p>').text(description),
        build_services()
    )
}

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    let peopleSize;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    } else {
        id = 1;
    }

    console.log(id)

    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            peopleSize = json.length;
            fetch('/api/v1/people/' + String(id)).then(response => {
                response.json().then( json => {
                    let fs = json.firstName
                    let ln = json.lastName
                    let description = json.description
                    let picture = json.picture
                    let email = json.email
                    let phone_number = json.phoneNumber
                    let facebook = json.facebook
                    let instagram = json.instagram
                    let twitter = json.twitter
                    console.log(fs)
                    $('#person-row').append(
                        build_st_column(picture, id, peopleSize, email, phone_number, facebook, instagram, twitter),
                        build_nd_column(fs, ln, description)
                    );
                })
            })
        })
    })
})