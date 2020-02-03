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
          datasetName = csvItems[0]            
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

// jpeg options used for all the saves  

var jpgOptns = new JPEGSaveOptions();  
     jpgOptns.formatOptions = FormatOptions.STANDARDBASELINE;  
     jpgOptns.embedColorProfile = true;  
     jpgOptns.matte = MatteType.NONE;  
     jpgOptns.quality = 12;   

//prompt for file  

var csvFileRef = File.openDialog("Please select dataset file: ");
fileImportDataSets(csvFileRef); //inport the CSV file into the template  
var datasetNames = getDataSetNames(csvFileRef);// set up the dataset array  

//setup a loop for your data set names   

for (i=1; i < datasetNames.length; i++) {  
    applyDataSet(datasetNames[i]);   
    var Name = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');  
    var Path = decodeURI(activeDocument.path);  
    var saveFile = File(Path + "/" + Name + "#" + datasetNames[i])  
    app.activeDocument.saveAs (saveFile ,jpgOptns , true, Extension.LOWERCASE);  
    }   
}
//loop to next data set 
