"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ProjectHandlerExtended = /** @class */ (function (_super) {
    __extends(ProjectHandlerExtended, _super);
    function ProjectHandlerExtended(proj) {
        var _this = _super.call(this, proj) || this;
        _this.layers = GET.ALL.LAYERS.inAllComps(_this.comps);
        _this.layersByType = {
            AV: [],
            Comp: [],
            Text: []
        };
        _this.sortLayersByType();
        return _this;
    }
    ProjectHandlerExtended.prototype.sortLayersByType = function () {
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (IS.compLayer(layer))
                this.layersByType.Comp.push(layer);
            if (IS.avLayer(layer))
                this.layersByType.AV.push(layer);
            if (IS.textLayer(layer))
                this.layersByType.Text.push(layer);
        }
    };
    return ProjectHandlerExtended;
}(ProjectHandler));
