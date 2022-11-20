"use strict";
var HAS = {
    markers: function (layer) {
        try {
            var marker = layer.marker;
            return marker.numKeys > 0;
        }
        catch (e) {
            throw new Error("HAS.markers\nLayerName: " + layer.name);
        }
    }
};
