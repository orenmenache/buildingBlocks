const SYNC = {
    /**
     * moves layerA based on first marker to layerB marker position    
     * @param layerA layer to be moved by marker
     * @param layerB layer containing first marker to which layerA is to be moved
     */
    singleMarkers(layerA: AVLayer,layerB: AVLayer){
        try {
            if (!layerA){ throw(`layerA undefined`)}
            if (!layerB){ throw(`layerB undefined`)}
            const layerAMarker: MarkerValueProperty = layerA.marker;
            const layerBMarker: MarkerValueProperty = layerB.marker;
            if (!layerAMarker){throw(`layerAMarker undefined`)}
            if (!layerBMarker){throw(`layerBMarker undefined`)}
            //const markerATime = layerAMarker.keyTime(1);
            const markerBTime = layerBMarker.keyTime(1);
            const gap = GET.MARKER.startGap(layerA,layerAMarker,1);
            layerA.startTime = markerBTime-gap;
        } catch (e) {
            alert(`Failed @ syncSingleMarkers, BREAKING: ${e}`)
        }
    },
    /**
     * syncs LayerA by first marker 
     * with the outPoint of layerB
     * @param layerA 
     * @param layerB 
     */
    markerToOutPoint(layerA: AVLayer,layerB: AVLayer){
        var marker = layerA.marker;
        var gap = GET.MARKER.startGap(layerA,marker,1);
        var syncPoint = layerB.outPoint - gap;
        layerA.startTime = syncPoint;
    },
    transitionsToTheirNextLayer(mainLayers: LayerCollection,transitions: any[]){
        for (let transition of transitions){
            var index = transition.index;
            var nextLayer = mainLayers[index+1] as AVLayer;
            this.markerToOutPoint(transition,nextLayer);
        }
    },
    /**
     * syncs layerA's inPoint with layerB's outPoint
     * @param layerA 
     * @param layerB 
     * @param padding 
     */
    inPointToOutPoint(layerA: AVLayer,layerB: AVLayer,padding: number){
        layerA.startTime = layerB.outPoint-(layerA.inPoint-layerA.startTime)+padding;
    },
    /**
     * Delete marker # 2 and beyond
     * Create new markers with the same names (comments)
     * And position them at the end of the previous soundLayer
     * @param markerLayer 
     * @param soundLayers 
     * @returns 
     */
    reLocateMarkers(markerLayer: AVLayer,soundLayers: AVLayer[]){
        //alert(markerLayer);
    
        //relocate markers in compLayer labelled 1
        const markerNumKeys = markerLayer.marker.numKeys; // = the number of soundLayers
        let markerComments = [];
        let markerTimes = [0];
        let markerKeyValue: MarkerValue;
        
        /**
         * Marker # 1 stays static
         * Hence we select marker # 2 and beyond
         */
        for (var j = 1; j < markerNumKeys; j++){
            markerKeyValue = markerLayer.marker.keyValue(j+1); //next marker
            markerComments.push(markerKeyValue.comment);
        }
        
        /**
         * Delete all markers except the first one
         */
        for (var j=1; j<markerNumKeys; j++){
            markerLayer.marker.removeKey(2);
        }
        
        /**
         * Now we remake the markers
         */
        for (var j=1; j<markerNumKeys; j++){
            var newMarker = new MarkerValue(markerComments[j-1]); // creates new marker object   
            var newMarkerTime = soundLayers[j-1].outPoint;
            markerTimes.push(newMarkerTime);
            markerLayer.marker.setValueAtTime(newMarkerTime,newMarker);
        }
        return markerTimes;
    }
}