const IS = {
    compLayer(layer: AVLayer): boolean {
        if (!layer.hasOwnProperty('source')) return false;
        return layer.source == '[object CompItem]';
    },
    avLayer(layer: AVLayer): boolean {
        if (!layer.hasOwnProperty('source')) return false;
        return layer.source == '[object FootageItem]';
    },
    cameraLayer(layer: AVLayer): boolean {
        return layer.toString() == '[object CameraLayer]';
    },
    textLayer(layer: AVLayer): boolean {
        return layer.toString() == '[object TextLayer]';
    },
};
