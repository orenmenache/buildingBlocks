type AEItemTypeName = 'Folder' | 'Composition' | 'Footage';

const GET = {
    /**
     * Get single Item
     */
    BY: {
        NAME: {
            inArray<T extends _ItemClasses | Layer>(
                array: T[],
                name: string
            ): T | false {
                for (let item of array) {
                    if (item.name === name) {
                        return item as T;
                    }
                }
                return false;
            },
            inArray_TOF<T extends _ItemClasses | Layer>(
                array: T[],
                name: string
            ): T {
                for (let item of array) {
                    if (item.name === name) {
                        return item as T;
                    }
                }
                throw new Error(
                    `GET.BY.NAME.inArray_TOF: Couldn't find name: ${name}`
                );
            },
            /**
             * This version returns false when name cannot be found
             * @param collection
             * @param name
             * @returns
             */
            inCollection<T>(
                collection: ItemCollection | LayerCollection,
                name: string
            ): T | false {
                for (let i = 1; i <= collection.length; i++) {
                    let item: _ItemClasses | Layer = collection[i];
                    if (item.name === name) {
                        return item as T;
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
            inCollection_TOF<T>(
                collection: ItemCollection | LayerCollection,
                name: string
            ): T {
                for (let i = 1; i <= collection.length; i++) {
                    let item = collection[i];
                    // alert(item.name);

                    if (item.name === name) {
                        return item as T;
                    }
                }
                throw new Error(
                    `GET.BY.NAME.inCollection_TOF: Couldn't find name: ${name}`
                );
            },
        },
        TYPE: {
            inArray<T extends _ItemClasses>(
                arr: T[],
                itemTypeName: AEItemTypeName
            ): T[] {
                let resArr: T[] = [];
                for (let item of arr) {
                    if (item.typeName === itemTypeName) {
                        resArr.push(item as T);
                    }
                }
                return resArr;
            },
            inItemCollection<T extends _ItemClasses>(
                collection: ItemCollection,
                itemTypeName: AEItemTypeName
            ): T[] {
                let resArr: T[] = [];
                for (let i = 1; i <= collection.length; i++) {
                    let item = collection[i];
                    if (item.typeName === itemTypeName) {
                        resArr.push(item as T);
                    }
                }
                return resArr;
            },
        },
    },
    /**
     * Get all items
     */
    ALL: {
        compItems(proj: Project): CompItem[] {
            return GET.BY.TYPE.inItemCollection<CompItem>(
                proj.items,
                'Composition'
            );
        },
        folderItems(proj: Project): FolderItem[] {
            return GET.BY.TYPE.inItemCollection<FolderItem>(
                proj.items,
                'Folder'
            );
        },
        footageItems(proj: Project): FootageItem[] {
            return GET.BY.TYPE.inItemCollection<FootageItem>(
                proj.items,
                'Footage'
            );
        },
        AVLayers(comp: CompItem): AVLayer[] {
            const layers: LayerCollection = comp.layers;
            let avLayers: AVLayer[] = [];
            for (let i = 1; i <= layers.length; i++) {
                let layer = layers[i] as AVLayer;
                if (IS.avLayer(layer)) {
                    avLayers.push(layer);
                }
            }
            return avLayers;
        },
        TextLayers(comp: CompItem): TextLayer[] {
            const layers: LayerCollection = comp.layers;
            let textLayers: TextLayer[] = [];
            for (let i = 1; i <= layers.length; i++) {
                let layer = layers[i] as TextLayer;
                if (IS.avLayer(layer)) {
                    textLayers.push(layer);
                }
            }
            return textLayers;
        },
    },
    TEXT: {
        fromFile_TOF(file: File): string {
            try {
                file.encoding = 'utf-8';
                file.open('r');
                const content = file.read();
                file.close();
                return content;
            } catch (e: any) {
                throw new Error(`Get text from file failed: ${e.message}`);
            }
        },
        fromPath_TOF(path: string): string {
            try {
                const file = File(path);
                if (!file.exists) throw new Error(`File ${path} doesn't exist`);
                file.encoding = 'utf-8';
                file.open('r');
                const content = file.read();
                file.close();
                return content;
            } catch (e: any) {
                throw new Error(`Get text from file failed: ${e.message}`);
            }
        },
    },
    TEXTLAYER: {
        postition(layer: TextLayer): number[] {
            return layer.position.value as number[];
        },
        anchorPoint(layer: TextLayer): number[] {
            return layer.anchorPoint.value as number[];
        },
        topRightCorner(layer: TextLayer): number[] {
            const layerPos = this.postition(layer);
            const layerAnp = this.anchorPoint(layer);
            const x = layerPos[0] - layerAnp[0];
            const y = layerPos[1] - layer.height - layerAnp[1];
            return [x, y];
        },
    },
    FILES: {
        BY: {
            Type(folder: Folder, extension: string) {
                const files: (File | Folder)[] = folder.getFiles();
                let filtered: File[] = [];
                for (let file of files) {
                    if (file.name.indexOf(extension) > -1) {
                        filtered.push(file as File);
                    }
                }
                return filtered;
            },
        },
    },
    COMP: {
        ratio(comp: CompItem): number {
            const compW = comp.width; // * comp.pixelAspect;
            const compH = comp.height; // * comp.pixelAspect;
            return compH / compW;
        },
    },
    AVLAYER: {
        ratio(layer: AVLayer): number {
            const layerW = layer.width;
            const layerH = layer.height;
            return layerH / layerW;
        },
    },
    MARKER: {
        indexByName(layer: AVLayer, name: string): number {
            const marker = layer.marker;
            const numMarkers = marker.numKeys;
            if (!HAS.markers(layer)) return -1;
            for (let i = 1; i <= numMarkers; i++) {
                if (marker.keyValue(i).comment === name) {
                    return i;
                }
            }
            return -1;
        },
        time(layer: AVLayer, markerIndex: number = 1) {
            const marker = layer.marker;
            const numMarkers = marker.numKeys;
            if (!HAS.markers(layer)) return -1;
            return marker.keyTime(markerIndex);
        },
        timeByName(layer: AVLayer, name: string) {
            const markerIndex = this.indexByName(layer, name);
            if (markerIndex === -1) return -1;
            return this.time(layer, markerIndex);
        },
        timeByName_TOF(layer: AVLayer, name: string): number {
            try {
                const markerIndex = this.indexByName(layer, name);
                if (markerIndex === -1)
                    throw new Error(`No marker named ${name} in layer`);
                const time = this.time(layer, markerIndex);
                if (time === -1) throw new Error(`Couldn't get layerTime`);
                return time;
            } catch (e: any) {
                throw new Error(
                    `GET.MARKER.timeByName_TOF:\nLayerName: ${layer.name}\nError: ${e.message}`
                );
            }
        },
        firstTime_TOF(layer: AVLayer) {
            try {
                const time = this.time(layer, 1);
                if (time === -1) throw new Error(`No markers`);
                return time;
            } catch (e: any) {
                throw new Error(`GET.MARKER.firstTime_TOF: ${e.message}`);
            }
        },
    },
};
