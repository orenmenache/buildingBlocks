"use strict";
var MOVE = {
    LAYER: {
        BY: {
            MARKER: {
                /**
                 * Move thisLayer by first marker
                 * to thatLayer's out point
                 * @param thisLayer
                 * @param thatLayer
                 */
                toThatOutPoint: function (thisLayer, thatLayer) {
                    try {
                        var firstMarkerTime = GET.MARKER.firstTime_TOF(thisLayer);
                        var gap = GAP.startTimeToTime(thisLayer, firstMarkerTime);
                        var syncPoint = thatLayer.outPoint - gap;
                        thisLayer.startTime = syncPoint;
                    }
                    catch (e) {
                        throw new Error("Error in MOVE.LAYER.BY.MARKER.toThatOutPoint.\nLayerNames: " + thisLayer.name + ", " + thatLayer.name + ".");
                    }
                }
            },
            INPOINT: {
                /**
                 * moves layer based on inPoint
                 * and adds padding if exists
                 * @param layer
                 * @param time
                 * @param padding
                 */
                toTime: function (layer, time, padding) {
                    if (padding === void 0) { padding = 0; }
                    try {
                        var gap = layer.inPoint - layer.startTime;
                        var syncPoint = time - gap + padding;
                        layer.startTime = syncPoint;
                    }
                    catch (e) {
                        throw new Error("Error in MOVE.LAYER.BY.INPOINT.toTime.\nLayerName: " + layer.name + ".");
                    }
                }
            }
        }
    }
};
// function syncInPointToTime(layer, time, timePadding) {
//     //moves layer based on inPoint with the marker and adds padding if exists
//     var gap = layer.inPoint - layer.startTime;
//     var syncPoint = time - gap + timePadding;
//     layer.startTime = syncPoint;
// }
// function syncInPointToOutPoint(layerA, layerB, padding) {
//     //syncs layerA's inPoint with layerB's outPoint
//     layerA.startTime =
//         layerB.outPoint - (layerA.inPoint - layerA.startTime) + padding;
// }
// function syncMarkers(layerA, layerB, markerName) {
//     //moves layerA based on named marker to layerB marker position
//     var layerAMarker = layerA.property('Marker');
//     var layerBMarker = layerB.property('Marker');
//     var layerAMarkerIndex = locateMarkerIndex(layerAMarker, markerName);
//     var layerBMarkerIndex = locateMarkerIndex(layerBMarker, markerName);
//     if (layerAMarkerIndex + layerBMarkerIndex > 0) {
//         //GO
//         var markerATime = layerAMarker.keyTime(layerAMarkerIndex);
//         var markerBTime = layerBMarker.keyTime(layerBMarkerIndex);
//         var gap = getMarkerStartGap(layerA, layerAMarker, layerAMarkerIndex);
//         layerA.startTime = markerBTime - gap;
//     } else {
//         alert("one or more markNames weren't found");
//     }
// }
// function syncMarkersNoGap(layerA, layerB, markerName) {
//     //moves layerA based on named marker to layerB marker position
//     var layerAMarker = layerA.property('Marker');
//     var layerBMarker = layerB.property('Marker');
//     var layerAMarkerIndex = locateMarkerIndex(layerAMarker, markerName);
//     var layerBMarkerIndex = locateMarkerIndex(layerBMarker, markerName);
//     layerAMarker.removeKey(layerAMarkerIndex);
//     var markerBTime = layerBMarker.keyTime(layerBMarkerIndex);
//     var mv = new MarkerValue(markerName);
//     layerAMarker.setValueAtTime(markerBTime, mv);
// }
// function syncSingleMarkers(layerA, layerB) {
//     //moves layerA based on single marker to layerB marker position
//     var layerAMarker = layerA.property('Marker');
//     var layerBMarker = layerB.property('Marker');
//     //var layerAMarkerIndex = locateMarkerIndex(layerAMarker,markerName);
//     //var layerBMarkerIndex = locateMarkerIndex(layerBMarker,markerName);
//     //if ((layerAMarkerIndex+layerBMarkerIndex)>0){ //GO
//     var markerATime = layerAMarker.keyTime(1);
//     var markerBTime = layerBMarker.keyTime(1);
//     var gap = getMarkerStartGap(layerA, layerAMarker, 1);
//     layerA.startTime = markerBTime - gap;
//     //} else {
//     //alert("one or more markNames weren't found");
//     //}
// }
// function syncTransitionsToTheirNextLayer(mainLayers, transitions) {
//     for (var i = 0; i < transitions.length; i++) {
//         var index = transitions[i].index;
//         var nextLayer = mainLayers[index + 1];
//         syncMarkerToOutPoint(transitions[i], nextLayer);
//     }
// }
// function syncAllLayersThatHaveSound(allLayersThatHaveSound, introLayer) {
//     //snap to workAreaStart
//     syncInPointToOutPoint(allLayersThatHaveSound[0], introLayer, 0);
//     for (var i = 1; i < allLayersThatHaveSound.length; i++) {
//         //we start at 1 cause first layer snapped to begining
//         var current = allLayersThatHaveSound[i];
//         var prior = allLayersThatHaveSound[i - 1];
//         syncInPointToOutPoint(current, prior, 0);
//     }
// }
// function locateMarkerIndex(marker, name) {
//     /*
//         search for marker by name and return index
//     */
//     var numMarkers = marker.numKeys;
//     for (var i = 1; i <= numMarkers; i++) {
//         if (marker.keyValue(i).comment == name) {
//             return i;
//         }
//     }
//     return -1;
// }
// function getMarkerStartGap(layer, marker, markerIndex) {
//     var markerTime = marker.keyTime(markerIndex);
//     var gap = markerTime - layer.startTime;
//     return gap;
// }
