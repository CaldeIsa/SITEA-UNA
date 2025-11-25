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

function getSheetNames() {
  loadProperties();
  var sheets = SpreadsheetApp.openById(idHojaRaiz).getSheets();
  var sheetNames = sheets.map(function(sheet) {
    return sheet.getName();
  });
  return sheetNames;
}