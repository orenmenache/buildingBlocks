"use strict";
var INSERT = {
    TEXT: {
        intoExistingTextLayer: function (text, textLayer) {
            try {
                var textDocProp = textLayer.sourceText;
                var textDoc = textDocProp.value;
                textDoc.text = text;
                textLayer.sourceText.setValue(textDoc);
            }
            catch (e) {
                throw new Error("insert text intoExistingTextLayer failed: " + e.message);
            }
        }
    },
    FOOTAGE: {
        /**
         * Here we're replacing the content
         * as there are no empty layers
         * image must be imported first
         */
        intoExistingAVLayer: function (importedImage, layer) {
            layer.replaceSource(importedImage, true);
        }
    }
};
