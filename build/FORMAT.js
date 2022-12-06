"use strict";
var FORMAT = {
    /**
     * get rid of %20
     */
    aepFileName: function (fileName) {
        while (fileName.indexOf('%20') > -1) {
            fileName = fileName.replace('%20', ' ');
        }
        return fileName;
    }
};
