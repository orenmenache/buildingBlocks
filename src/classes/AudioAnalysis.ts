class AudioAnalysis {
    containingComp: CompItem;
    in: number;
    out: number;
    inPointGap: number;
    markerTimesByIndex: { [key: number]: number };
    markerTimesByName: { [key: string]: number };
    constructor(public layer: AVLayer, public threshold: number = 1) {
        this.containingComp = layer.containingComp;
        [this.in, this.out] = this.getThreshInOut();
        this.inPointGap = this.getStartToInpointGap();
        this.markerTimesByIndex = {};
        this.markerTimesByName = {};
        this.getMarkerTimes();
    }
    /**
     * returns the time locations where the audio of layer within containingComp
     * goes over (inPoint) and under (outPoint) the threshold
     */
    getThreshInOut(): [number, number] {
        this.containingComp.openInViewer();
        try {
            this.layer.solo = true;
            app.executeCommand(
                app.findMenuCommandId('Convert Audio to Keyframes')
            ); //creates new layer
            const audioAnalLayer = this.containingComp.layer(1) as any; // Audio Amplitude
            const audioAnalEffect =
                audioAnalLayer.effect('Both Channels')('Slider');
            const threshIn = this.getIn(audioAnalEffect);
            const threshOut = this.getOut(audioAnalEffect);

            const audioAnalLayerSource: FootageItem = audioAnalLayer.source;
            audioAnalLayer.remove();
            audioAnalLayerSource.remove();
            this.layer.solo = false;

            return [threshIn, threshOut];
        } catch (e: any) {
            throw new Error(
                `Error in AudioLayer.analyze. LayerName: ${this.layer.name}\nError: ${e.message}`
            );
        }
    }
    private getIn(audioAnalEffect: any): number {
        for (let i = 1; i <= audioAnalEffect.numKeys; i++) {
            if (audioAnalEffect.keyValue(i) > this.threshold) {
                return audioAnalEffect.keyTime(i);
            }
        }
        return -1;
    }
    private getOut(audioAnalEffect: any): number {
        const end = audioAnalEffect.numKeys;
        for (let i = end; i > 0; i--) {
            if (audioAnalEffect.keyValue(i) > this.threshold) {
                let out = audioAnalEffect.keyTime(i);
                return out;
            }
        }
        return -1;
    }
    /**
     * If inPoint is different than startTime get the gap
     */
    private getStartToInpointGap(): number {
        return this.layer.inPoint - this.layer.startTime;
    }
    /**
     * Grab all markers in layer
     * and map by index and name
     */
    private getMarkerTimes(): void {
        try {
            const marker: MarkerValueProperty = this.layer.marker;
            const numMarkers = marker.numKeys;
            // if has no markers just return
            if (numMarkers === 0) return;
            for (let i = 1; i <= numMarkers; i++) {
                let time = marker.keyTime(i);
                let markerName = marker.keyValue(i).comment;
                this.markerTimesByIndex[i] = time;
                if (markerName !== '') {
                    this.markerTimesByName[markerName] = time;
                }
            }
        } catch (e: any) {
            throw new Error(
                `AudioLayerHandler.mapMarkersByName\nLayerName: ${this.layer.name}`
            );
        }
    }
    getMaxOutPoint() {}
    /**
     * Addition
     * 01/12/22
     */
    trim(padding: any) {
        this.setIn(padding.inn);
        this.setOut(padding.out);
    }
    private setIn(pad: number = 0) {
        const paddedIn = this.in - pad;
        if (pad < 0) {
            pad = 0;
        }
        this.layer.inPoint = pad;
    }
    private setOut(pad: number = 0) {
        const paddedOut = this.out + pad;
        this.layer.outPoint = paddedOut;
    }
}

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
