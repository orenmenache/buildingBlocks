const RUNONCE = {
    /**
     * writes and rewrites a config file which includes all .js files
     * in the build folder excluding test.js and config.js
     */
    CONFIG(excludeFiles: string[] = []): void {
        const now = new Date();
        const thisFile = File($.fileName);
        const configFolderPath = thisFile.path;

        // One level up
        const thisFolderPath = configFolderPath.split('/config')[0];

        const configFilePath = `${configFolderPath}\\config.js`;
        const thisFolder = Folder(thisFolderPath);
        const files: (File | Folder)[] = this.getFilesRecursively(thisFolder);
        const jsFilePaths: string[] = [];
        for (let file of files) {
            if (file.name.indexOf('.js') > -1) {
                if (this.isIncludedFile(file.name, excludeFiles))
                    jsFilePaths.push(file.fsName);
            }
        }
        let configFileContent = `// Updated: ${now.toString()}\n//@include "`;
        configFileContent += jsFilePaths.join(`";\n//@include "`);
        configFileContent += `";\n`;

        while (configFileContent.indexOf('\\') > -1) {
            configFileContent = configFileContent.replace('\\', '/');
        }

        const configFile = new File(configFilePath);
        configFile.open('w');
        configFile.write(configFileContent);
        configFile.close();
        alert(`Written config file`);
    },
    getFilesRecursively(folder: Folder) {
        let files: (File | Folder)[] = folder.getFiles();
        for (let file of files) {
            if (file instanceof Folder) {
                if (file.name.indexOf('config') === -1)
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

RUNONCE.CONFIG(['test', 'config', 'main']);

// /**
//  * Get path of this file and the files inside the build folder
//  * and create the config file which includes all
//  * this file uses RUNONCE.js to create config.js
//  */
// (function createConfigFile(): void {
//     try {
//         // Get this file path
//         const thisFile = File($.fileName);
//         const thisFolderPath = thisFile.path;

//         // Get RUNONCE.js and eval it
//         const runOnceFilePath = `${thisFolderPath}\\RUNONCE.js`;
//         const runOnceFile = File(runOnceFilePath);
//         if (!runOnceFile.exists) {
//             throw new Error(`${runOnceFilePath} doesn't exist`);
//         }
//         $.evalFile(runOnceFile);
//         // Create the config.js file
//         RUNONCE.CONFIG();

//         // Wait two seconds and eval the new config.js file
//         $.sleep(2000);
//         const configFilePath = `${thisFolderPath}\\config.js`;
//         const configFile = File(configFilePath);
//         if (!configFile.exists) {
//             throw new Error(`${configFile} doesn't exist`);
//         }
//         $.evalFile(configFile);
//         configFile.open('r');
//         const configFileContent: string = configFile.read();
//         configFile.close();
//         const firstLine = configFileContent.split('\n')[0];
//         alert(firstLine);
//     } catch (e: any) {
//         alert(
//             `Error in createConfigFile: ${e.message}\nLine: ${e.line}\nFile: ${e.fileName}`
//         );
//     }
// })();
