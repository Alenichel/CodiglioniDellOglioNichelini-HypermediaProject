"use strict";

$(document).ready(() => {
  load_navbar();
  load_footer();
  let searchParams = new URLSearchParams(window.location.search);
  let query = "";
  if (searchParams.has('query')) {
    query = searchParams.get('query');
  }
  fetch(`/api/v1/search?query=${encodeURI(query)}`).then(response => {
    return response.json();
  }).then(results => {
    for (let r of results) {
      let card = generateSearchResultCard(r);
      $('#search-cards').append(card);
    }
  });
  $('#search-query').text(`You searched for "${query}"`)
});
