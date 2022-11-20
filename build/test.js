"use strict";
function test() {
    //Get this file path
    var thisFile = File($.fileName);
    var thisFolderPath = thisFile.path;
    // Get RUNONCE.js and eval it
    var configFilePath = thisFolderPath + "\\config\\config.js";
    var configFile = File(configFilePath);
    if (!configFile.exists) {
        throw new Error(thisFolderPath + " doesn't exist");
    }
    $.evalFile(configFile);
}
test();
