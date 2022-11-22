"use strict";
/**
 * Here we'll be handling files and folders
 * as well as writing and reading file contents
 */
var FS = {
    getFolder_TOF: function (folderPath) {
        try {
            var folder = Folder(folderPath);
            if (!folder.exists)
                throw new Error("Folder: " + folderPath + " doesn't exist");
            return folder;
        }
        catch (e) {
            throw new Error("getFolder_TOF: " + e.message);
        }
    },
    getFile_TOF: function (filePath) {
        try {
            var file = File(filePath);
            if (!file.exists)
                throw new Error("File: " + filePath + " doesn't exist");
            return file;
        }
        catch (e) {
            throw new Error("getFile_TOF: " + e.message);
        }
    },
    createFolderIfNotExist: function (folderPath) {
        var folder = Folder(folderPath);
        if (!folder.exists)
            folder.create();
        return folder;
    },
    readFile: function (filePath) {
        try {
            var file = this.getFile_TOF(filePath);
            file.open('r');
            var content = file.read();
            file.close();
            return content;
        }
        catch (e) {
            throw new Error("readFile: " + e.message);
        }
    },
    writeFile: function (filePath, content) {
        try {
            var file = File(filePath);
            if (!file.exists)
                file = new File(filePath);
            file.open('w');
            file.write(content);
            file.close();
        }
        catch (e) {
            throw new Error("writeFile failed for: " + filePath);
        }
    },
    /**
     * Gets files recursively
     * Excludes given fileNames
     * @param folderPath
     * @param fileType
     * @returns
     */
    getFilesByType_TOF: function (folderPath, fileType, excludeFileNames) {
        if (excludeFileNames === void 0) { excludeFileNames = []; }
        try {
            var folder = Folder(folderPath);
            if (!folder.exists)
                throw new Error("Folder: " + folder.path + "/" + folder.name + " doesn't exist");
            var files = this.getFilesRecursively(folder);
            var filesByType = [];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (file.name.indexOf(fileType) > -1 && file instanceof File) {
                    if (this.isIncludedFile(file.name, excludeFileNames))
                        filesByType.push(file);
                }
            }
            return filesByType;
        }
        catch (e) {
            throw new Error("getFilesByType_TOF: " + e.message);
        }
    },
    /**
     * get all files recursively
     * @param folder
     * @returns
     */
    getFilesRecursively: function (folder) {
        var files = folder.getFiles();
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var file = files_2[_i];
            if (file instanceof Folder) {
                files = files.concat(this.getFilesRecursively(file));
            }
        }
        return files;
    },
    isIncludedFile: function (fileName, excludeFiles) {
        for (var _i = 0, excludeFiles_1 = excludeFiles; _i < excludeFiles_1.length; _i++) {
            var excludeFile = excludeFiles_1[_i];
            if (fileName.indexOf(excludeFile) > -1) {
                return false;
            }
        }
        return true;
    }
};
