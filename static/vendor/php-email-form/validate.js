/**
* PHP Email Form Validation - v2.3
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
!(function($) {
  "use strict";

  $('#survey-form').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    if ( $(this).data('recaptcha-site-key') ) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha_site_key, {action: 'php_email_form_submit'}).then(function(token) {
          php_email_form_submit(this_form,action,this_form.serialize() + '&recaptcha-response=' + token);
        });
      });
    } else {
      const name = $('#name').val();
      const email = $('#email').val();
      const phone = $('#phone').val();
      const projectType = $('#project-type').val();
      const designType = projectType !== 'landscape' ? $('#design-type').val() : null;
      const colorScheme = $('#color-scheme').val();
      const wood = $('#wood').attr('data-value') == 'true';
      const stone = $('#stone').attr('data-value') == 'true';
      const marbleGranite = $('#marble-granite').attr('data-value') == 'true';
      const metal = $('#metal').attr('data-value') == 'true';
      const glass = $('#glass').attr('data-value') == 'true';
      const pattern = $('#pattern').val();
      const colorMix = $('#color-mix').prop('checked');
      const textureMaterialMix = $('#texture-material-mix').prop('checked');
      const patternMix = $('#pattern-mix').prop('checked');
      const lightingLevel = $('#lighting-level').val();
      const directLight = $('#direct').prop('checked');
      const indirectLight = $('#indirect').prop('checked');
      const chandeliers1 = $('#chandeliers1').attr('data-value') == 'true';
      const chandeliers2 = $('#chandeliers2').attr('data-value') == 'true';
      const chandeliers3 = $('#chandeliers3').attr('data-value') == 'true';
      const chandeliers4 = $('#chandeliers4').attr('data-value') == 'true';

      const spotLight1 = $('#spot-light1').attr('data-value') == 'true';
      const spotLight2 = $('#spot-light2').attr('data-value') == 'true';
      const spotLight3 = $('#spot-light3').attr('data-value') == 'true';
      const spotLight4 = $('#spot-light4').attr('data-value') == 'true';

      const woodenLight1 = $('#wooden-light1').attr('data-value') == 'true';
      const woodenLight2 = $('#wooden-light2').attr('data-value') == 'true';

      const restaurantType = projectType === 'restaurantCafeteria' ? $('#restaurant-type').val() : null;
      console.log(restaurantType);
      console.log(projectType);
      const designClass = projectType === 'landscape' ? $('#design-class').val() : null;
      const light = projectType === 'landscape' ? $('#light').attr('data-value') == 'true' : null;
      const waterFeatures = projectType === 'landscape' ? $('#water-features').attr('data-value') == 'true' : null;
      const seats = projectType === 'landscape' ? $('#seats').attr('data-value') == 'true' : null;
      
      const comments = $('#comments').val();

      const requestData = {
        name,
        email,
        phone,
        projectType,
        designType,
        colorScheme,
        wood,
        stone,
        marbleGranite,
        metal,
        glass,
        pattern,
        colorMix,
        textureMaterialMix,
        patternMix,
        lightingLevel,
        directLight,
        indirectLight,
        chandeliers1,
        chandeliers2,
        chandeliers3,
        chandeliers4,
        spotLight1,
        spotLight2,
        spotLight3,
        spotLight4,
        woodenLight1,
        woodenLight2,
        comments,
        restaurantType,
        designClass,
        light,
        waterFeatures,
        seats,
      };
      console.log(requestData);
      php_email_form_submit(this_form,action, requestData);
    }
    
    return true;
  });

  $('#contact-form').submit(function(e) {
    e.preventDefault();
    
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    if ( $(this).data('recaptcha-site-key') ) {
      var recaptcha_site_key = $(this).data('recaptcha-site-key');
      grecaptcha.ready(function() {
        grecaptcha.execute(recaptcha_site_key, {action: 'php_email_form_submit'}).then(function(token) {
          php_email_form_submit(this_form,action,this_form.serialize() + '&recaptcha-response=' + token);
        });
      });
    } else {
      const name = $('#contact-name').val();
      const email = $('#contact-email').val();
      const subject = $('#contact-subject').val();
      const message = $('#contact-message').val();

      const requestData = {
        name,
        email,
        subject,
        message,
      };
      console.log(requestData);
      php_email_form_submit(this_form, action, requestData);
    }
    
    return true;
  });

  function php_email_form_submit(this_form, action, data) {
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      timeout: 40000
    }).done( function(msg){
      console.log(msg);
      if (msg.trim() == 'OK') {
        this_form.find('.loading').slideUp();
        this_form.find('.sent-message').slideDown();
        this_form.find("input:not(input[type=submit]), textarea").val('');
        $('.img-selected').removeClass('img-selected');
      } else {
        this_form.find('.loading').slideUp();
        if(!msg) {
          msg = 'Form submission failed and no error message returned from: ' + action + '<br>';
        }
        this_form.find('.error-message').slideDown().html(msg);
      }
    }).fail( function(data){
      console.log(data);
      var error_msg = "Form submission failed!<br>";
      if(data.statusText || data.status) {
        error_msg += 'Status:';
        if(data.statusText) {
          error_msg += ' ' + data.statusText;
        }
        if(data.status) {
          error_msg += ' ' + data.status;
        }
        error_msg += '<br>';
      }
      if(data.responseText) {
        error_msg += data.responseText;
      }
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html(error_msg);
    });
  }

})(jQuery);
