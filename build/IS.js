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
    },
    legitFileName: function (fileName, fileTypes) {
        for (var _i = 0, fileTypes_1 = fileTypes; _i < fileTypes_1.length; _i++) {
            var fileType = fileTypes_1[_i];
            if (fileName.toLowerCase().indexOf(fileType) > -1)
                return true;
        }
        return false;
    }
};
