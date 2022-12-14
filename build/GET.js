"use strict";
var GET = {
    /**
     * Get single Item
     */
    BY: {
        NAME: {
            inArray: function (array, name) {
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var item = array_1[_i];
                    if (item.name === name) {
                        return item;
                    }
                }
                return false;
            },
            inArray_TOF: function (array, name) {
                for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
                    var item = array_2[_i];
                    if (item.name === name) {
                        return item;
                    }
                }
                throw new Error("GET.BY.NAME.inArray_TOF: Couldn't find name: " + name);
            },
            /**
             * This version returns false when name cannot be found
             * @param collection
             * @param name
             * @returns
             */
            inCollection: function (collection, name) {
                for (var i = 1; i <= collection.length; i++) {
                    var item = collection[i];
                    if (item.name === name) {
                        return item;
                    }
                }
                return false;
            },
            /**
             * This version throws an error when name cannot be found
             * TOF = throw on fail
             * @param collection
             * @param name
             * @returns
             */
            inCollection_TOF: function (collection, name) {
                for (var i = 1; i <= collection.length; i++) {
                    var item = collection[i];
                    // alert(item.name);
                    if (item.name === name) {
                        return item;
                    }
                }
                throw new Error("GET.BY.NAME.inCollection_TOF: Couldn't find name: " + name);
            }
        },
        TYPE: {
            inArray: function (arr, itemTypeName) {
                var resArr = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var item = arr_1[_i];
                    if (item.typeName === itemTypeName) {
                        resArr.push(item);
                    }
                }
                return resArr;
            },
            inItemCollection: function (collection, itemTypeName) {
                var resArr = [];
                for (var i = 1; i <= collection.length; i++) {
                    var item = collection[i];
                    if (item.typeName === itemTypeName) {
                        resArr.push(item);
                    }
                }
                return resArr;
            }
        },
        LABEL: {
            inCollection_TOF: function (collection, labelNum) {
                try {
                    var filtered = [];
                    for (var i = 1; i <= collection.length; i++) {
                        var layer = collection[i];
                        if (layer.label === labelNum)
                            filtered.push(layer);
                    }
                    return filtered;
                }
                catch (e) {
                    throw new Error("GET.BY.label.inCollection_TOF: " + e.message + "\nLine: " + e.line);
                }
            },
            inArray_TOF: function (layerArr, labelNum) {
                try {
                    var filtered = [];
                    for (var _i = 0, layerArr_1 = layerArr; _i < layerArr_1.length; _i++) {
                        var layer = layerArr_1[_i];
                        if (layer.label === labelNum)
                            filtered.push(layer);
                    }
                    return filtered;
                }
                catch (e) {
                    throw new Error("GET.BY.label.inArray_TOF: " + e.message + "\nLine: " + e.line);
                }
            }
        }
    },
    /**
     * Get all items
     */
    ALL: {
        ITEMS: {
            comps: function (proj) {
                return GET.BY.TYPE.inItemCollection(proj.items, 'Composition');
            },
            folders: function (proj) {
                return GET.BY.TYPE.inItemCollection(proj.items, 'Folder');
            },
            footage: function (proj) {
                return GET.BY.TYPE.inItemCollection(proj.items, 'Footage');
            }
        },
        LAYERS: {
            inAllComps: function (comps) {
                var allLayers = [];
                for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                    var comp = comps_1[_i];
                    var layers = comp.layers;
                    for (var i = 1; i <= layers.length; i++) {
                        allLayers.push(layers[i]);
                    }
                }
                return allLayers;
            },
            AV: function (comp) {
                var layers = comp.layers;
                var avLayers = [];
                for (var i = 1; i <= layers.length; i++) {
                    var layer = layers[i];
                    if (IS.avLayer(layer)) {
                        avLayers.push(layer);
                    }
                }
                return avLayers;
            },
            Comp: function (comp) {
                var layers = comp.layers;
                var compLayers = [];
                for (var i = 1; i <= layers.length; i++) {
                    var layer = layers[i];
                    if (IS.compLayer(layer)) {
                        compLayers.push(layer);
                    }
                }
                return compLayers;
            },
            Text: function (comp) {
                var layers = comp.layers;
                var textLayers = [];
                for (var i = 1; i <= layers.length; i++) {
                    var layer = layers[i];
                    if (IS.avLayer(layer)) {
                        textLayers.push(layer);
                    }
                }
                return textLayers;
            },
            /**
             * get all layers recursively in a composition by
             * the three main types: Comp, AV, Text
             * @param comp
             */
            byTypeRec_TOF: function (comp) {
                try {
                    var layersByType = {
                        Comp: this.CompRec_TOF(comp),
                        AV: [],
                        Text: []
                    };
                    for (var _i = 0, _a = layersByType.Comp; _i < _a.length; _i++) {
                        var compLayer = _a[_i];
                        var comp_1 = compLayer.source;
                        layersByType.AV = layersByType.AV.concat(GET.ALL.LAYERS.AV(comp_1));
                        layersByType.Text = layersByType.Text.concat(GET.ALL.LAYERS.Text(comp_1));
                    }
                }
                catch (e) {
                    throw new Error("byTypeRec_TOF: " + e);
                }
            },
            /**
             * get all compLayers recursively in a composition
             * @param comp
             */
            CompRec_TOF: function (comp) {
                try {
                    var comps = [];
                    for (var i = 1; i <= comp.layers.length; i++) {
                        var layer = comp.layers[i];
                        if (IS.compLayer(layer)) {
                            comps.push(layer);
                            comps = comps.concat(this.CompRec_TOF(layer.source));
                        }
                    }
                    return comps;
                }
                catch (e) {
                    throw new Error("CompRec_TOF: " + e);
                }
            }
        }
    },
    TEXT: {
        fromFile_TOF: function (file) {
            try {
                file.encoding = 'utf-8';
                file.open('r');
                var content = file.read();
                file.close();
                return content;
            }
            catch (e) {
                throw new Error("Get text from file failed: " + e.message);
            }
        },
        fromPath_TOF: function (path) {
            try {
                var file = File(path);
                if (!file.exists)
                    throw new Error("File " + path + " doesn't exist");
                file.encoding = 'utf-8';
                file.open('r');
                var content = file.read();
                file.close();
                return content;
            }
            catch (e) {
                throw new Error("Get text from file failed: " + e.message);
            }
        }
    },
    TEXTLAYER: {
        postition: function (layer) {
            return layer.position.value;
        },
        anchorPoint: function (layer) {
            return layer.anchorPoint.value;
        },
        topRightCorner: function (layer) {
            var layerPos = this.postition(layer);
            var layerAnp = this.anchorPoint(layer);
            var x = layerPos[0] - layerAnp[0];
            var y = layerPos[1] - layer.height - layerAnp[1];
            return [x, y];
        }
    },
    FILES: {
        BY: {
            Type: function (folder, extension) {
                var files = folder.getFiles();
                var filtered = [];
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    if (file.name.indexOf(extension) > -1) {
                        filtered.push(file);
                    }
                }
                return filtered;
            }
        }
    },
    COMP: {
        ratio: function (comp) {
            var compW = comp.width; // * comp.pixelAspect;
            var compH = comp.height; // * comp.pixelAspect;
            return compH / compW;
        }
    },
    AVLAYER: {
        ratio: function (layer) {
            var layerW = layer.width;
            var layerH = layer.height;
            return layerH / layerW;
        }
    },
    MARKER: {
        indexByName: function (layer, name) {
            var marker = layer.marker;
            var numMarkers = marker.numKeys;
            if (!HAS.markers(layer))
                return -1;
            for (var i = 1; i <= numMarkers; i++) {
                if (marker.keyValue(i).comment === name) {
                    return i;
                }
            }
            return -1;
        },
        time: function (layer, markerIndex) {
            if (markerIndex === void 0) { markerIndex = 1; }
            var marker = layer.marker;
            var numMarkers = marker.numKeys;
            if (!HAS.markers(layer))
                return -1;
            return marker.keyTime(markerIndex);
        },
        timeByName: function (layer, name) {
            var markerIndex = this.indexByName(layer, name);
            if (markerIndex === -1)
                return -1;
            return this.time(layer, markerIndex);
        },
        timeByName_TOF: function (layer, name) {
            try {
                var markerIndex = this.indexByName(layer, name);
                if (markerIndex === -1)
                    throw new Error("No marker named " + name + " in layer");
                var time = this.time(layer, markerIndex);
                if (time === -1)
                    throw new Error("Couldn't get layerTime");
                return time;
            }
            catch (e) {
                throw new Error("GET.MARKER.timeByName_TOF:\nLayerName: " + layer.name + "\nError: " + e.message);
            }
        },
        firstTime_TOF: function (layer) {
            try {
                var time = this.time(layer, 1);
                if (time === -1)
                    throw new Error("No markers");
                return time;
            }
            catch (e) {
                throw new Error("GET.MARKER.firstTime_TOF: " + e.message);
            }
        }
    }
};
