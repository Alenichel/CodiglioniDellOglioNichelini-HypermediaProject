"use strict";

function build_carousel(pictures) {
    let carousel = $('<div id="service-carousel" class="carousel slide img-profile rounded" data-ride="carousel">');
    let carouselInner = $('<div class="carousel-inner">');
    for (let i = 0; i < pictures.length; i++) {
        let p = pictures[i];
        carouselInner.append(
            $(`<div class="carousel-item${i === 0 ? ' active' : ''}">`).append(
                $(`<img class="d-block w-100" src="${p}" alt="">`)
            )
        );
    }
    carousel.append(carouselInner);
    if (pictures.length > 1) {
        carousel.append(
            $('<a class="carousel-control-prev" href="#service-carousel" role="button" data-slide="prev">').append(
                $('<span class="carousel-control-prev-icon" aria-hidden="true">'),
                $('<span class="sr-only">').text('Previous')
            ),
            $('<a class="carousel-control-next" href="#service-carousel" role="button" data-slide="next">').append(
                $('<span class="carousel-control-next-icon" aria-hidden="true">'),
                $('<span class="sr-only">').text('Next')
            )
        );
    }
    return carousel;
}

function build_st_column(pictures, id, servicesSize) {
    return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
        build_carousel(pictures),
        $('<div class="row mt-3">').append(
            $('<div class="col text-left ml-0">').append(
                id !== 1 ? $(`<a href="/pages/service.html?id=${id - 1}" aria-label="Prev" title="Next"><i class="fas fa-chevron-circle-left fa-2x blue-foreground"></i></a>`) : null
            ),
            $('<div class="col text-right mr-0">').append(
                id !== servicesSize ? $(`<a href="/pages/service.html?id=${id + 1}" aria-label="Next" title="Next"><i class="fas fa-chevron-circle-right fa-2x blue-foreground"></i></a>`) : null
            )
        )
    )
}

function build_nd_column(name, description, infos, presentedInEventId, eventName) {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2 class="page-title mt-md-0 mt-4">').text(name),
        eventName ? $(`<p class="page-subtitle">Presented in: <a class="blue-link" href="/pages/event.html?id=${presentedInEventId}">${eventName}</a></p>`) : $('<br>'),
        $('<p class="page-content text-justify">').text(description),
        $('<p class="page-content text-justify">').text(infos),
    )
}

function build_nd_row_header() {
    return $('<div>').append(
        $('<p class="page-subtitle">').text("Offered by:"),
    )
}

function append_person(firstName, lastName, picture, serviceDetail, id){
    return $('<div class=" col-12 col-sm-6 col-md-4 col-lg-2 text-center magic-column">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + picture + '">'),
        $('<p class="page-content no-margin-title">').text(firstName),
        $('<p class="page-content no-margin-title">').text(lastName),
        $('<p class="page-subcontent">').text(serviceDetail),
        $(`<a class="stretched-link" href="/pages/person.html?id=${id}"></a>`)
    );
}

$(document).ready(function() {
    load_navbar(() => {
        let orientationInfo = $('#orientation-info');
        orientationInfo.append(
            $('<i class="fas fa-chevron-right mr-1">'),
            $('<a href="/pages/services.html" class="text-white">').text('Services')
        );
        orientationInfo.addClass('pb-2');
    });
    load_footer();
    let searchParams = new URLSearchParams(window.location.search);
    let id, servicesSize, name, infos, description, pictures, presentedInEventId, eventName;
    let servicePeople = [];

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
            pictures = data[1].pictures;
            presentedInEventId = data[1].presentedInEvent;
            servicePeople = data[2];
            $('title').text(`QualityTimeBank | ${name}`);
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
                build_st_column(pictures, id, servicesSize),
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