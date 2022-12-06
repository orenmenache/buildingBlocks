"use strict";
var ProjectHandler = /** @class */ (function () {
    function ProjectHandler(proj) {
        this.items = proj.items;
        this.comps = GET.ALL.ITEMS.comps(proj);
        this.folders = GET.ALL.ITEMS.folders(proj);
        this.footage = GET.ALL.ITEMS.footage(proj);
        this.layers = GET.ALL.LAYERS.inAllComps(this.comps);
        this.layersByTypes = {
            AV: [],
            Comp: [],
            Text: []
        };
    }
    ProjectHandler.prototype.sortLayersByTypes = function () {
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (IS.compLayer(layer))
                this.layersByTypes.Comp.push(layer);
        }
    };
    return ProjectHandler;
}());
