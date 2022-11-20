"use strict";
var RESIZE = {
    COMP: {
        toTextLayerWidth: function (comp, textLayer, padding) {
            if (padding === void 0) { padding = 0; }
            try {
                if (padding < 0)
                    throw new Error("Padding smaller than 0");
                var sr = textLayer.sourceRectAtTime(0, false);
                var w = sr.width;
                comp.width = Math.round(w + padding * 2);
            }
            catch (e) {
                throw new Error("resize comp toTextLayerWidth failed: " + e.message);
            }
        },
        toTextLayerHeight: function (comp, textLayer, padding) {
            if (padding === void 0) { padding = 0; }
            try {
                if (padding < 0)
                    throw new Error("Padding smaller than 0");
                var sr = textLayer.sourceRectAtTime(0, false);
                var h = sr.height;
                comp.height = Math.round(h + padding * 2);
            }
            catch (e) {
                throw new Error("resize comp toTextLayerHeight failed: " + e.message);
            }
        },
        /**
         * This is required in a case where
         * the comp contains several items
         * which are anchored to the comp's left border
         * so we resize be the rightmost textLayer's position
         * @param comp
         * @param textLayer
         * @param padding
         */
        toRightLayerRightBorder: function (comp, textLayer, padding) {
            if (padding === void 0) { padding = 0; }
            try {
                if (padding < 0)
                    throw new Error("Padding smaller than 0");
                var sr = textLayer.sourceRectAtTime(0, false);
                var w = sr.height;
                comp.height = Math.round(w + padding * 2);
            }
            catch (e) {
                throw new Error("resize comp toRightLayerRightBorder failed: " + e.message);
            }
        }
    },
    AVLAYER: {
        toCompWidth: function (layer, comp) {
            try {
                var scaleValue = 100 * (comp.width / layer.width);
                var layerProp = layer.property('Scale');
                if (!(layerProp instanceof Property))
                    throw new Error("layerProp is not a prop");
                layerProp.setValue([scaleValue, scaleValue]);
            }
            catch (e) {
                throw new Error("resize toCompWidth failed: " + e.message);
            }
        },
        toCompHeight: function (layer, comp) {
            try {
                var scaleValue = 100 * (comp.height / layer.height);
                var layerProp = layer.property('Scale');
                if (!(layerProp instanceof Property))
                    throw new Error("layerProp is not a prop");
                layerProp.setValue([scaleValue, scaleValue]);
            }
            catch (e) {
                throw new Error("resize toCompWidth failed: " + e.message);
            }
        },
        fitToComp: function (layer, comp) {
            try {
                //0.5625 for Full HD 1920x1080
                var compRatio = GET.COMP.ratio(comp);
                if (layer.height !== comp.height ||
                    layer.width !== comp.width) {
                    var layerRatio = GET.AVLAYER.ratio(layer);
                    var scaleValue = void 0;
                    if (layerRatio >= compRatio) {
                        //alert('bigger, resizing by width');
                        RESIZE.AVLAYER.toCompWidth(layer, comp);
                    }
                    else {
                        //alert('smaller, adjusting by height');
                        RESIZE.AVLAYER.toCompHeight(layer, comp);
                    }
                }
            }
            catch (e) {
                throw new Error("fitToComp failed: " + e.message);
            }
        }
    }
};
