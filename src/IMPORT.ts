const IMPORT = {
    fromPath(filePath: string, importBin: FolderItem) {
        try {
            const file = File(filePath);
            if (!file.exists) throw new Error(`File ${filePath} doesn't exist`);
            const importOptions = new ImportOptions(file);
            const importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        } catch (e: any) {
            throw new Error(`Failed to import single file: ${e.message}`);
        }
    },
    fromFile(file: File, importBin: FolderItem) {
        try {
            if (!file.exists)
                throw new Error(`File ${file.name} doesn't exist`);
            const importOptions = new ImportOptions(file);
            const importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        } catch (e: any) {
            throw new Error(`Failed to import single file: ${e.message}`);
        }
    },
};
