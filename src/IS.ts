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
    legitFileName(fileName: string, fileTypes: string[]) {
        for (let fileType of fileTypes) {
            if (fileName.toLowerCase().indexOf(fileType) > -1) return true;
        }
        return false;
    },
};
