"use strict";

//Form validation
window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === true) {
                event.preventDefault();
            }
            else if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();   
            }
            form.classList.add('was-validated');
        }, false);
    });
});

//Tab links
/*
$(document).ready(() => {
    let url = location.href.replace(/\/$/, "");
   
    if (location.hash) {
      const hash = url.split("#");
      $('#myTab a[href="#'+hash[1]+'"]').tab("show");
      url = location.href.replace(/\/#/, "#");
      history.replaceState(null, null, url);
      setTimeout(() => {
        $(window).scrollTop(0);
      }, 400);
    } 
     
    $('a[data-toggle="tab"]').on("click", function() {
      let newUrl;
      const hash = $(this).attr("href");
      if(hash == "#about") {
        newUrl = url.split("#")[0];
      } else {
        newUrl = url.split("#")[0] + hash;
      }
      newUrl += "/";
      history.replaceState(null, null, newUrl);
    });
});
*/

//popups on submissions
//$('#submittedPopup').modal('show');