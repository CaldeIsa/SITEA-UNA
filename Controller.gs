// menu principal


function doGet(request) {
  return HtmlService.createTemplateFromFile('MenuPrincipal2')
      .evaluate();
}

/*<?!= include('StyleMenuPrincipal'); ?>
<?!= include('JavaScript'); ?>*/

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

//var idHojaRaiz = SpreadsheetApp.getActiveSpreadsheet().getId();


var hojaActiva = SpreadsheetApp.getActiveSpreadsheet(); 

var ui = SpreadsheetApp.getUi();

function getSheetNames() {
  loadProperties();
  var sheets = SpreadsheetApp.openById(idHojaRaiz).getSheets();
  var sheetNames = sheets.map(function(sheet) {
    return sheet.getName();
  });
  return sheetNames;
}

function onOpen() {  
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('SITEA-UNA')    
  .addItem('Sistema de tutorias de éxito académico UNA 2' , 'mostrarMenuPrincipal3')    
    .addToUi();
}
function mostrarMenuPrincipal2() {
  loadProperties();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('MenuPrincipal2')
      .setWidth(1500)
      .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Sistema de tutorias de éxito académico UNA');
  
}
function mostrarMenuPrincipal3() {
  loadProperties();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('MenuPrincipal3')
      .setWidth(1500)
      .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Sistema de tutorias de éxito académico UNA');
  
}
