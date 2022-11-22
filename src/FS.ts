/**
 * Here we'll be handling files and folders
 * as well as writing and reading file contents
 */

const FS = {
    getFolder_TOF(folderPath: string): Folder {
        try {
            let folder = Folder(folderPath);
            if (!folder.exists)
                throw new Error(`Folder: ${folderPath} doesn't exist`);
            return folder;
        } catch (e: any) {
            throw new Error(`getFolder_TOF: ${e.message}`);
        }
    },
    getFile_TOF(filePath: string): File {
        try {
            let file = File(filePath);
            if (!file.exists)
                throw new Error(`File: ${filePath} doesn't exist`);
            return file;
        } catch (e: any) {
            throw new Error(`getFile_TOF: ${e.message}`);
        }
    },
    createFolderIfNotExist(folderPath: string): Folder {
        const folder = Folder(folderPath);
        if (!folder.exists) folder.create();
        return folder;
    },
    readFile(filePath: string): string {
        try {
            const file = this.getFile_TOF(filePath);
            file.open('r');
            const content = file.read();
            file.close();
            return content;
        } catch (e: any) {
            throw new Error(`readFile: ${e.message}`);
        }
    },
    writeFile(filePath: string, content: string) {
        try {
            let file = File(filePath);
            if (!file.exists) file = new File(filePath);
            file.open('w');
            file.write(content);
            file.close();
        } catch (e: any) {
            throw new Error(`writeFile failed for: ${filePath}`);
        }
    },
    /**
     * Gets files recursively
     * Excludes given fileNames
     * @param folderPath
     * @param fileType
     * @returns
     */
    getFilesByType_TOF(
        folderPath: string,
        fileType: string,
        excludeFileNames: string[] = []
    ): File[] {
        try {
            const folder = Folder(folderPath);
            if (!folder.exists)
                throw new Error(
                    `Folder: ${folder.path}/${folder.name} doesn't exist`
                );
            const files = this.getFilesRecursively(folder);
            let filesByType = [];
            for (let file of files) {
                if (file.name.indexOf(fileType) > -1 && file instanceof File) {
                    if (this.isIncludedFile(file.name, excludeFileNames))
                        filesByType.push(file);
                }
            }
            return filesByType;
        } catch (e: any) {
            throw new Error(`getFilesByType_TOF: ${e.message}`);
        }
    },
    /**
     * get all files recursively
     * @param folder
     * @returns
     */
    getFilesRecursively(folder: Folder) {
        let files: (File | Folder)[] = folder.getFiles();
        for (let file of files) {
            if (file instanceof Folder) {
                files = files.concat(this.getFilesRecursively(file));
            }
        }
        return files;
    },
    isIncludedFile(fileName: string, excludeFiles: string[]): boolean {
        for (let excludeFile of excludeFiles) {
            if (fileName.indexOf(excludeFile) > -1) {
                return false;
            }
        }
        return true;
    },
};
