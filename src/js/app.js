window.$ = window.jQuery =  require('jquery');
window.slick =              require('./vendor/bower/slick');

$(document).ready(function() {

    $("#index-slider").slick({
        dots: true,
        fade: true
    });

});