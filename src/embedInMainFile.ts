/**
 * Get path of this file and the files inside the build folder
 * and create the config file which includes all
 */
(function createConfigFile(): void {
    try {
        // Get this file path
        const thisFile = File($.fileName);
        const thisFolderPath = thisFile.path;

        // Get RUNONCE.js and eval it
        const runOnceFilePath = `${thisFolderPath}\\RUNONCE.js`;
        const runOnceFile = File(runOnceFilePath);
        if (!runOnceFile.exists) {
            throw new Error(`${runOnceFilePath} doesn't exist`);
        }
        $.evalFile(runOnceFile);
        // Create the config.js file
        RUNONCE.CONFIG();

        // Wait two seconds and eval the new config.js file
        $.sleep(2000);
        const configFilePath = `${thisFolderPath}\\config.js`;
        const configFile = File(configFilePath);
        if (!configFile.exists) {
            throw new Error(`${configFile} doesn't exist`);
        }
        $.evalFile(configFile);
        configFile.open('r');
        const configFileContent: string = configFile.read();
        const firstLine = configFileContent.split('\n')[0];
        alert(firstLine);
    } catch (e: any) {
        alert(
            `Error in createConfigFile: ${e.message}\nLine: ${e.line}\nFile: ${e.fileName}`
        );
    }
})();
