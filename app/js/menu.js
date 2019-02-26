'use strict';
(function () {
  var HEADER_HEIGHT_COOFICIENT = 0.14;
  
  var mainNav = document.querySelector('.main-nav');
  var buns = document.querySelector('.main-nav__buttons');
  var toggle = document.querySelector('.main-nav__toggle');

  mainNav.classList.remove('main-nav--no-js');

  buns.addEventListener('click', function(evt) {
    evt.preventDefault();

    if(mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
      toggle.classList.add('main-nav__toggle--show');
      $('.main-nav__list').slideDown();
    } else {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
      toggle.classList.remove('main-nav__toggle--show');
      $('.main-nav__list').slideUp();
    }
  });

  $(document).ready(function() {
    var headerHeight = $('.header').outerHeight();
    $('.main-nav__link').click(function(evt) {
      evt.preventDefault();
      var linkHref = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(linkHref).offset().top - HEADER_HEIGHT_COOFICIENT*headerHeight
      }, 1000);
      $('.main-nav__list').slideUp();
      toggle.classList.remove('main-nav__toggle--show');
      mainNav.classList.add('main-nav--closed');
    })
  })
})()