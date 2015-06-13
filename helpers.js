var c = require("irc-colors");
var moment = require("moment");

exports.coolColor = function(str) {
    return c.rainbow(str,['red','white','yellow']);
};
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
};

/**
 * A simple pluralize
 * @return {string}
 */
exports.plural = function (text, number) {
    return number > 1 ? text + "s" : text;
};

exports.timeDiff = function (time) {
    var ms = moment(time, "DD/MM/YYYY HH:mm:ss").diff(moment());
    return moment.duration(ms);
};

/**
 * Get the current time span
 * @returns {string}
 */
exports.getCount = function () {
    var d = this.timeDiff("14/06/2015 22:00:00");
    return "{0} {1}, {2} {3}, {4} {5}, {6} {7} until Bethesda's E3 event! Please Stand By..".format(
        d.get('days'),
        this.plural('day', d.get('days')),
        d.get('hours'),
        this.plural('hour', d.get('hours')),
        d.get('minutes'),
        this.plural('minute', d.get('minutes')),
        d.get('seconds'),
        this.plural('second', d.get('seconds'))
    );
};


