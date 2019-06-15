document.addEventListener('DOMContentLoaded', function () {
    // M.AutoInit();

    var carousel = document.querySelector('.carousel')
    var instance = M.Carousel.init(carousel, {
        fullWidth: true,
        indicators: true
    });
});