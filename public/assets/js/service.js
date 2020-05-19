"use strict";

function build_st_column(imgURL, id, servicesSize) {
    return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
        $('<img class="img-profile rounded" alt="Missing" src="' + imgURL + '">'),
        $('<div class="row mt-3">').append(
            $('<div class="col text-left ml-0 ml-md-5">').append(
                id !== 1 ? $(`<a href="/pages/service.html?id=${id-1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-left"></i></a>`) : null
            ),
            $('<div class="col text-right mr-0 mr-md-5">').append(
                id !== servicesSize ? $(`<a href="/pages/service.html?id=${id+1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-right"></i></a>`) : null
            )
        )
    )
}

function build_nd_column(name, description, infos, presentedInEventId, eventName) {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2>').text(name),
        eventName ? $(`<h5>Presented in: <a href="/pages/event.html?id=${presentedInEventId}">${eventName}</a></h5>`) : $('<br>'),
        $('<p>').text(description),
        $('<br>'),
        $('<p>').text(infos)
    )
}

function build_nd_row_header(servicePeople) {
    return $('<div>').append(
        $('<h5>').text("Offered by:"),
    )
}

function append_person(firstName, lastName, picture, serviceDetail, id){
    return $('<div class=" col-12 col-sm-6 col-md-4 col-lg-2 text-center magic-column">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + picture + '">'),
        $('<h4>').text(firstName),
        $('<h5>').text(lastName),
        $('<p>').text(serviceDetail),
        $(`<a class="stretched-link" href="/pages/person.html?id=${id}"></a>`)
    );
}

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let id, servicesSize, name, infos, description, picture, presentedInEventId, eventName;
    var servicePeople = [];

    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    } else {
        id = 1;
    }

    Promise.all([ 
        fetch('/api/v1/services'), 
        fetch('/api/v1/services/' + String(id)),
        fetch('/api/v1/services/' + String(id) + "/people")
    ])
        .then( responses => Promise.all(responses.map(response => response.json())))
        .then( data => {
            servicesSize = data[0].length;
            name = data[1].name;
            infos = data[1].infos;
            description = data[1].description;
            picture = data[1].pictures[0];
            presentedInEventId = data[1].presentedInEvent;
            servicePeople = data[2];
            return presentedInEventId;
        })
        .then( presentedInEventId => {
            if(!presentedInEventId) 
                throw "Not presented in any event";
            else
                return fetch('/api/v1/events/' + String(presentedInEventId));
        })
        .then( (response) => {
            return response.json();
        })
        .then( json => {
            eventName = json.name;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally( () =>{
            $('#service-info-row').append(
                build_st_column(picture, id, servicesSize),
                build_nd_column(name, description, infos, presentedInEventId, eventName)
            );
            $('#service-offeredBy-header-row').append(
                build_nd_row_header(),
            );
            for (let s of servicePeople){
                let personId = s.id;
                let serviceDetail = s.serviceDetail;
                fetch('/api/v1/people/' + String(personId)).then(response => {
                    response.json().then( json => {
                        $('#service-offeredBy-row').append(append_person(json.firstName, json.lastName, json.picture, serviceDetail, personId));
                    })
                }) 
            }
        })
})