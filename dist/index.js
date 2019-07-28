document.addEventListener('DOMContentLoaded', () => {
    // Auto-initialize all Materialize CSS Javascript components
    M.AutoInit();

    var box = initializeMaterialboxed();
    initializeCarousel(box);
});



const initializeMaterialboxed = () => {
    // Set up the materialboxed instances with the proper callback functions
    var boxElems = document.querySelectorAll('.materialboxed');
    var box = M.Materialbox.init(boxElems, {
        onOpenStart: () => {
            let indicators = document.querySelector('div.carousel ul.indicators');
            if (indicators) { indicators.style.zIndex = -1 }
            let navArrowContainers = document.querySelectorAll('a.nav-arrow-container');
            if (navArrowContainers) {
                navArrowContainers.forEach(container => {
                    container.style.zIndex = -1;
                })
            }
        },
        onCloseEnd: () => {
            let indicators = document.querySelector('div.carousel ul.indicators');
            if (indicators) { indicators.style.zIndex = 0 }
            let navArrowContainers = document.querySelectorAll('a.nav-arrow-container');
            if (navArrowContainers) {
                navArrowContainers.forEach(container => {
                    container.style.zIndex = 1;
                })
            }
        }
    });

    // Return the materialboxed instances so they may be used by other elements
    return box
}


const initializeCarousel = (box) => {
    // First initialize the carousel using Materialize CSS
    var carouselElem = document.querySelector('.carousel.carousel-slider')
    var carousel = M.Carousel.init(carouselElem, {
        fullWidth: true,
        indicators: true,
        padding: 900,
        duration: 100,
        onCycleTo: () => {
            Array.from(box).forEach((instance, index) => {
                let el = instance.el;
                if (el.classList.contains('active')) {
                    instance.close();
                };
            });
        },
    });

    // Next initialize the 'Image Selectors' at the bottom of the carousel
    var imageSelectorDiv = document.querySelector('div.image-selector');
    if (imageSelectorDiv) {
        Array.from(imageSelectorDiv.children).forEach((selector, index) => {
            selector.addEventListener('click', () => {
                document.querySelector('div.image-selector>a.active').classList.remove('active');
                carousel.set(index);
                selector.classList.add('active');
            });
        });
    };

    // Finally, initialize the navigation arrows
    var navArrowButtons = document.querySelectorAll('.nav-arrow-container');
    if (navArrowButtons && carousel) {
        navArrowButtons.forEach(button => {
            if (button.classList.contains('next')) {
                button.addEventListener('click', () => { carousel.next() });
            } else if (button.classList.contains('prev')) {
                button.addEventListener('click', () => { carousel.prev() });
            }
        });
    };

    // Finally, initialize the carousel height (Materialize CSS bug fix)
    carouselHeight(carouselElem);

    // Return the carousel instance so it may be manipulated by other elements
    return carousel;
};

// Calculate the height of the carousel div
//  - A bug in Materialize CSS prevents this calculation from happening if the image is cached
//  - It only happens ~40% of the time, so run this function to be safe
const carouselHeight = (carouselElem) => {
    // Check if there is a carousel on the page
    if (carouselElem) {
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
