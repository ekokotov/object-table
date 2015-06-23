angular.module('objectTable').filter('offset', function() {
		return function(input, start, display) {
			if (!input) return;
			start = parseInt(start, 10);
            //if (start == 1) return input.slice(0, display);
            display = parseInt(display, 10);
            var offset = start* display;
            return input.slice(offset, offset + display);
        };
    });