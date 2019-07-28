document.addEventListener('DOMContentLoaded', function () {

    var sidenavElems = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(sidenavElems);

    var boxElems = document.querySelectorAll('.materialboxed');
    var box = M.Materialbox.init(boxElems, {
        onOpenStart: () => {
            let indicators = document.querySelector('div.carousel ul.indicators');
            if (indicators) { indicators.style.zIndex = -1 }
        },
        onCloseEnd: () => {
            let indicators = document.querySelector('div.carousel ul.indicators');
            if (indicators) { indicators.style.zIndex = 0 }
        }
    });

    var carouselElem = document.querySelector('.carousel')
    var carousel = M.Carousel.init(carouselElem, {
        fullWidth: true,
        indicators: true,
        padding: 900,
        duration: 100,
        onCycleTo: () => {
            Array.from(box).forEach((instance, index) => {
                let el = instance.el;
                if ( el.classList.contains('active') ) {
                    instance.close();
                }
            })
        }
    });

    var imageSelectorDiv = document.querySelector('div.image-selector');
    if ( imageSelectorDiv ) {
        Array.from(imageSelectorDiv.children).forEach((selector, index) => {
            console.log(selector)
            selector.addEventListener('click', () => {
                document.querySelector('div.image-selector>a.active').classList.remove('active')
                carousel.set(index)
                selector.classList.add('active')
            })
        })
    }

});
