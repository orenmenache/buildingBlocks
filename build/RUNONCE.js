"use strict";
var RUNONCE = {
    /**
     * writes and rewrites a config file which includes all .js files
     * in the build folder excluding test.js and config.js
     */
    CONFIG: function () {
        var now = new Date();
        var thisFile = File($.fileName);
        var thisFolderPath = thisFile.path;
        var configFilePath = thisFolderPath + "\\config.js";
        // if (File(configFilePath).exists) {
        //     alert(`Config file exists`);
        //     return;
        // }
        var thisFolder = Folder(thisFolderPath);
        var files = this.getFilesRecursively(thisFolder);
        var jsFilePaths = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.name.indexOf('.js') > -1) {
                if (file.name !== 'test.js' &&
                    file.name !== 'config.js' &&
                    file.name !== 'RUNONCE.js')
                    jsFilePaths.push(file.fsName);
            }
        }
        var configFileContent = "// Updated: " + now.toString() + "\n//@include \"";
        configFileContent += jsFilePaths.join("\";\n//@include \"");
        configFileContent += "\";\n";
        while (configFileContent.indexOf('\\') > -1) {
            configFileContent = configFileContent.replace('\\', '/');
        }
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
