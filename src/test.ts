/**
 * Get path of this file and the files inside the build folder
 * and create the config file which includes all
 */

const RUNONCE = {
    CONFIG(): void {
        const thisFile = File($.fileName);
        const thisFolderPath = thisFile.path;
        const configFilePath = `${thisFolderPath}\\config.js`;
        if (File(configFilePath).exists) {
            alert(`Config file exists`);
            return;
        }
        const thisFolder = Folder(thisFolderPath);
        const files: (File | Folder)[] = this.getFilesRecursively(thisFolder);
        const jsFilePaths: string[] = [];
        for (let file of files) {
            if (file.name.indexOf('.js') > -1) {
                if (file.name !== 'test.js' && file.name !== 'config.js')
                    jsFilePaths.push(file.fsName);
            }
        }
        let configFileContent = `//@include "${jsFilePaths.shift()}`;
        configFileContent += files.join(`";\n//@include "`);
        configFileContent += `";\n`;

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

RUNONCE.CONFIG();

// const configPath = `${thisFolderPath}/config.js`;

// $.evalFile(File(configPath));

// function RUNONCE_CREATE_CONFIGFILE(configPath: string) {

//     let configContent = '';

//     for (let i = 0; i < evalFiles.length; i++) {
//         let filePath = `${thisFolderPath}/${evalFiles[i]}`;
//         let row = `//@include "${filePath}"\n`;
//         configContent += row;
//     }

//     let file = File(configPath);
//     if (!File(configPath).exists) {
//         file = new File(configPath);
//         file.open('w');
//         file.write(configContent);
//         file.close();
//     } else {
//         alert (`Config file exists`)
//     }

//     //File(configPath).write(configContent);
// }
