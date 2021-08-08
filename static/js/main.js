/**
* Template Name: Flattern - v2.2.1
* Template URL: https://bootstrapmade.com/flattern-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
    (index === 0) ?
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>") :
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function (e) {
    $(this).find('.carousel-content ').addClass('animate__animated animate__fadeInDown');
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    var categoryIsotope = $('.category-container').isotope({
      itemSelector: '.category-item',
      layoutMode: 'fitRows'
    });

    portfolioIsotope.isotope({
      filter: 'xxxxx'
    });

    categoryIsotope.isotope({
      filter: 'xxxxx'
    });

    $('#category-flters li').on('click', function () {
      $("#category-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      categoryIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox();
    });
  });

  // Skills section
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function () {
    aos_init();
  });

  $('.type-pic-option').click(function (e) {
    let selectedValue = $(this).attr('name');
    $('#project-type').val(selectedValue);
    $('.type-pic-option').removeClass('img-selected');
    console.log(selectedValue);
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
      $('#preferred-features-section').hide();
      $('#classical img').attr('src', `/static/img/survey/${folderName}/survey-01.jpg`);
      $('#neoclassical img').attr('src', `/static/img/survey/${folderName}/survey-02.jpg`);
      $('#minimal img').attr('src', `/static/img/survey/${folderName}/survey-03.jpg`);
      $('#modern img').attr('src', `/static/img/survey/${folderName}/survey-04.jpg`);
      $('#traditional img').attr('src', `/static/img/survey/${folderName}/survey-05.jpg`);
    } else {
      $('#design-type-section').hide();
      $('#preferred-features-section').show();
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

})(jQuery);