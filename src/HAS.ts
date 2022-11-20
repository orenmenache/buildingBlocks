const HAS = {
    markers(layer: AVLayer): boolean {
        try {
            const marker: MarkerValueProperty = layer.marker;
            return marker.numKeys > 0;
        } catch (e: any) {
            throw new Error(`HAS.markers\nLayerName: ${layer.name}`);
        }
    },
};
