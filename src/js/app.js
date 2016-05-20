window.$ = window.jQuery =  require('jquery');
window.slick =              require('./vendor/bower/slick');
window.styler =             require('jquery.formstyler');
window.gmaps =              require('gmaps');
window.inputmask =          require('jquery.inputmask');
window.validate =           require('jquery-validation');
// window.validate =           require('validate-js');

$(document).ready(function() {

    // Logged/SignIn
    $(".b-sigin").click(function () {
        if (!($(this).hasClass("_hide"))){
         $(this).addClass("_hide");
         $(".b-loggedin").removeClass("_hide");
        }
    });
    $(".b-loggedin").click(function () {
        if (!($(this).hasClass("_hide"))){
            $(this).addClass("_hide");
            $(".b-sigin").removeClass("_hide");
        }
    });

    // Index top slider
    $("#index-slider").slick({
        dots: true,
        fade: false,
        autoplay: true,
        autoplaySpeed: 3000
    });

    // Zones slider
    $(".zones-slider").slick({
        dots: false,
        fade: false,
        autoplay: false,
        autoplaySpeed: 3000
    });

    $("#js-zones-menu").find(".link").click(function () {
        var _this = $(this);
        var links = $("#js-zones-menu").find(".link");

        // $(".zones-slider").slick('unslick');

        links.removeClass("-active");
        _this.addClass("-active");

        if (_this.hasClass("-coworking")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-coworking").addClass("-active").slick('setPosition');
        } else
        if(_this.hasClass("-offices")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-offices").addClass("-active").slick('setPosition');
        } else
        if(_this.hasClass("-conference")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-conference").addClass("-active").slick('setPosition');
        } else
        if(_this.hasClass("-negotiations")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-negotiations").addClass("-active").slick('setPosition');
        } else
        if(_this.hasClass("-kitchen")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-kitchen").addClass("-active").slick('setPosition');
        } else
        if(_this.hasClass("-recreation")){
            $(".zones-slider").removeClass("-active");
            $(".zones-slider.-recreation").addClass("-active").slick('setPosition');
        }
    });

    // Style inputs
    $('select.js-select').styler();
    $('input.js-input-checkbox').styler();

    // Map
    var map = new gmaps({
        el: '#index-map',
        lat: -12.043333,
        lng: -77.028333,
        scrollwheel: false
    });
    map.addMarker({
        lat: -12.043333,
        lng: -77.028333,
        title: 'Lima',
        infoWindow: {
            content: '<p>HTML Content</p>'
        }
    });

    // Partners slider
    $("#partner-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
    });
    
    $('.js-article-preview').click(function () {
        var _this = $(this);
        $('.js-article-text').toggleClass("_hide")
    });

    // Form input[type=tel] masking
    $('.js-input-tel').inputmask({"mask": "(9) (999) 999-9999", greedy: false});

    // Form validation
    var form = $("form");
    $.validator.messages.required = '';
    form.each( function() {
        $(this).validate({
            errorClass: "-error",
            validClass: "-valid",
            errorElement: "em",
            highlight: function( element, errorClass, validClass ) {
                $(element).parent().addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function( element, errorClass, validClass ) {
                $(element).parent().removeClass(errorClass).addClass(validClass);
            },
            errorPlacement: function(error,element) {
                return true;
            }
        });
    } );

    // Top menu toggler
    var toggler = document.querySelector('.js-top-toggler');
    var topMenu = document.querySelector('#js-top-menu');
    var menuList = topMenu.querySelectorAll('ul.list');
    toggler.onclick = function(e){
        e.preventDefault();
        toggler.classList.toggle('-open');
        for (i=0; i < menuList.length; i++) {
            menuList[i].classList.toggle('-open');
        }
    };

    // Smooth scrolling
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 140
                    }, 1000);
                    toggler.classList.remove('-open');
                    for (i=0; i < menuList.length; i++) {
                        menuList[i].classList.remove('-open');
                    }
                    return false;
                }
            }
        });
    });

    // Buy popup
    $(".price-block").find(".buy").click(function (data) {
        var _this = $(this);

        $.get('partials/components/buy-popup.html', function(data) {
            $("header").append(data);
            $("html").addClass("_unscrolled");
            $('.js-input-tel').inputmask({"mask": "(9) (999) 999-9999", greedy: false});
            $(".js-buy-form").validate({
                errorClass: "-error",
                validClass: "-valid",
                errorElement: "em",
                highlight: function( element, errorClass, validClass ) {
                    $(element).parent().addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function( element, errorClass, validClass ) {
                    $(element).parent().removeClass(errorClass).addClass(validClass);
                },
                errorPlacement: function(error,element) {
                    return true;
                }
            });
        });
    });

    $(document).on('click', '.close', function () {
        $(this).parents('div').fadeOut();
        $("html").removeClass("_unscrolled")
    });
});