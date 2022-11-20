const RESIZE = {
    COMP: {
        toTextLayerWidth(
            comp: CompItem,
            textLayer: TextLayer,
            padding: number = 0
        ) {
            try {
                if (padding < 0) throw new Error(`Padding smaller than 0`);
                const sr = textLayer.sourceRectAtTime(0, false);
                const w = sr.width;
                comp.width = Math.round(w + padding * 2);
            } catch (e: any) {
                throw new Error(
                    `resize comp toTextLayerWidth failed: ${e.message}`
                );
            }
        },
        toTextLayerHeight(
            comp: CompItem,
            textLayer: TextLayer,
            padding: number = 0
        ) {
            try {
                if (padding < 0) throw new Error(`Padding smaller than 0`);
                const sr = textLayer.sourceRectAtTime(0, false);
                const h = sr.height;
                comp.height = Math.round(h + padding * 2);
            } catch (e: any) {
                throw new Error(
                    `resize comp toTextLayerHeight failed: ${e.message}`
                );
            }
        },
        /**
         * This is required in a case where
         * the comp contains several items
         * which are anchored to the comp's left border
         * so we resize be the rightmost textLayer's position
         * @param comp
         * @param textLayer
         * @param padding
         */
        toRightLayerRightBorder(
            comp: CompItem,
            textLayer: TextLayer,
            padding: number = 0
        ) {
            try {
                if (padding < 0) throw new Error(`Padding smaller than 0`);
                const sr = textLayer.sourceRectAtTime(0, false);
                const w = sr.height;
                comp.height = Math.round(w + padding * 2);
            } catch (e: any) {
                throw new Error(
                    `resize comp toRightLayerRightBorder failed: ${e.message}`
                );
            }
        },
    },
    AVLAYER: {
        toCompWidth(layer: AVLayer, comp: CompItem) {
            try {
                const scaleValue = 100 * (comp.width / layer.width);
                const layerProp = layer.property('Scale');
                if (!(layerProp instanceof Property))
                    throw new Error(`layerProp is not a prop`);
                layerProp.setValue([scaleValue, scaleValue]);
            } catch (e: any) {
                throw new Error(`resize toCompWidth failed: ${e.message}`);
            }
        },
        toCompHeight(layer: AVLayer, comp: CompItem) {
            try {
                const scaleValue = 100 * (comp.height / layer.height);
                const layerProp = layer.property('Scale');
                if (!(layerProp instanceof Property))
                    throw new Error(`layerProp is not a prop`);
                layerProp.setValue([scaleValue, scaleValue]);
            } catch (e: any) {
                throw new Error(`resize toCompWidth failed: ${e.message}`);
            }
        },
        fitToComp(layer: AVLayer, comp: CompItem) {
            try {
                //0.5625 for Full HD 1920x1080
                const compRatio: number = GET.COMP.ratio(comp);

                if (
                    layer.height !== comp.height ||
                    layer.width !== comp.width
                ) {
                    const layerRatio = GET.AVLAYER.ratio(layer);
                    let scaleValue: number;

                    if (layerRatio >= compRatio) {
                        //alert('bigger, resizing by width');
                        RESIZE.AVLAYER.toCompWidth(layer, comp);
                    } else {
                        //alert('smaller, adjusting by height');
                        RESIZE.AVLAYER.toCompHeight(layer, comp);
                    }
                }
            } catch (e: any) {
                throw new Error(`fitToComp failed: ${e.message}`);
            }
        },
    },
};
