class ProjectHandler {
    items: ItemCollection;
    comps: CompItem[];
    folders: FolderItem[];
    footage: FootageItem[];
    constructor(proj: Project) {
        this.items = proj.items;
        this.comps = GET.ALL.compItems(proj);
        this.folders = GET.ALL.folderItems(proj);
        this.footage = GET.ALL.footageItems(proj);
    }
}
