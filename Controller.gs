// Punto de entrada web: sirve la vista principal con las propiedades cargadas.
function doGet(request) {
  loadProperties();
  return HtmlService.createTemplateFromFile('MenuPrincipal')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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
  var htmlOutput = HtmlService.createHtmlOutputFromFile('MenuPrincipal')
      .setWidth(1500)
      .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Sistema de tutorias de éxito académico UNA');
}

function mostrarMenuPrincipal3() {
  loadProperties();
  var htmlOutput = HtmlService.createHtmlOutputFromFile('MenuPrincipal')
      .setWidth(1500)
      .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Sistema de tutorias de éxito académico UNA');
}
