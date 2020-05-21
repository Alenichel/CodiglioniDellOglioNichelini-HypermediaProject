"use strict";

function build_person_row(name, img, join_date, i){
    let person_row = $('<div class="row">')
    person_row.append(
        $('<div class="col col-md-auto align-self-center">').append(
            $(`<img class="img-profile rounded-circle" alt="Missing img" src="${img}">`)
        ),
        $('<div class="col col-md-auto align-self-center">').append(
            $(`<p>${name}<br>Joined ${join_date}</p>`)
        )
    )
    return person_row;
}

$(document).ready(function() {
    load_navbar(() => {
        $('#orientation-info').text('hello, world');
    });
    load_footer();
    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            let i = 0;
            for (let s of json){
                let fs = s.firstName
                let img = s.picture
                let join_date = s.joinDate;
                if (i===3) {
                    return;
                }
                $('#last_joined').append(
                    build_person_row(fs, img,join_date, i)
                );
                i++;
            }
        })
    })
})