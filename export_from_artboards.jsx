#target photoshop
var doc=app.activeDocument;
var artbrd=doc.layerSets;//return artboards as array
var lyrcmp=doc.layerComps;//return layercomps as array
var fldr = Folder.selectDialog ("Choose Save Location","");
var lyrcompname;
var artname;
for(var i=0;i<lyrcmp.length;i++){

        var cmpname=lyrcmp[i].name;
        lyrcompname = lyrcmp[i].name;
        var idapplyComp = stringIDToTypeID( "applyComp" );
        var desc353 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        var ref75 = new ActionReference();
        var idcompsClass = stringIDToTypeID( "compsClass" );
        ref75.putName( idcompsClass, cmpname);
        desc353.putReference( idnull, ref75 );
        executeAction( idapplyComp, desc353, DialogModes.NO );
        exportArtboard ();
}
function exportArtboard(){
    for (var z=0;z<artbrd.length;z++){
            artname=artbrd[z].name;
            selectart();

            cutpaste();


            var saveFile = new File(fldr + "/" + artname + "_" + lyrcompname + ".jpg");
            var saveOptions = new JPEGSaveOptions();
            saveOptions.embedColorProfile = true;
            saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
            saveOptions.matte = MatteType.NONE;
            saveOptions.quality = 10;
            app.activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

        }




}
function cutpaste(){
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

function Action2() {
  // Set
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Copy Merged
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    executeAction(sTID('copyMerged'), undefined, dialogMode);
  };

  // Set
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Make
  function step4(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(sTID("artboard"), false);
    desc2.putString(sTID("preset"), "Clipboard");
    desc1.putObject(cTID('Nw  '), cTID('Dcmn'), desc2);
    desc1.putInteger(cTID('DocI'), 287);
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  // Paste
  function step5(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID('AntA'), cTID('Annt'), cTID('Anno'));
    desc1.putClass(cTID('As  '), cTID('Pxel'));
    executeAction(cTID('past'), desc1, dialogMode);
  };

  step1();      // Set
  step2();      // Copy Merged
  step3();      // Set
  step4();      // Make
  step5();      // Paste
};


Action2.main = function () {
  Action2();
};

Action2.main();
}

function selectart(){
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

function select() {
  // Select
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), artname);
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(8);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  step1();      // Select
};
select();
}
