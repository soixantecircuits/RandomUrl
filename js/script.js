var sxs = {
  isSubmitable: true
};

/*check if the email is correct*/
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}


$(function() {

  if (!Modernizr.input.placeholder) {
    $(function() {
      H5F.setup($("#new_message"));
    });
  }

  $(".contact").click(function(e) {
    e.preventDefault();
    $("#formulaire").slideToggle();
  });

  $('#new_message').submit(function() {

    $("#send_message").fadeOut('fast').val("En cours...").fadeIn('fast');
    

    if (sxs.isSubmitable) {
      isSubmitable = false;

      $('#submit_button').focus();
      var form = $(this).serializeArray();
      var valide = true;
      var validate = {
        message: $('#message').attr('title'),
        name: $('#name').attr('title'),
        email: $('#email').attr('title')
      };

      if (form[0].value == validate.name) {
        valide = false;
        msg = "Le nom n'est pas saisi";
      } else if (form[2].value == validate.message) {
        valide = false;
        msg = "Le message est vide";
      } else if (form[1].value == validate.email) {
        valide = false;
        msg = "L'email est vide";
      } else if (!isValidEmailAddress(form[1].value)) {
        valide = false;
        msg = "L'email est incorrect";
      }


      if (valide) {

        $('#email').val($('#email').val().toLowerCase());
        form = $(this).serializeArray();
        var d = new Date();
        $.ajax({
          type: "POST",
          url: "mail/register.php?_=" + d.getTime(),
          data: form,
          success: function(msg) {
            
            $("#send_message").fadeOut('fast').val("Envoyé").fadeIn('fast');
            $("#send_message").attr('disabled',true)
            $("#send_message").delay("1000")
                              .fadeOut('fast')
                              .val("Merci !")
                              .fadeIn('slow')
                              .delay("1000");
            $("#formulaire").delay("1000").slideToggle();

          },
          error: function(xhr, ajaxOptions, thrownError) {
            
            
            $("#send_message").fadeOut('fast').val("Une erreur s'est produite").fadeIn('fast');

          }
        });

      } else {
        
        $("#inText").html(msg);
        $("#feedback").fadeIn("slow").delay(2000).fadeOut(400);

        sxs.isSubmitable = true;
      }
    }
    return false;
  });
});