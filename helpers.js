var moment = require("moment");

exports.init = function () {
    /**
     * Add C# like string.format function to javascript
     * "{0} hello".
     */
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }

    /**
     * Remove the first word from the string
     */
    if (!String.prototype.stripFirst) {
        String.prototype.stripFirst = function () {
            return this.substr(this.indexOf(" ") + 1);
        };
    }

    /**
     * Get the first word in a string
     */
    if (!String.prototype.getFirst) {
        String.prototype.getFirst = function () {
            return this.split(' ')[0];
        };
    }

    /**
     * Check if the string starts with
     */
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }

    /**
     * Add a contains to the String primitive
     * @param it
     * @returns {boolean}
     */
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

    /**
     * A simple add an as
     * @param number
     * @returns {string}
     */
    String.prototype.plural = function(number) {
        return number > 1 ? this + "s" : this;
    }
};

/**
 * Get the difference between now and the current time
 * @param time
 * @returns {moment.duration}
 */
exports.timeDiff = function (time) {
    var ms = moment(time, "DD/MM/YYYY HH:mm:ss").diff(moment());
    return moment.duration(ms);
};

/**
 * Get the current time span
 * @returns {string}
 */
exports.getCount = function () {
    var d = this.timeDiff("14/06/2015 21:45:00");
    return "{0} {1}, {2} {3}, {4} {5}, {6} {7} until Bethesda's E3 event! Please Stand By..".
        format(
            d.get('days'),
            'day'.plural(d.get('days')),
            d.get('hours'),
            'hour'.plural(d.get('hours')),
            d.get('minutes'),
            'minute'.plural(d.get('minutes')),
            d.get('seconds'),
            'second'.plural(d.get('seconds'))
    );
};


