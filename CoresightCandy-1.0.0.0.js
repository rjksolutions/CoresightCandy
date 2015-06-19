$(document).ready(function () {

    var iframe = $('#mainframe'); var iframeURL = $('#mainframeURL');

    iframe.attr('src', 'http://webserver/Coresight/#/PBDisplays/123');
    iframe.attr('height', window.innerHeight);
    iframe.attr('width', window.innerWidth);
    iframe.load(function () {
        // Set up a 1 second timer to check for new navigation in the IFrame
        setInterval(function () {
            var currentLocation = iframe.get(0).contentWindow.location.toString().toLowerCase();
            var currentElement = currentLocation.split("?");

            if (iframeURL.val() !== currentLocation) {
                // Most likely user navigated within the IFrame
                // Inject the Coresight Candy Display specific js

                // Only interested in ProcessBook displays (for now!)
                if (currentLocation.toLowerCase().indexOf('pbdisplays') >= 0) {
                    // Anything that you want to perform on each ProcessBook display
                    // Same could be placed in the Pseudo "Display_Open" event in the Coresight Candy display js

                    // 1. Check for Element Relative Display
                    // 2. Find PBButtons with the prefix "erdlink_"
                    // 3. Add suffix of the current element from the querystring
                    if (currentLocation.indexOf('currentelement=') >= 0) {
                        // Find the anchors
                        var pbButtonLinks = iframe.contents().find('a[*|xlink]').toArray();
                        $.each(pbButtonLinks, function (index, element) { // I've already prefixed the names of the PBButtons with "ERDLINK_" so I know to append the CurrentElement
                            // Make sure it doesn't already have the CurrentElement= set
                            if ($(element).attr('xlink:href').indexOf(currentElement[1]) < 0) {
                                $(element).attr('xlink:href', $(element).attr('xlink:href') + '?' + currentElement[1]);
                            }
                        });
                    }
                }

                // Set the location so we don't continually Inject and overdose
                iframeURL.val(currentLocation);
            }
        }, 1000);
    });
});

$(window).resize(function () {
    $('#mainframe').css('height', window.innerHeight);
    $('#mainframe').css('width', window.innerWidth);
});
