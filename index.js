document.addEventListener('DOMContentLoaded', function () {

    var carousel = document.querySelector('.carousel')
    var instance = M.Carousel.init(carousel, {
        fullWidth: true,
        indicators: true,
    });
    M.AutoInit();

    // Initialize the hover slideshow class elements
    document.querySelectorAll('.hover-slide-container').forEach(element => hoverSlideInit(element));

});

const hoverSlideInit = (element) => {
    element.addEventListener('mouseenter', () => startSlideShow(element))
    element.addEventListener('mouseleave', () => stopSlideShow(element))
    element.addEventListener('click', () => openLightboxClone(element))

    var slides = element.children;
    slides[0].style.display = 'block'; // Show only the first slide on initialization

    // Set the div height based on the largest image in the slideShow container
    let clientWidth = slides[0].children[0].getBoundingClientRect().width;
    let clientHeight = slides[0].children[0].getBoundingClientRect().height;
    let maxHeight = clientHeight;

    element.style.height = clientHeight + 'px';
    // Set the appropriate div height (the height of the tallest image)
    for (let i = 1; i < slides.length; i++) {
        let slideHeight = slides[i].children[0].height;
        let slideWidth = slides[i].children[0].width;

        let ratio = clientWidth / slideWidth;
        let newHeight = ( slideHeight * ratio );
        if ( newHeight > maxHeight ) {
            maxHeight = newHeight;
            element.style.height = maxHeight + 'px';
        }
    }
}

const openLightboxClone = (element) => {
    let image = element.children[0].children[0]
    console.log(image.height)
    let newDiv = document.createElement('div')
    newDiv.classList.add('lightboxClone')
    // Make sure the div is centered no matter where the user has scrolled
    console.log( window )

    let topPixels = (window.innerHeight * 0.20) + window.scrollY;
    newDiv.style.top = topPixels + 'px';

    let overlay = document.createElement('div')
    overlay.id = 'lightboxOverlay'

    let clonedImage = image.cloneNode(true)
    console.log(clonedImage.getBoundingClientRect())
    clonedImage.style.cursor = 'zoom-out';

    newDiv.appendChild(overlay)
    newDiv.appendChild(clonedImage)

    // TODO: MAKE IMAGE PROPER HEIGHT BASED ON WIDTH OF SCREEN AND RATIO
    // GET THE SCROLL POSITION OF THE BROWSER TO KNOW WHERE TO POSITION THE IMAGE
    
    document.body.appendChild(newDiv)

    newDiv.addEventListener('click', () => closeLightboxClone(newDiv) )
}
const closeLightboxClone = (element) => {
    var fadeLightbox = element.animate([
        { opacity: 1 },
        { opacity: 0 },
    ], 200)
    fadeLightbox.onfinish = () => {
        element.remove()
    }
}




var timer, fadeOut
var currentSlide = 0;
const stopSlideShow = (element) => {
    var slides = element.children;

    // Stop any additional calls to the startSlideShow() fuction
    clearTimeout(timer);
    // Cancel the animation that is currently going on (if it is)
    fadeOut.cancel()

    // Reset the currentSlide to the first slide
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[0].style.display = 'block';
    currentSlide = 0;
}
const startSlideShow = (element) => {
    var slides = element.children;

    fadeOut = slides[currentSlide].animate([
        { opacity: 1 },
        { opacity: 0 },
    ], 200);

    fadeOut.onfinish = () => {
        // The animation made the slide transparent,
        // Now set display: none
        slides[currentSlide].style.display = 'none';

        currentSlide++; // Increment the current slide
        if (currentSlide > slides.length-1) {
            // Handle the case where the next index is out of range
            currentSlide = 0;
        }
        // Show the next slide
        slides[currentSlide].style.display = 'block';

        // Set a timer to display the next slide
        timer = setTimeout(() => startSlideShow(element), 3000)
    }
}