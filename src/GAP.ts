const GAP = {
    inPointToStartTime(layer: AVLayer) {
        return layer.inPoint - layer.startTime;
    },
    inPointToTime(layer: AVLayer, time: number) {
        return time - layer.inPoint;
    },
    startTimeToTime(layer: AVLayer, time: number) {
        return time - layer.startTime;
    },
    firstMarkerToStartTime(layer: AVLayer) {},
    markerToStartTime_TOF(layer: AVLayer, markerName: string) {
        try {
            const time: number = GET.MARKER.timeByName_TOF(layer, markerName);
            return time - layer.startTime;
        } catch (e: any) {
            throw new Error(`GAP.markerToStartTime_TOF: ${e.message}`);
        }
    },
    // markerToInPoint() {},
};
