function test() {
    //Get this file path
    const thisFile = File($.fileName);
    const thisFolderPath = thisFile.path;
    // Get RUNONCE.js and eval it
    const configFilePath = `${thisFolderPath}\\config\\config.js`;
    const configFile = File(configFilePath);
    if (!configFile.exists) {
        throw new Error(`${thisFolderPath} doesn't exist`);
    }
    $.evalFile(configFile);
}

test();
