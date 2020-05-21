"use strict";

function build_st_column(imgURL, id, eventsSize) {
    return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
        $('<img class="img-profile rounded" alt="Missing" src="' + imgURL + '">'),
        $('<div class="row mt-3">').append(
            $('<div class="col text-left ml-0 ml-md-5">').append(
                id !== 1 ? $(`<a href="/pages/event.html?id=${id-1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-left"></i></a>`) : null
            ),
            $('<div class="col text-right mr-0 mr-md-5">').append(
                id !== eventsSize ? $(`<a href="/pages/event.html?id=${id+1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-right"></i></a>`) : null
            )
        )
    )    
}

function build_nd_column(name, description, dateTime, place, contactName, contactId, presentedServiceName, presentedServiceId) {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2>').text(name),
        presentedServiceName ? $(`<h5>Presenting: <a href="/pages/service.html?id=${presentedServiceId}">${presentedServiceName}</a></h5>`) : $('<br>'),
        $('<p>').text(description),
        $('<h5>').text("Date: " + getDateTimeFormatter().format(new Date(dateTime))),
        $('<h5>').text("Place: " + place),
        $(`<h5>Contact: <a href="/pages/person.html?id=${contactId}">${contactName}</a></h5>`)
    )
}

$(document).ready(function() {
    load_navbar(() => {
        $('#orientation-info').append(
            $('<span>').text('> '),
            $('<a href="/pages/events.html">').text('Events')
        );
    });
    load_footer();

    let searchParams = new URLSearchParams(window.location.search);
    let id, picture, name, description, dateTime, place, contactId, contactName, presentedServiceId, presentedServiceName;
    let eventsSize = 4; //TODO obtain eventsSize from DB

    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    } else {
        id = 1;
    }

    console.log(id)

    fetch('/api/v1/events/' + String(id))
        .then( response => {
            return response.json();
        })
        .then( json => {
            picture = json.picture;
            name = json.name;
            description = json.description;
            dateTime = json.datetime;
            place = json.place;
            contactId = json.contact;
            return contactId;
        })
        .then( contactId => {
            return fetch('/api/v1/people/' + String(contactId));
        })
        .then( response => {
            return response.json();
        })
        .then( json => {
            contactName = json.firstName + " " + json.lastName;
        })
        .then( () => {
            return fetch('/api/v1/events/' + String(id) + "/service"); //TODO 404 error in Chrome
        })
        .then( response => {
            if(response.status === 404) 
                throw ("No service presented")
            else
                return response.json();
        })
        .then( json => {
            presentedServiceId = json.id;
            presentedServiceName = json.name;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally( () =>{
            $('#event-row').append(
                build_st_column(picture, id, eventsSize),
                build_nd_column(name, description, dateTime, place, contactName, contactId, presentedServiceName, presentedServiceId),
            );
            $('title').text(`QualityTimeBank | ${name}`)
        })
})