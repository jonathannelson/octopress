function alertMessage(message, type) {
 $bar = $('#alertbar');
 if ($bar.length) {
   $bar.animate({
     top: '-45px'
   }, 150, 'easeOutQuad', function() {
     $bar.removeAttr('class').addClass(type).find('.message').html(message);
     $bar.animate({
       top: 0
     }, 500, 'easeOutBounce');
   });
 }
 else {
   $('body').prepend('<div id="alertbar" class="' + type + '"><span class="message">' + message + '</span><span class="close">&times;</span></div>');
   $('#alertbar').show().animate({
     top: 0
   }, 500, 'easeOutBounce');
 }
}

function subscribeSuccess(data) {
  $('.button-newsletter').addClass('btn-green').val($('.email-newsletter').data('done'));
  alertMessage('To complete the subscription process, please click the link in the email we just sent you.', 'success');
}

function subscribeError(error) {
  $('.button-newsletter').val('Subscribe');
  alertMessage('Invalid email address or repeat subscription.', 'error');
}

$(function(){
  nameholder  = $('.name-newsletter').val()
  emailholder = $('.email-newsletter').val()
  
  $('.button-newsletter').click(function(e) {
    e.preventDefault();

    email       = $('input.email-newsletter').val()
    name        = $('input.name-newsletter').val()

    if(name.replace(/^\s+|\s+$/g, "") == '' || name == nameholder) {
      alertMessage('Please provide your name.', 'error');
      return;
    }
    
    if(email.replace(/^\s+|\s+$/g, "") == '' || email == emailholder) {
      alertMessage('Please provide your email.', 'error');
      return;
    }

    $('.button-newsletter').val('Submitting...');
    $.ajax({
      // update url below for mailchimp
      url:  '/subscribe',
      type: 'post',
      data: 'email=' + escape(email) + '&name=' + escape(name),
      success: subscribeSuccess,
      error: subscribeError
    });
  });

  $('body').on('click', '#alertbar .close', function() {
   $(this).closest('#alertbar').animate({
     top: '-45px'
   }, 500, 'easeOutExpo', function() {
     $(this).remove();
   });
  });
  
});