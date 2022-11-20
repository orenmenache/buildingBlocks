"use strict";
var IS = {
    compLayer: function (layer) {
        if (!layer.hasOwnProperty('source'))
            return false;
        return layer.source == '[object CompItem]';
    },
    avLayer: function (layer) {
        if (!layer.hasOwnProperty('source'))
            return false;
        return layer.source == '[object FootageItem]';
    },
    cameraLayer: function (layer) {
        return layer.toString() == '[object CameraLayer]';
    },
    textLayer: function (layer) {
        return layer.toString() == '[object TextLayer]';
    }
};
