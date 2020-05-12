"use strict";

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    }
    fetch(`/api/v1/news/${id}`).then(response => {
        return response.json();
    }).then(json => {
        // TODO: Fill the page
        console.log(json);
    });
})