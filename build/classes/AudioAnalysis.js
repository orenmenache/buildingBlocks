"use strict";
var AudioAnalysis = /** @class */ (function () {
    function AudioAnalysis(layer, threshold) {
        var _a;
        if (threshold === void 0) { threshold = 1; }
        this.layer = layer;
        this.threshold = threshold;
        this.containingComp = layer.containingComp;
        _a = this.getThreshInOut(), this["in"] = _a[0], this.out = _a[1];
        this.inPointGap = this.getStartToInpointGap();
        this.markerTimesByIndex = {};
        this.markerTimesByName = {};
        this.getMarkerTimes();
    }
    /**
     * returns the time locations where the audio of layer within containingComp
     * goes over (inPoint) and under (outPoint) the threshold
     */
    AudioAnalysis.prototype.getThreshInOut = function () {
        this.containingComp.openInViewer();
        try {
            this.layer.solo = true;
            app.executeCommand(app.findMenuCommandId('Convert Audio to Keyframes')); //creates new layer
            var audioAnalLayer = this.containingComp.layer(1); // Audio Amplitude
            var audioAnalEffect = audioAnalLayer.effect('Both Channels')('Slider');
            var threshIn = this.getIn(audioAnalEffect);
            var threshOut = this.getOut(audioAnalEffect);
            var audioAnalLayerSource = audioAnalLayer.source;
            audioAnalLayer.remove();
            audioAnalLayerSource.remove();
            this.layer.solo = false;
            return [threshIn, threshOut];
        }
        catch (e) {
            throw new Error("Error in AudioLayer.analyze. LayerName: " + this.layer.name + "\nError: " + e.message);
        }
    };
    AudioAnalysis.prototype.getIn = function (audioAnalEffect) {
        for (var i = 1; i <= audioAnalEffect.numKeys; i++) {
            if (audioAnalEffect.keyValue(i) > this.threshold) {
                return audioAnalEffect.keyTime(i);
            }
        }
        return -1;
    };
    AudioAnalysis.prototype.getOut = function (audioAnalEffect) {
        var end = audioAnalEffect.numKeys;
        for (var i = end; i > 0; i--) {
            if (audioAnalEffect.keyValue(i) > this.threshold) {
                var out = audioAnalEffect.keyTime(i);
                return out;
            }
        }
        return -1;
    };
    /**
     * If inPoint is different than startTime get the gap
     */
    AudioAnalysis.prototype.getStartToInpointGap = function () {
        return this.layer.inPoint - this.layer.startTime;
    };
    /**
     * Grab all markers in layer
     * and map by index and name
     */
    AudioAnalysis.prototype.getMarkerTimes = function () {
        try {
            var marker = this.layer.marker;
            var numMarkers = marker.numKeys;
            // if has no markers just return
            if (numMarkers === 0)
                return;
            for (var i = 1; i <= numMarkers; i++) {
                var time = marker.keyTime(i);
                var markerName = marker.keyValue(i).comment;
                this.markerTimesByIndex[i] = time;
                if (markerName !== '') {
                    this.markerTimesByName[markerName] = time;
                }
            }
        }
        catch (e) {
            throw new Error("AudioLayerHandler.mapMarkersByName\nLayerName: " + this.layer.name);
        }
    };
    AudioAnalysis.prototype.getMaxOutPoint = function () { };
    return AudioAnalysis;
}());
// function getMaxOutPoint(layer, layerComp) {
//     //"layer" is the layer we're trimming inside "containingComp"
//     //Layer is analyzed by first footage internal layer;
//     //We're going to make sure that the out padding of "layer" inside "containingComp"
//     //doesn't exceed the outPoint of the footage inside it.
//     //Let's get the startTime of "layer" inside "inComp":
//     var externalStartTime = layer.startTime;
//     //Now we find the first footage layer inside layerComp:
//     var layers = layerComp.layers;
//     for (var i = 1; i <= layers.length; i++) {
//         if (layers[i].source == '[object FootageItem]') {
//             var internalFootageLayer = layers[i];
//             //Found the first footage layer, the outPoint of which will limit the padding
//             var internalOutPoint = internalFootageLayer.outPoint;
//             //Now let's calculate the maximum outPoint of layer:
//             var maxOutPoint = externalStartTime + internalOutPoint;
//             return maxOutPoint;
//         }
//     }
//     //if there's no footage layer return false
//     return false;
// }
