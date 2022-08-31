/*==================== JQEARY CODE START HERE ====================*/
(function ($) {
  "use strict";

  // PRELOADER ACTIVE FUNCTION
  var windowOn = $(window);
  windowOn.on("load", function () {
    $(".preloader").delay(3000).fadeOut(500);
  });

  // SHOW MENU ACTIVE FUNCTION
  var navToggle = $(".nav-menu"),
    navOpen = $(".menu-open"),
    navClose = $(".menu-close");
  if (navOpen) {
    navOpen.on("click", function () {
      navToggle.addClass("show-menu");
    });
  }

  // MENU HIDE FUNCTION
  if (navClose) {
    navClose.on("click", function () {
      navToggle.removeClass("show-menu");
    });
  }

  // REMOVE MENU ON CLICK
  var navLink = $(".nav-menu ul li a");
  function linkAction() {
    $(".nav-menu").removeClass("show-menu");
  }
  navLink.each(function (i, link) {
    $(link).on("click", linkAction);
  });

  // SUB-MENU ACTIVE FUNCTION
  $(".sub__menu").hide(); //Hide children by default
  $(".has-sub__menu")
    .children()
    .click(function (event) {
      event.preventDefault();
      $(this).children(".sub__menu").slideToggle("slow");
    });

  // MEANMENU ACTIVE FUNCTION
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "992",
  });

  // ONE PAGE NAV ACTIVE FUNCTION
  var topOffset = $(".header-area").height() - 10;
  $(".main-menu nav ul").onePageNav({
    currentClass: "active",
    scrollOffset: topOffset,
  });

  // STICKY HEADER ACTIVE FUNCTION
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $(".main-header").removeClass("sticky-header");
    } else {
      $(".main-header").addClass("sticky-header");
    }
  });

  // HERO SLIDER BY SLICK SLIDER JS
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: false,
      fade: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: false,
            arrows: false,
          },
        },
      ],
    });
    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  // SLIDER BY OWL CAROUSEL
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      767: {
        items: 3,
      },
      992: {
        items: 5,
      },
    },
  });

  // Banner SLIDER ACTIVE FUNCTION BY SWIPER JS
  var swiper = new Swiper(".banner-slider", {
    loop: true,
    speed: 1200,
    centeredSlides: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // REVIEW SLIDER ACTIVE FUNCTION BY SWIPER JS
  var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });

  // POPUP IMAGE BY MAGNIFIC POPUP
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  // VIDEO POPUP BY MAGNIFIC POPUP
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  // FILTER ACTIVE FUNCTION BY ISOTOPE JS
  $(".grid").imagesLoaded(function () {
    // init Isotope
    var $grid = $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: ".grid-item",
      },
    });
    // filter items on button click
    $(".portfolio-menu").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });
    //for menu active class
    $(".portfolio-menu button").on("click", function (event) {
      $(this).siblings(".active").removeClass("active");
      $(this).addClass("active");
      event.preventDefault();
    });
  });

  // FILTER ACTIVE FUNCTION BY MIXIT UP JS
  var mixer = mixitup(".gallery-container");
  //for galley button active class
  $(".gallery-btn-area button").on("click", function (event) {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
  });

  // MENU TAB ACTIVE FUNCTION
  var filterButtons = $(".menu-btn-area button");
  var filterItems = $(".menus");
  filterButtons.each(function (i, button) {
    $(button).on("click", function () {
      $(this).siblings(".active").removeClass("active");
      $(this).addClass("active");
      var dataFilter = $(this).attr("data-btn");
      filterItems.each(function (z, item) {
        var dataItem = $(item).attr("data-item");
        if (dataFilter == dataItem) {
          $(this).addClass("show");
        } else {
          $(this).removeClass("show");
        }
      });
    });
  });

  // LOAD MORE ACTIVE FUNCTION
  $("[data-work-list] > li").slice(0, 9).show();
  $("[data-work-btn] [data-view-more]").on("click", function (e) {
    e.preventDefault();
    $("[data-work-list] > li:hidden").slice(0, 3).slideDown("slow");
    if ($("[data-work-list] > li:hidden").length == 0) {
      $("[data-work-btn]").fadeOut("slow");
    }
    $("html,body").animate(
      {
        scrollTop: $(this).offset().top - 180,
      },
      "slow"
    );
    return false;
  });

  // COUNTER UP ACTIVE FUNCTION
  $(".counter__number").counterUp({
    delay: 10,
    time: 1000,
  });

  // TESTIMONIAL SLIDER ACTIVE BY SLICK
  $(".testimonial").slick({
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fi fi-rs-arrow-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fi fi-rs-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // DATA BACKGROUND JS
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  $("[data-top-space]").each(function () {
    $(this).css("padding-top", $(this).attr("data-top-space"));
  });

  // SCROLL TO TOP ACTIVE FUNCTION
  var windoScroll = $(window);
  windoScroll.on("scroll", function () {
    if ($(this).scrollTop() > 150) {
      $(".scroll-up__btn").addClass("active");
    } else {
      $(".scroll-up__btn").removeClass("active");
    }
  });
  $(".scroll-up__btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // SCROLL TO TOP ACTIVE FUNCTION BY PLUGIN
  $.scrollUp({
    scrollName: "scrollUp", // Element ID
    topDistance: "300", // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: "fade", // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    scrollText: '<i class="icofont icofont-long-arrow-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  });

  // ANIMATION ACTIVE BY AOS JS
  AOS.init();

  // ANIMATION ACTIVE BY WOW JS
  new WOW().init();
//filter part manu-2
$('.more-filter-all button').on('click', function(){
  $('.filter-two').show();
});

$('.hide').on('click', function(){
  $('.filter-two').hide();
});





})(jQuery);
