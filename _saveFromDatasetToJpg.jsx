// script saves files in loop-mode from CSV-dataset to .jpg

main();
function main(){

// import CSV-dataset
fileImportDataSets = function(file) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass( stringIDToTypeID( "dataSetClass" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    desc.putPath( charIDToTypeID( "Usng" ), new File( file ) );
    desc.putEnumerated( charIDToTypeID( "Encd" ), stringIDToTypeID( "dataSetEncoding" ), stringIDToTypeID( "dataSetEncodingUTF8" ) );
    desc.putBoolean( stringIDToTypeID( "eraseAll" ), true );
    desc.putBoolean( stringIDToTypeID( "useFirstColumn" ), true );
executeAction( stringIDToTypeID( "importDataSets" ), desc, DialogModes.NO );
}

// apply dataset from CSV
applyDataSet = function(setName) {
    var desc = new ActionDescriptor();
    var setRef = new ActionReference();
    setRef.putName( stringIDToTypeID( "dataSetClass" ), setName );
    desc.putReference( charIDToTypeID( "null" ), setRef );
executeAction( charIDToTypeID( "Aply" ), desc, DialogModes.NO );
    }

// read CSV line by line
getDataSetNames = function(csvFileRef) {
     _ftn = function(string){
          var csvItems = string.split(",");
          datasetName = csvItems[0];
          return datasetName;
     }
     csvFileRef.open();
     var datasetArray = new Array();
     var i = 0;
     while (csvString = csvFileRef.readln()) {
          if (csvString.length < 2) continue; // Skip empty lines
          datasetArray[i] = _ftn(csvString);
          i++;
     }
     csvFileRef.close();
     return datasetArray;
}

// prompt for file
var csvFileRef = File.openDialog("Select dataset file: ");
fileImportDataSets(csvFileRef); //import the CSV file into the template
var datasetNames = getDataSetNames(csvFileRef); // set up the dataset array

// work with artboards
var doc = app.activeDocument;
var artbrd = doc.layerSets; //return artboards as array
var fldr = Folder.selectDialog("Choose Save Location", "");
var artname;

function exportArtboard(datasetNum){
    for (var z=0;z<artbrd.length;z++){
            artname=artbrd[z].name;
            selectart();
            cutpaste();
            var saveFile = new File(fldr + "/" + artname + "_#" + datasetNum + ".jpg");
            var saveOptions = new JPEGSaveOptions();
            saveOptions.embedColorProfile = true;
            saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
            saveOptions.matte = MatteType.NONE;
            saveOptions.quality = 3;
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

// setup a loop for your data set names
for (i=1; i < datasetNames.length; i++) {
    applyDataSet(datasetNames[i]);
    exportArtboard(i);
    }
}

//loop to next data set
