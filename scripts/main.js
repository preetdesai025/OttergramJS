var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 'Escape';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var THUMBNAIL_INDEX = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

document.addEventListener('click', function() {
    console.log('You CLicked!');
});

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function NavigationHandler() {
    thumbnails = getThumbnailsArray();
    setDetailsFromThumb(thumbnails[THUMBNAIL_INDEX]);
}

function nextImage() {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR); // get detail image
    for (var i = 0; i < thumbnails.length; i++){ // compare until detail matches thumbnail link
        if (thumbnails[i].href === detailImage.src){ // increment to next image in thumbnail list
            setDetailsFromThumb(thumbnails[i+1]);
            break; 
        } else { console.log("End of Thumbnail-list"); } 
    }
}

function previousImage() {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR); // get detail image
    for (var i = 0; i < thumbnails.length && i >= 0; i++){ // compare until detail image matches thumbnail link
        if (thumbnails[i].href === detailImage.src){ // decrement to previous image in thumbnail list
            setDetailsFromThumb(thumbnails[i-1]);
            break;
        } else { console.log("Start of Thumbnail-list"); } 
    }
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function showDetails(){
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (KeyboardEvent) {
        KeyboardEvent.preventDefault();
       // console.log(KeyboardEvent.code);
        if (KeyboardEvent.code === ESC_KEY){
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    NavigationHandler();
}

initializeEvents();