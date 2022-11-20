const RUNONCE = {
    /**
     * writes and rewrites a config file which includes all .js files
     * in the build folder excluding test.js and config.js
     */
    CONFIG(): void {
        const now = new Date();
        const thisFile = File($.fileName);
        const thisFolderPath = thisFile.path;
        const configFilePath = `${thisFolderPath}\\config.js`;
        // if (File(configFilePath).exists) {
        //     alert(`Config file exists`);
        //     return;
        // }
        const thisFolder = Folder(thisFolderPath);
        const files: (File | Folder)[] = this.getFilesRecursively(thisFolder);
        const jsFilePaths: string[] = [];
        for (let file of files) {
            if (file.name.indexOf('.js') > -1) {
                if (
                    file.name !== 'test.js' &&
                    file.name !== 'config.js' &&
                    file.name !== 'RUNONCE.js'
                )
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
    },
    getFilesRecursively(folder: Folder) {
        let files: (File | Folder)[] = folder.getFiles();
        for (let file of files) {
            if (file instanceof Folder) {
                files = files.concat(this.getFilesRecursively(file));
            }
        }
        return files;
    },
};
