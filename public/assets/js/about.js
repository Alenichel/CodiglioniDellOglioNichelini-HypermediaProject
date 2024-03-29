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
        $('#submittedPopup').modal('toggle');
      }
      else if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);

document.getElementById("modalCloseButton").onclick = function() { window.location.href = '/pages/about.html' };

$(document).ready(() => {
  load_navbar();
  load_footer();
})
