const PARSE_JSON = {
    GENERIC<T>(jsonContent: string) {
        const parsed = JSON.parse(jsonContent) as T;
        return parsed;
    },
    // The next functions are specific to ticker project
    // multipleAssets(rawJsonAssets: string): AssetSinglePackage[] {
    //     try {
    //         const assetGroupJson: JSONAssetGroup<any> =
    //             this.GENERIC<JSONAssetGroup<any>>(rawJsonAssets);

    //         let assets: AssetSinglePackage[] = [];
    //         for (let n in assetGroupJson.assets) {
    //             let jAsset: AssetSinglePackageJSON | undefined =
    //                 assetGroupJson.assets[n];

    //             if (!jAsset) throw new Error(`Invalid jAsset`);
    //             let asset = new AssetSinglePackage(
    //                 jAsset.name,
    //                 this.candles(jAsset.candles),
    //                 new HighLowPriceAnalyzer(jAsset.HLAnalyzer),
    //                 new VolumeAnalyzer(jAsset.VAnalyzer),
    //                 new MovingAverageCluster(jAsset.MA)
    //             );
    //             assets.push(asset);
    //         }
    //         return assets;
    //     } catch (e: any) {
    //         throw new Error(`Parse JSON stringifiedAsset failed: ${e.message}`);
    //     }
    // },
    // stringifiedAsset(rawJsonAsset: string): AssetSinglePackage {
    //     try {
    //         const jAsset: AssetSinglePackageJSON =
    //             this.GENERIC<AssetSinglePackageJSON>(rawJsonAsset);

    //         const asset = new AssetSinglePackage(
    //             jAsset.name,
    //             this.candles(jAsset.candles),
    //             new HighLowPriceAnalyzer(jAsset.HLAnalyzer),
    //             new VolumeAnalyzer(jAsset.VAnalyzer),
    //             new MovingAverageCluster(jAsset.MA)
    //         );
    //         return asset;
    //     } catch (e: any) {
    //         throw new Error(`Parse JSON stringifiedAsset failed: ${e.message}`);
    //     }
    // },
    // /**
    //  * Takes a JSON candle array and returns
    //  */
    // candles(candles: JSONCandle[]): CandleStick[] {
    //     let candleSticks: CandleStick[] = [];
    //     for (let jCandle of candles) {
    //         let candle = new CandleStick(jCandle);
    //         candleSticks.push(candle);
    //     }
    //     return candleSticks;
    // },
};
