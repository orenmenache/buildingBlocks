class ProjectHandler {
    items: ItemCollection;
    comps: CompItem[];
    folders: FolderItem[];
    footage: FootageItem[];
    name: string;
    constructor(proj: Project) {
        this.name = proj.file!.name;
        this.items = proj.items;
        this.comps = GET.ALL.ITEMS.comps(proj);
        this.folders = GET.ALL.ITEMS.folders(proj);
        this.footage = GET.ALL.ITEMS.footage(proj);
    }
}
