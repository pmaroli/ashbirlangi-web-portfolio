document.addEventListener('DOMContentLoaded', function () {

    var carousel = document.querySelector('.carousel')
    var instance = M.Carousel.init(carousel, {
        fullWidth: true,
        indicators: true,
    });

    M.AutoInit();

});