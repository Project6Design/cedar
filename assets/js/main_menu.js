// Definitions

(function() {

    if (typeof window.SITE === "undefined") {
        window.SITE = {};
    }

    SITE.mainMenuScroll = function() {
        $(window).scroll(function() {
            var offset = $(window).scrollTop();

            if (offset > 0) {
                $('#header').addClass('scrolling');
            }
            else {
                $('#header').removeClass('scrolling');
            }
        });
    }

})();


// Invocations

$(function () {
    // Make SVG maps work in IE.
    svg4everybody();

    SITE.mainMenuScroll();

});
