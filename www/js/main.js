
(function ($) {
  "use strict";

  let name = $('.validate-input input[name="name"]');
  let email = $('.validate-input input[name="email"]');
  let message = $('.validate-input textarea[name="message"]');

  $('.validate-form').submit(event => {
    event.preventDefault();

    if (!runValidation()) return;
    let nameText = name.val();
    let emailText = email.val();
    let messageText = message.val();

    $.post('https://hf8r5n5mz8.execute-api.us-east-1.amazonaws.com/ContactFormStage', { nameText, emailText, messageText }).done(_ => {
      showMessage("Thanks for contacting us. We'll be in touch shortly.", 'success');
    }).fail(_ => {
      showMessage('Something went wrong when submiting the message', 'danger');
      $('.contact3-form-btn').prop('disabled', false);
    })
  })


  $('.validate-form .input3').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function runValidation() {
    let check = true;

    if ($(name).val().trim() === '') {
      showValidate(name);
      check = false;
    }

    if ($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) === null) {
      showValidate(email);
      check = false;
    }

    if ($(message).val().trim() === '') {
      showValidate(message);
      check = false;
    }

    return check;
  };

  function showValidate(input) {
    let thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    let thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }

  function showMessage(msg, type) {
    $('#alert').attr('class', `alert alert-${type}`).text(msg);
  }

})(jQuery);