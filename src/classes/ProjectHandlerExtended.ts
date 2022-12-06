class ProjectHandlerExtended extends ProjectHandler {
    layers: Layer[];
    layersByType: { AV: AVLayer[]; Comp: AVLayer[]; Text: TextLayer[] };
    constructor(proj: Project) {
        super(proj);
        this.layers = GET.ALL.LAYERS.inAllComps(this.comps);
        this.layersByType = {
            AV: [],
            Comp: [],
            Text: [],
        };
        this.sortLayersByType();
    }
    sortLayersByType() {
        for (let layer of this.layers) {
            if (IS.compLayer(layer as AVLayer))
                this.layersByType.Comp.push(layer as AVLayer);
            if (IS.avLayer(layer as AVLayer))
                this.layersByType.AV.push(layer as AVLayer);
            if (IS.textLayer(layer as TextLayer))
                this.layersByType.Text.push(layer as TextLayer);
        }
    }
}
