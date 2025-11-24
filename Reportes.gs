function generareporte(selectedColumns, selectedSheets) {
  loadProperties();

  // Define el nombre del archivo con la fecha y hora actual
  var fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MM-yy HH:mm");
  var nombreArchivo = "Reporte " + fecha;

  // Crea una nueva hoja de cálculo en la carpeta especificada
  var nuevaHoja = SpreadsheetApp.create(nombreArchivo);
  var archivo = DriveApp.getFileById(nuevaHoja.getId());
  carpetaReportes.addFile(archivo);
  DriveApp.getRootFolder().removeFile(archivo); // Elimina el archivo de la raíz

  // Obtén la hoja activa de la nueva hoja de cálculo
  var hojaNueva = nuevaHoja.getActiveSheet();
  
  // Inicializa la fila actual para insertar los datos
  var currentRow = 1;

  selectedSheets.forEach(function(sheet) {
    var hojaActual = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
    
    if (!hojaActual) {
      Logger.log('La hoja ' + sheet + ' no existe.');
      return;
    }

    // Obtén los títulos de la fila 3 (los nombres de las columnas)
    var rangoTitulos = hojaActual.getRange("A3:Z3");
    var titulos = rangoTitulos.getValues()[0];

    // Filtrar los índices de las columnas seleccionadas
    var columnasSeleccionadasIndices = selectedColumns.map(function(letra) {
      return letra.charCodeAt(0) - 65; // Convierte la letra en índice (A=0, B=1, etc.)
    });

    // Filtrar los títulos correspondientes a las columnas seleccionadas
    var titulosSeleccionados = columnasSeleccionadasIndices.map(function(indice) {
      return [titulos[indice]];
    });

    // Obtén los datos desde la fila 4 hasta el final para las columnas seleccionadas
    var lastRow = hojaActual.getLastRow();
    var datosSeleccionados = hojaActual.getRange(4, 1, lastRow - 3, hojaActual.getLastColumn()).getValues().map(function(fila) {
      return columnasSeleccionadasIndices.map(function(indice) {
        return fila[indice];
      });
    });

    // Inserta una fila con el nombre de la hoja
    hojaNueva.getRange(currentRow, 1).setValue("Hoja: " + sheet).setFontWeight("bold");
    currentRow++;

    // Inserta los títulos en la nueva hoja comenzando desde la columna 2 y formatearlos en negrita
    hojaNueva.getRange(currentRow, 2, 1, titulosSeleccionados.length).setValues([titulosSeleccionados.flat()]);
    hojaNueva.getRange(currentRow, 2, 1, titulosSeleccionados.length).setFontWeight("bold");
    currentRow++;

    // Agrega una columna de enumeración a los datos seleccionados
    var datosEnumerados = datosSeleccionados.map(function(fila, index) {
      return [index + 1].concat(fila); // Agrega el número de fila al principio de cada fila de datos
    });

    // Inserta los datos enumerados en la nueva hoja comenzando desde la fila actual
    hojaNueva.getRange(currentRow, 1, datosEnumerados.length, datosEnumerados[0].length).setValues(datosEnumerados);
    currentRow += datosEnumerados.length;

    // Ajusta el ancho de las columnas a los datos
    for (var i = 1; i <= titulosSeleccionados.length + 1; i++) { // +1 para la nueva columna de enumeración
      hojaNueva.autoResizeColumn(i);
    }
  });

  ui.alert(nombreArchivo + " generado correctamente.");
}

function getParticipacionTitles() {
  loadProperties();
  var rangeList = hojaAsistenciaSheet.getRangeList(['B8:I8', 'Z8:AD8']);
  var ranges = rangeList.getRanges(); // Obtener rangos individuales del RangeList
  
  var titles = []; // Array para almacenar títulos de todos los rangos

  // Iterar sobre cada rango para obtener sus valores
  for (var i = 0; i < ranges.length; i++) {
    var rangeValues = ranges[i].getValues()[0]; // Obtener valores de la fila actual
    
    // Convertir títulos a letras y agregarlos al array de títulos
    for (var j = 0; j < rangeValues.length; j++) {
      var columnIndex = ranges[i].getColumn() + j - 1; // Obtener el índice de columna correcto
      var columnLetter = getColumnLetter(columnIndex); // Convertir índice a letra
      titles.push({ title: rangeValues[j], letter: columnLetter }); // Guardar título y letra
    }
  }

  return titles; // Retornar array de objetos con título y letra
}


function getColumnTitles() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange('P3:AB3');
  var titles = range.getValues()[0];  // Obtiene la primera fila del rango
  var letters = []; // Para almacenar las letras de las columnas
  
  // Itera sobre las columnas y convierte el índice de columna en la letra correspondiente
  for (var i = 0; i < titles.length; i++) {
    var columnLetter = getColumnLetter(16 + i); // Empieza en P, que es la columna 16
    letters.push({ title: titles[i], letter: columnLetter });
  }
  
  return letters;  // Retorna un array de objetos con el título y la letra
}

