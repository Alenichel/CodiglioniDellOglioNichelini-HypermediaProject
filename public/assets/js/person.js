"use strict";

function build_st_column(imgURL, id, peopleSize, email, phone_number, facebook, instagram, twitter) {
    return $('<div class="col-sm-12 col-md-6 col-12 text-center">').append(
        $('<img class="img-profile rounded-circle" alt="Missing" src="' + imgURL + '">'),
        $('<div class="row mt-3 justify-content-center">').append(
            $('<div class="col-4 text-left">').append(
                id !== 1 ? $(`<a href="/pages/person.html?id=${id - 1}" aria-label="Prev" title="Next"><i class="fas fa-chevron-circle-left fa-2x blue-foreground"></i></a>`) : null
            ),
            $('<div class="col-4 text-right">').append(
                id !== peopleSize ? $(`<a href="/pages/person.html?id=${id + 1}" aria-label="Next" title="Next"><i class="fas fa-chevron-circle-right fa-2x blue-foreground"></i></a>`) : null
            )
        ),
        $('<div class="mt-3">').append(
            instagram ? $(`<a href="${instagram}" target="_blank" class="btn-social btn-instagram mx-3" aria-label="Instagram" title="Instagram"><i class="fab fa-instagram"></i></a>`) : null,
            facebook ? $(`<a href="${facebook}" target="_blank" class="btn-social btn-facebook mx-3" aria-label="Facebook" title="Facebook"><i class="fab fa-facebook-f"></i></a>`) : null,
            twitter ? $(`<a href="${twitter}" target="_blank" class="btn-social btn-twitter mx-3" aria-label="Twitter" title="Twitter"><i class="fab fa-twitter"></i></a>`) : null,
            email ? $(`<a href="mailto:${email}" target="_blank" class="btn-social btn-email mx-3" aria-label="Email" title="Email"><i class="far fa-envelope"></i></a>`) : null,
            phone_number ? $(`<a href="tel:${phone_number}" target="_blank" class="btn-social btn-vimeo mx-3" aria-label="Phone" title="Phone"><i class="fas fa-phone"></i></a>`) : null,
        )
    )
}

function build_services(services) {
    var services_row = $('<div class="row">')
    for (let s of services){
        services_row.append(
            $('<div class="col-sm-12 col-md-4 col-12 col text-center">').append(
                $('<div class="service">').append(
                    $(`<a class="stretched-link blue-link" href="/pages/service.html?id=${s.id}"></a>`).append(
                        $('<a class="" aria-label="Service" title="Service">').append(
                            $('<span class="fa-stack fa-lg">').append(
                                $('<i class="fas fa-circle fa-stack-2x blue-foreground">'),
                                $(`<i class="${s.icon} fa-stack-1x fa-inverse">`),
                            ),
                        ),
                        $(`<p class="page-content no-margin-title">${s.name}</p>`),
                    ),
                    $(`<p class="page-subcontent">${s.serviceDetail}</p>`)
                )
            )
        )
    }
    return services_row
}

function build_nd_column(first_name, last_name, description, event_id, event_name, services) {
    let event = $('<span>').append(
        $(`<span><p class="page-subtitle" style="display: inline">Contact for: </p><p class="page-subtitle-thin" style="display: inline"><a class="blue-link" href="/pages/event.html?id=${event_id}">${event_name}</a>&nbsp;&nbsp;<i class="far fa-calendar-alt mr-2"></p></span>`),
    )
    return $('<div class="col-sm-12 col-md-6 col-12">').append(
        $('<h2 class="page-title mt-md-0 mt-4">').text(first_name + " " + last_name),
        event_id ? event : $('<br>'),
        $('<p class="text-justify page-content" style="margin-top: 12px">').text(description),
        $('<p class="page-subtitle">').text("Offered services"),
        build_services(services)
    )
}

$(document).ready(function() {
    load_navbar(() => {
        let orientationInfo = $('#orientation-info');
        orientationInfo.append(
            $('<i class="fas fa-chevron-left mr-1">'),
            $('<a href="/pages/people.html" class="text-white">').text('People')
        );
        orientationInfo.addClass('pb-2');
    });
    load_footer();
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    let peopleSize;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    } else {
        id = 1;
    }

    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            peopleSize = json.length;
            fetch(`/api/v1/people/${id}/event`).then(response => {
                response.json().then( json => {
                    let event_id = json.id
                    let event_name = json.name

                    fetch(`/api/v1/people/${id}/services`).then(response => {
                        response.json().then( json => {
                            var services = []
                            try {
                                for (let s of json) {
                                    services.push(s)
                                }
                            } catch (e) {
                                services = []
                            }
                            fetch('/api/v1/people/' + String(id)).then(response => {
                                response.json().then( json => {
                                    let fn = json.firstName
                                    let ln = json.lastName
                                    let description = json.description
                                    let picture = json.picture
                                    let email = json.email
                                    let phone_number = json.phoneNumber
                                    let facebook = json.facebook
                                    let instagram = json.instagram
                                    let twitter = json.twitter
                                    $('title').text(`QualityTimeBank | ${fn} ${ln}`)
                                    $('#person-row').append(
                                        build_st_column(picture, id, peopleSize, email, phone_number, facebook, instagram, twitter),
                                        build_nd_column(fn, ln, description, event_id, event_name, services)
                                    );
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})