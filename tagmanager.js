// module from: https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== "undefined") {
                    jQuery = require("jquery");
                } else {
                    jQuery = require("jquery")(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function($) {

    var id, debug = false;

    var defaultSettings = {
        where: "document",
        class: "ga-tag",
        event: "click",
        debug: false
    };

    var _pushGA = function(obj) {
        if (debug) {
            console.log("[GTM] Push: ", obj);
        } else {
            return dataLayer.push(obj);
        }
        return false;
    };

    var _pushDataAttrGA = function(where, className, event) {
        var eventSuffix = ".gaTagManager";
        $(where)
            .find(" ." + className)
            .unbind(event + eventSuffix)
            .bind(event + eventSuffix, function(e) {
                var elem = $(e.currentTarget);
                _pushGA(_createObjectFromElement(elem));
            });
    };

    var _checkTagManagerIsPresent = function() {
        var msg;
        try {
            if (window.dataLayer) {
                return true;
            }
        } catch (err) {
            msg = "[GTM] ERROR: Google Tag Manager is not present. Please check that the code is properly included.";
            $.error(msg);
            console.error(msg);
        }
    };

    var _createGAEventObjectFromElement = function(elem) {
        var obj = {
            category: elem.data("gacategory"),
            action: elem.data("gaaction"),
            label: elem.data("galabel"),
            event: elem.data("gaevent")
        };
        var custom = elem.data("gacustom");
        if (custom !== undefined) {
            $.each(custom, function(name, value) {
                obj[name] = value;
            });
        }
        return obj;
    };

    var _createVirtualUrlObjectFromElement = function(elem) {
        var obj = {
            virtualurl: elem.data("gaurl"),
            event: elem.data("gaevent")
        };
        var custom = elem.data("gacustom");
        if (custom !== undefined) {
            $.each(custom, function(name, value) {
                obj[name] = value;
            });
        }
        return obj;
    };

    var _createObjectFromElement = function(elem) {
        var event = elem.data("gaevent"),
            actions = {
                "virtualpage": _createVirtualUrlObjectFromElement,
                "eventga": _createGAEventObjectFromElement
            };
        return actions[event].call(this, elem);
    };

    var _initCode = function(id) {
        var f = document.getElementsByTagName("script")[0],
            j = document.createElement("script");
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            "event": "gtm.js"
        });
        j.async = true;
        j.src = "//www.googletagmanager.com/gtm.js?id=" + id + "&l=" + "dataLayer";
        f.parentNode.insertBefore(j, f);
    };

    var methods = {
        init: function(options) {
            var settings = $.extend(defaultSettings, options);
            id = settings.id || id;
            debug = settings.debug || debug;
            if (!id) {
                $.error("Expected a Google Tag Manager ID. Must be something like: GTM-ABC123");
                return;
            }
            if (!window.dataLayer) {
                if (debug) {
                    console.log("[GTM] Init: inserting Google Tag Manager code.");
                }
                _initCode(id);
            }
            _pushDataAttrGA(settings.where, settings.class, settings.event);
        },
        push: function(obj) {
            if (_checkTagManagerIsPresent()) {
                return _pushGA(obj);
            }
            return false;
        }
    };

    $.fn.tagManager = function(method, data) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.tagManager");
        }
    };

    $.tagManager = function(method, options) {
        $.fn.tagManager(method, options);
    };

}));
