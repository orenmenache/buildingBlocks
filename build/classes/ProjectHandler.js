"use strict";
var ProjectHandler = /** @class */ (function () {
    function ProjectHandler(proj) {
        this.items = proj.items;
        this.comps = GET.ALL.compItems(proj);
        this.folders = GET.ALL.folderItems(proj);
        this.footage = GET.ALL.footageItems(proj);
    }
    return ProjectHandler;
}());
