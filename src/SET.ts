const SET = {
    TEXT: {
        fillColor(textLayer: TextLayer, fillColor: ThreeDColorValue/* = [0, 0, 0]*/) {
            const textDocProp: TextDocumentProperty = textLayer.sourceText;
            const textDoc: TextDocument = textDocProp.value;
            textDoc.fillColor = fillColor;
            textDocProp.setValue(textDoc);
        },
    },
};
