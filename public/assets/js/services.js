"use strict";

function append_service_card(card) {
    $('#service-cards').append(card);
}

$(document).ready(function() {
    append_service_card(generate_card('English lessons', 'The goal of this project is to offer informal, functional English teaching to marginalized citizens ...', '/assets/img/talking-together.jpg'));
    append_service_card(generate_card('Private tutoring', 'QualityTimeBank groups volunteers who have been offering tutoring to young people for multiple ...', '/assets/img/tutoring.jpg'));
})