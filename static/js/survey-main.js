$(function(){
	$("#survey-form").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        labels: {
            finish: "Submit",
            next: "Forward",
            previous: "Backward"
        }
    });
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custome Jquery Step Button
    $('.forward').click(function(){
    	$("#survey-form").steps('next');
    });
    $('.backward').click(function(){
        $("#survey-form").steps('previous');
    });
    // Select Dropdown
    $('html').click(function() {
        $('.select .dropdown').hide(); 
    });
    $('.select').click(function(event){
        event.stopPropagation();
    });
    $('.select .select-control').click(function(){
        $(this).parent().next().toggle();
    })    
    $('.select .dropdown li').click(function(){
        $(this).parent().toggle();
        var text = $(this).attr('rel');
        $(this).parent().prev().find('div').text(text);
    });

    $('.type-pic-option').click(function (e) {
      let selectedValue = $(this).attr('name');
      $('#project-type').val(selectedValue);
      $('.type-pic-option').removeClass('img-selected');
      if (selectedValue === 'companyHeadquarter') {
        selectedValue = 'headquarter';
      } else if (selectedValue === 'restaurantCafeteria') {
        selectedValue = 'restaurant';
      }
      selectDesignImg(selectedValue);
      $(this).addClass('img-selected');
    });

    $('.restaurant-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#restaurant-type').val(selectedValue);
      $('.restaurant-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });

    $('.class-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#design-class').val(selectedValue);
      $('.class-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });
  
    $('.design-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#design-type').val(selectedValue);
      $('.design-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });
  
    $('.color-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#color-scheme').val(selectedValue);
      $('.color-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });
  
    $('.material-pic-option').click(function (e) {
      const selectedValue = $(this).attr('data-value');
      $(this).toggleClass('img-selected');
      const newValue = selectedValue == 'false' ? 'true' : 'false';
      $(this).attr('data-value', newValue);
  
      // check if at least one option selected
      let isValid = null;
      $('.material-pic-option').each(function () {
        const dataValue = $(this).attr('data-value')
        if (dataValue == 'true') {
          isValid = true;
        }
      });
      $('#materials').val(isValid);
    });
  
    $('.pattern-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#pattern').val(selectedValue);
      $('.pattern-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });
  
    $('.lighting-pic-option').click(function (e) {
      const selectedValue = $(this).attr('name');
      $('#lighting-level').val(selectedValue);
      $('.lighting-pic-option').removeClass('img-selected');
      $(this).addClass('img-selected');
    });
  
    $('.fixtures-pic-option').click(function (e) {
      const selectedValue = $(this).attr('data-value');
      $(this).toggleClass('img-selected');
      const newValue = selectedValue == 'false' ? 'true' : 'false';
      $(this).attr('data-value', newValue);
  
      // check if at least one option selected
      let isValid = null;
      $('.fixtures-pic-option').each(function () {
        const dataValue = $(this).attr('data-value')
        if (dataValue == 'true') {
          isValid = true;
        }
      });
      $('#fixtures').val(isValid);
    });
  
    $('.features-pic-option').click(function (e) {
      const selectedValue = $(this).attr('data-value');
      $(this).toggleClass('img-selected');
      const newValue = selectedValue == 'false' ? 'true' : 'false';
      $(this).attr('data-value', newValue);
    });
  
    $('.mixing-check').change(function () {
      let isValid = null;
      $('.mixing-check').each(function () {
        const checkedValue = $(this).prop('checked');
        if (checkedValue) {
          isValid = true;
        }
      });
      $('#mixing-type').val(isValid);
    });
  
    $('.lighting-check').change(function () {
      let isValid = null;
      $('.lighting-check').each(function () {
        const checkedValue = $(this).prop('checked');
        if (checkedValue) {
          isValid = true;
        }
      });
      $('#lighting-type').val(isValid);
    });

    function selectDesignImg(folderName) {
      if (folderName !== 'landscape') {
        $('#design-type-section').show();
        $('#design-type').show();
        $('#design-type-hint').show();
        $('#design-class').hide();
        $('#design-class-hint').hide();
        $('#preferred-features-section').hide();
        $('#classical img').attr('src', `/static/img/survey/${folderName}/survey-01.jpg`);
        $('#neoclassical img').attr('src', `/static/img/survey/${folderName}/survey-02.jpg`);
        $('#minimal img').attr('src', `/static/img/survey/${folderName}/survey-03.jpg`);
        $('#modern img').attr('src', `/static/img/survey/${folderName}/survey-04.jpg`);
        $('#traditional img').attr('src', `/static/img/survey/${folderName}/survey-05.jpg`);
      } else {
        $('#design-type-section').hide();
        $('#preferred-features-section').show();
        $('#design-type').hide();
        $('#design-type-hint').hide();
        $('#design-class').show();
        $('#design-class-hint').show();
      }
  
      if (folderName === 'office') {
        $('#traditional').hide();
      } else {
        $('#traditional').show();
      }
  
      if (folderName === 'restaurant') {
        $('#restaurant-section').show();
      } else {
        $('#restaurant-section').hide();
      }
  
      if (folderName === 'landscape') {
        $('#design-class-section').show();
      } else {
        $('#design-class-section').hide();
      }
    }

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
  
})
