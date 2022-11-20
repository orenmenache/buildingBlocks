"use strict";
var IMPORT = {
    fromPath_TOF: function (filePath, importBin) {
        try {
            var file = File(filePath);
            if (!file.exists)
                throw new Error("File " + filePath + " doesn't exist");
            var importOptions = new ImportOptions(file);
            var importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        }
        catch (e) {
            throw new Error("IMPORT.fromPath_TOF: " + e.message);
        }
    },
    fromFile_TOF: function (file, importBin) {
        try {
            if (!file.exists)
                throw new Error("File " + file.name + " doesn't exist");
            var importOptions = new ImportOptions(file);
            var importedFile = app.project.importFile(importOptions);
            importedFile.parentFolder = importBin;
            return importedFile;
        }
        catch (e) {
            throw new Error("IMPORT.fromFile_TOF: " + e.message);
        }
    }
};
