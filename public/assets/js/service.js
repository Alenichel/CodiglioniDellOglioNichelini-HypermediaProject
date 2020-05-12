"use strict";

function build_st_column(imgURL, id) {
    if(id !== 1 ) { //if intermediate event: back and forward button
        return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
            $('<img class="img-profile rounded" alt="Missing" src="' + imgURL + '">'),
            $('<div class="row mt-3">').append(
                $('<div class="col text-left ml-0 ml-md-5">').append(
                    $(`<a href="/pages/service.html?id=${id-1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-left"></i></a>`)
                ),
                $('<div class="col text-right mr-0 mr-md-5">').append(
                    $(`<a href="/pages/service.html?id=${id+1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-right"></i></a>`)
                )
            )
        )
    }
    else if (id === 1) { //if initial event: only forward button
        return $('<div class="col-sm-12 col-md-6 col-12  text-center">').append(
            $('<img class="img-profile rounded" alt="Missing" src="' + imgURL + '">'),
            $('<div class="row mt-3">').append(
                $('<div class="col text-right mr-0 mr-md-5">').append(
                    $(`<a href="/pages/service.html?id=${id+1}" type="button" class="btn btn-primary btn-sm "><i class="fas fa-chevron-right"></i></a>`)
                )
            )
        )
    }
    //TODO else if id=lastEvent
}

function build_nd_column(name, description, infos) {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2>').text(name),
        $('<h5>(HARDCODED)Presented in: <a href="#"> Studying Together</a></h5>'),
        $('<p>').text(description),
        $('<br>'),
        $('<p>').text(infos)
    )
}

function build_nd_row() {
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h5>').text("Offered by:"),
    )
}

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    } else {
        id = 1;
    }

    console.log(id)

    fetch('/api/v1/services/' + String(id)).then(response => {
        response.json().then( json => {
            let picture = json.picture;
            let name = json.name;
            let description = json.description;
            let infos = json.infos;
            $('#service-info-row').append(
                build_st_column(picture, id),
                build_nd_column(name, description, infos)
            );
            $('#service-offeredBy-row').append(
                build_nd_row()
            );
        })
    })
    
    /*
    fetch('/api/v1/services/' + String(id)).then(response => {
        response.json().then( json => {
            for (let s of json){
                let picture = s.picture;
                let name = s.name;
                let description = s.description;
                let infos = s.infos;
                $('#service-info-row').append(
                    build_st_column(picture, id),
                    build_nd_column(name, description, infos)
                );
                $('#service-offeredBy-row').append(
                    build_nd_row()
                );
            }
        })
    })
    */
})