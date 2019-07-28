document.addEventListener('DOMContentLoaded', () => {

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

    var carouselElem = document.querySelector('.carousel.carousel-slider')
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
            selector.addEventListener('click', () => {
                document.querySelector('div.image-selector>a.active').classList.remove('active')
                carousel.set(index)
                selector.classList.add('active')
            })
        })
    }

    // Calculate the height of the carousel div
    //  - A bug in Materialize CSS prevents this calculation from happening if the image is cached
    //  - It only happens ~40% of the time, so run this function to be safe
    const carouselHeight = (carouselElem) => {
        // Check if there is a carousel on the page
        if ( carouselElem ) {
            // Get the first image
            let img = document.querySelector('.carousel.carousel-slider .carousel-item img');
            let imgHeight = img.height;
            let imgWidth = img.width;
            let divWidth = document.querySelector('.carousel.carousel-slider').offsetWidth;
            // Calculate ratio to find appropriate height of the div
            let adjustedHeight = divWidth * imgHeight / imgWidth;
            // Set the height
            carouselElem.style.height = adjustedHeight + 'px';
        }
    }
    carouselHeight( carouselElem );

});
