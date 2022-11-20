"use strict";
var GAP = {
    inPointToStartTime: function (layer) {
        return layer.inPoint - layer.startTime;
    },
    inPointToTime: function (layer, time) {
        return time - layer.inPoint;
    },
    startTimeToTime: function (layer, time) {
        return time - layer.startTime;
    },
    firstMarkerToStartTime: function (layer) { },
    markerToStartTime_TOF: function (layer, markerName) {
        try {
            var time = GET.MARKER.timeByName_TOF(layer, markerName);
            return time - layer.startTime;
        }
        catch (e) {
            throw new Error("GAP.markerToStartTime_TOF: " + e.message);
        }
    }
};
