"use strict";
/**
 * Get path of this file and the files inside the build folder
 * and create the config file which includes all
 */
var RUNONCE = {
    CONFIG: function () {
        var thisFile = File($.fileName);
        var thisFolderPath = thisFile.path;
        var configFilePath = thisFolderPath + "\\config.js";
        if (File(configFilePath).exists) {
            alert("Config file exists");
            return;
        }
        var thisFolder = Folder(thisFolderPath);
        var files = this.getFilesRecursively(thisFolder);
        var jsFilePaths = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.name.indexOf('.js') > -1) {
                if (file.name !== 'test.js' && file.name !== 'config.js')
                    jsFilePaths.push(file.fsName);
            }
        }
        var configFileContent = "//@include \"" + jsFilePaths.shift();
        configFileContent += files.join("\";\n//@include \"");
        configFileContent += "\";\n";
        var configFile = new File(configFilePath);
        configFile.open('w');
        configFile.write(configFileContent);
        configFile.close();
    },
    getFilesRecursively: function (folder) {
        var files = folder.getFiles();
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var file = files_2[_i];
            if (file instanceof Folder) {
                files = files.concat(this.getFilesRecursively(file));
            }
        }
        return files;
    }
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