// Función que convierte un número de columna en letra
function getColumnLetter(colIndex) {
  var letter = "";
  while (colIndex >= 0) {
    letter = String.fromCharCode((colIndex % 26) + 65) + letter;  // 65 es 'A' en ASCII
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letter;
}


function processSelectedColumns(selectedColumns, selectedSheets) {

  // Aquí puedes hacer lo que necesites con las columnas seleccionadas.

  ui.alert("Columnas seleccionadas: " + selectedColumns+ "\n Hojas seleccionadas: "+ selectedSheets);
  // Por ejemplo, podrías procesar o generar algún reporte basado en esas columnas.
}

function generareporteParticipacion1(selectedColumns, selectedSheets) {
  loadProperties();
  
  // Define el nombre del archivo con la fecha y hora actual
  var fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd-MM-yy HH:mm");
  var nombreArchivo = "Reporte de participación " + fecha;

  // Crea una nueva hoja de cálculo en la carpeta especificada
  var nuevaHoja = SpreadsheetApp.create(nombreArchivo);
  var archivo = DriveApp.getFileById(nuevaHoja.getId());
  carpetaReportes.addFile(archivo);
  DriveApp.getRootFolder().removeFile(archivo); // Elimina el archivo de la raíz

  // Obtén la hoja activa de la nueva hoja de cálculo
  var hojaNueva = nuevaHoja.getActiveSheet();
  
  // Inicializa la fila actual para insertar los datos
  var currentRow = 1;

  selectedSheets.forEach(function(sheet) {
    
    var hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);
    var ultimaTutoria = hojaRaiz.getLastRow();

    var titulos = [];
    var participacion = [];

    selectedColumns.forEach(column => {
        var valor = hojaAsistenciaSheet.getRange(column + 8).getValue();
        titulos.push(valor); // Agrega el valor al array titulos
    });

    for (var fila = 4; fila <= ultimaTutoria; fila++) {
      try {
        var urlHojaAsistencia = hojaRaiz.getRange('AE' + fila).getValue();
        var hojaAsistencia = SpreadsheetApp.openByUrl(urlHojaAsistencia);

        for (var j = 12; hojaAsistencia.getRange('I' + j).getValue() != ""; j++) {
          var datosFila = [];
          selectedColumns.forEach(column => {
            var valor = hojaAsistencia.getRange(column + j).getValue();
            datosFila.push(valor); // Agrega el valor de cada columna especificada a datosFila
          });
          participacion.push(datosFila);
        }
      } catch (error) {
        Logger.log("Error al procesar la hoja de asistencia en la fila " + fila + " hoja " + sheet);
      }
    }

    // Inserta una fila con el nombre de la hoja
    hojaNueva.getRange(currentRow, 1).setValue("Hoja: " + sheet).setFontWeight("bold");
    currentRow++;

    // Inserta los títulos en la nueva hoja comenzando desde la columna 2 y formatearlos en negrita
    hojaNueva.getRange(currentRow, 2, 1, titulos.length).setValues([titulos]);
    hojaNueva.getRange(currentRow, 2, 1, titulos.length).setFontWeight("bold");
    currentRow++;

    // Agrega una columna de enumeración a los datos seleccionados
    var datosEnumerados = participacion.map(function(fila, index) {
      return [index + 1].concat(fila); // Agrega el número de fila al principio de cada fila de datos
    });

    // Inserta los datos enumerados en la nueva hoja comenzando desde la fila actual
    hojaNueva.getRange(currentRow, 1, datosEnumerados.length, datosEnumerados[0].length).setValues(datosEnumerados);
    currentRow += datosEnumerados.length;

    // Ajusta el ancho de las columnas a los datos
    for (var i = 1; i <= titulos.length + 1; i++) { // +1 para la nueva columna de enumeración
      hojaNueva.autoResizeColumn(i);
    }
  });

  var url = nuevaHoja.getUrl();
    
    // Muestra un alerta de "Sí" o "No"
    var response = ui.alert(
        nombreArchivo+" generado correctamente.",
        "¿Desea abrir el archivo?",
        ui.ButtonSet.YES_NO
    );

    // Verifica si el usuario hizo clic en "Sí"
    if (response == ui.Button.YES) {
        // Abre el enlace en una nueva pestaña o ventana utilizando HtmlService
        var htmlOutput = HtmlService.createHtmlOutput('<script>window.open("' + url + '", "_blank");google.script.host.close();</script>')
            .setWidth(100)
            .setHeight(50);
        ui.showModalDialog(htmlOutput, "Abriendo enlace...");
    } else {
        ui.alert("Archivo generado pero no se abrirá.");
    }
}
