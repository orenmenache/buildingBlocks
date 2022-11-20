"use strict";
/**
 * Get path of this file and the files inside the build folder
 * and create the config file which includes all
 */
(function createConfigFile() {
    try {
        // Get this file path
        var thisFile = File($.fileName);
        var thisFolderPath = thisFile.path;
        // Get RUNONCE.js and eval it
        var runOnceFilePath = thisFolderPath + "\\RUNONCE.js";
        var runOnceFile = File(runOnceFilePath);
        if (!runOnceFile.exists) {
            throw new Error(runOnceFilePath + " doesn't exist");
        }
        $.evalFile(runOnceFile);
        // Create the config.js file
        RUNONCE.CONFIG();
        // Wait two seconds and eval the new config.js file
        $.sleep(2000);
        var configFilePath = thisFolderPath + "\\config.js";
        var configFile = File(configFilePath);
        if (!configFile.exists) {
            throw new Error(configFile + " doesn't exist");
        }
        $.evalFile(configFile);
        configFile.open('r');
        var configFileContent = configFile.read();
        var firstLine = configFileContent.split('\n')[0];
        alert(firstLine);
    }
    catch (e) {
        alert("Error in createConfigFile: " + e.message + "\nLine: " + e.line + "\nFile: " + e.fileName);
    }
})();
