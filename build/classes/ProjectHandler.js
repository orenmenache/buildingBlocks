"use strict";
var ProjectHandler = /** @class */ (function () {
    function ProjectHandler(proj) {
        this.name = proj.file.name;
        this.items = proj.items;
        this.comps = GET.ALL.ITEMS.comps(proj);
        this.folders = GET.ALL.ITEMS.folders(proj);
        this.footage = GET.ALL.ITEMS.footage(proj);
    }
    return ProjectHandler;
}());
