
(function ($) {
  "use strict";

  let nameField = $('.validate-input input[name="name"]');
  let emailField = $('.validate-input input[name="email"]');
  let messageField = $('.validate-input textarea[name="message"]');

  $('.validate-form').submit(event => {
    event.preventDefault();

    if (!runValidation()) return;
    let name = nameField.val().trim();
    let email = emailField.val().trim();
    let message = messageField.val().trim();

    $.post('https://hf8r5n5mz8.execute-api.us-east-1.amazonaws.com/default/ContactFormFunction', { name, email, message }).done(_ => {
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

    if ($(nameField).val().trim() === '') {
      showValidate(nameField);
      check = false;
    }

    if ($(emailField).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) === null) {
      showValidate(emailField);
      check = false;
    }

    if ($(messageField).val().trim() === '') {
      showValidate(messageField);
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