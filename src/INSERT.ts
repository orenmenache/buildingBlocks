const INSERT = {
    TEXT: {
        intoExistingTextLayer(text: string, textLayer: TextLayer): void {
            try {
                const textDocProp: TextDocumentProperty = textLayer.sourceText;
                const textDoc: TextDocument = textDocProp.value;
                textDoc.text = text;
                textLayer.sourceText.setValue(textDoc);
            } catch (e: any) {
                throw new Error(
                    `insert text intoExistingTextLayer failed: ${e.message}`
                );
            }
        },
    },
    FOOTAGE: {
        /**
         * Here we're replacing the content
         * as there are no empty layers
         * image must be imported first
         */
        intoExistingAVLayer(importedImage: FootageItem, layer: AVLayer) {
            layer.replaceSource(importedImage, true);
        },
    },
};
