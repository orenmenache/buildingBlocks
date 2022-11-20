"use strict";
var SET = {
    TEXT: {
        fillColor: function (textLayer, fillColor /* = [0, 0, 0]*/) {
            var textDocProp = textLayer.sourceText;
            var textDoc = textDocProp.value;
            textDoc.fillColor = fillColor;
            textDocProp.setValue(textDoc);
        }
    }
};
