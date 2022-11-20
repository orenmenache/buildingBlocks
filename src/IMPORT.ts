const IMPORT = {
    fromPath_TOF(filePath: string, importBin: FolderItem): _ItemClasses {
        try {
            const file = File(filePath);
            if (!file.exists) throw new Error(`File ${filePath} doesn't exist`);
            const importOptions = new ImportOptions(file);
            const importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        } catch (e: any) {
            throw new Error(`IMPORT.fromPath_TOF: ${e.message}`);
        }
    },
    fromFile_TOF(file: File, importBin: FolderItem) {
        try {
            if (!file.exists)
                throw new Error(`File ${file.name} doesn't exist`);
            const importOptions = new ImportOptions(file);
            const importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        } catch (e: any) {
            throw new Error(`IMPORT.fromFile_TOF: ${e.message}`);
        }
    },
};
