var carpetaForms = null;
var ciclo = null;
var formsUso = null;
var carpetaRespuesta=null;
var column=null;
var columnR=null;

function create_forms(data) {
  loadProperties();

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }

  Logger.log(idHojaRaiz);
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);


  if(data.formType=="matricula"){
    carpetaForms = carpetaFormsMatricula;
    carpetaRespuesta = carpetaRespuestaMatriculas;
    formsUso= formBaseMatricula;
  }else if(data.formType=="evaluacion"){
    carpetaForms = carpetaFormsEvaluacion;
    formsUso= formBaseEvaluacion;
    carpetaRespuesta = carpetaRespuestaEvaluacion;
  }else if(data.formType=="asistenciavirtual"){
    carpetaForms = carpetaFormsAsistenciaVirtual;
    formsUso= formBaseAsistenciaV;
    carpetaRespuesta = carpetaRespuestaAsistenciaV;
  }else if(data.formType=="informeMensual"){
    carpetaForms = carpetaFormsInformeMensual;
    formsUso= formBaseInformeMensual;
    carpetaRespuesta = carpetaRespuestaInformeMensual;
  }

  campus = data.campus;
  ciclo = data.ciclo +" "+ data.anno;
  
  // Verificar la respuesta del usuario
    var fila;
    var filaIni;
    var filaFin;
    var formType = data.formType;

    if(data.tipo=="grupal"){
      fila = data.fila;
      crearForms(fila,formType);
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        crearForms(fila,formType);
      }
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        crearForms(fila,formType);
      }
    }
  
}

function delete_forms(data){
  loadProperties();
  
  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  var fila;
  var filaIni;
  var filaFin;
  var formType = data.formType;

  if(data.tipo=="grupal"){
    fila = data.fila;
    eliminarForm(fila, formType);
  }else if(data.tipo == "general"){
    var ultimaFila = hojaRaiz.getLastRow();
    for (var fila = 4; fila <= ultimaFila; fila++) {
      eliminarForm(fila, formType);
    }
  }
  else if(data.tipo == "rango"){
    filaIni = parseInt(data.filaIni, 10);
    filaFin = parseInt(data.filaFin, 10);
    for (var fila=filaIni ; fila <= filaFin; fila++) {
      eliminarForm(fila, formType);
    }
  }
  
}

function formsMat(data) {
  loadProperties();

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);


  if(data.formType=="matricula"){
    carpetaForms = carpetaFormsMatricula;
    carpetaRespuesta = carpetaRespuestaMatriculas;
    formsUso= formBaseMatricula;
  }else if(data.formType=="evaluacion"){
    carpetaForms = carpetaFormsEvaluacion;
    formsUso= formBaseEvaluacion;
    carpetaRespuesta = carpetaRespuestaEvaluacion;
  }else if(data.formType=="asistenciavirtual"){
    carpetaForms = carpetaFormsAsistenciaVirtual;
    formsUso= formBaseAsistenciaV;
    carpetaRespuesta = carpetaRespuestaAsistenciaV;
  }else if(data.formType=="informeMensual"){
    carpetaForms = carpetaFormsInformeMensual;
    formsUso= formBaseInformeMensual;
    carpetaRespuesta = carpetaRespuestaInformeMensual;
  }

  campus = data.campus;
  ciclo = data.ciclo +" "+ data.anno;

  var mensaje = "Se crearán formularios de matricula con los siguientes datos:\n\n" +
                "Hoja de cálculo: " + nombreHojaRaiz + "\n" +
                "Formulario base: " + formsUso.getName() + "\n" +
                "Campus: " + campus + "\n" +
                "Ciclo y año: " + ciclo + "\n" +
                "Carpeta destino de los forms: " + carpetaForms.getName() + "\n\n" +
                "¿Son estos datos correctos?";
  
  var confirmacion = ui.alert('Confirmar Datos', mensaje, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {
    var fila;
    var filaIni;
    var filaFin;
    var formType = data.formType;

    if(data.tipo=="grupal"){
      fila = data.fila;
      crearForms(fila,formType);
      ui.alert("Formulario creado exitosamente");
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        crearForms(fila,formType);
      }
      ui.alert("Formularios creados exitosamente");
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        crearForms(fila,formType);
      }
      ui.alert("Formularios creados exitosamente");
    }
  
  }
}

function crearForms(fila, formType) {
  var type;
  if(formType=="matricula"){
    type="matrícula";
    column="AC";
    columnR="AD";
  }else if(formType=="evaluacion"){
    type="evaluación";
    column="AT";
    columnR="AU";
  }else if(formType=="asistenciavirtual"){
    type="asistencia virtual";
    column="AF";
    columnR="AG";
  }else if(formType=="informeMensual"){
    type="informe mensual";
    column="AW";
    columnR="AX";
  }

  var title = "Formulario de " +type+" de la tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + ' ' + hojaRaiz.getRange('H' + fila).getValue() + ' ' + hojaRaiz.getRange('I' + fila).getValue() + ", " + campus + ", " + ciclo; // Texto de titulo

  var nombreArchivo = campus + " Forms "+type+" "+ hojaRaiz.getRange('G' + fila).getValue() + ' ' + hojaRaiz.getRange('H' + fila).getValue() + ' ' + hojaRaiz.getRange('I' + fila).getValue();

  var copia = formsUso.makeCopy(nombreArchivo, carpetaForms); // Hace las copias
  
  // Crear una nueva hoja de cálculo
  var spreadsheet = SpreadsheetApp.create("Respuesta-"+title);

   // Mover la hoja de cálculo a la carpeta específica
  var file = DriveApp.getFileById(spreadsheet.getId());
  carpetaRespuesta.addFile(file);
  DriveApp.getRootFolder().removeFile(file);  // Elimina el archivo de la carpeta raíz de Drive
  

  var formCopia = FormApp.openById(copia.getId());
  formCopia.setTitle(title);

   // Vincular el formulario con la hoja de cálculo
  formCopia.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  // Obtener la hoja activa
  var sheet = spreadsheet.getActiveSheet();
  
  // Obtener los elementos del formulario y sus títulos
  var items = formCopia.getItems();
  var headers = items.map(function(item) {
    return item.getTitle();
  });
  
  // Añadir una columna para la marca de tiempo
  headers.unshift('Marca de tiempo');
  
  // Escribir los encabezados en la primera fila de la hoja de cálculo
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Obtener la URL de edición
  var editUrl = copia.getUrl();
  
  // Convertir la URL de edición en URL de formulario (URL para compartir)
  var formUrl = editUrl.replace('edit', 'viewform');

  // Pegar la URL de formulario en la hoja de cálculo
  hojaRaiz.getRange(column + fila).setValue(formUrl);
  hojaRaiz.getRange(columnR+fila).setValue(spreadsheet.getUrl());
}

function eliminarformularios(data){
  
  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  var mensaje = "¿Seguro que desea eliminar la información seleccionada?";
  
  var confirmacion = ui.alert('Confirmar Datos', mensaje, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {
    var fila;
    var filaIni;
    var filaFin;
    var formType = data.formType;

    if(data.tipo=="grupal"){
      fila = data.fila;
      eliminarForm(fila, formType);
      ui.alert('Formulario eliminado exitosamente');
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        eliminarForm(fila, formType);
      }
      ui.alert('Formularios eliminados exitosamente');
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        eliminarForm(fila, formType);
      }
      ui.alert('Formularios eliminados exitosamente');
    }
  
  }
}

function eliminarForm(fila, formType) {
  
  if(formType=="matricula"){
    column="AC";
    columnR="AD";
  }else if(formType=="evaluacion"){
    column="AT";
    columnR="AU";
  }else if(formType=="asistenciavirtual"){
    column="AF";
    columnR="AG";
  }else if(formType=="informeMensual"){
    column="AW";
    columnR="AX";
  }

  var formularioUrl = hojaRaiz.getRange(column + fila).getValue();
  
  if (formularioUrl) {
    try {
      var formularioId = FormApp.openByUrl(formularioUrl).getId();
      var file = DriveApp.getFileById(formularioId);
      file.setTrashed(true);


      var respuestaUrl = hojaRaiz.getRange(columnR + fila).getValue();

      var respuestaId = SpreadsheetApp.openByUrl(respuestaUrl).getId();
      var response = DriveApp.getFileById(respuestaId);
      response.setTrashed(true);

      hojaRaiz.getRange(column + fila).setValue("");
      hojaRaiz.getRange(columnR + fila).setValue("");

    } catch (e) {
      ui.alert('Error al intentar eliminar el formulario: ' + column +fila);
    }
  } else {
    ui.alert('No se encontró la URL del formulario en la celda '+column +fila);
  }
}

function generarMensajes() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow(); // Última fila con datos

  for (var i = 4; i <= lastRow; i++) {
    // Datos para BB
    var datosTutoria = sheet.getRange("G" + i).getValue() + " " +
                       sheet.getRange("H" + i).getValue() + " " +
                       sheet.getRange("I" + i).getValue();
    var comprobante = "Comprobante de matrícula para la tutoría académica " + datosTutoria + 
                      ", "+sheet.getRange("BD2").getValue()+", II ciclo 2025";
    sheet.getRange("BB" + i).setValue(comprobante);

    // Datos para BC
    var enlaceTeams = sheet.getRange("AH" + i).getValue();
    var mensaje = `Estimada persona estudiante:\n\n` +
                  `Su matrícula se gestionó de manera correcta.\n\n` +
                  `El inicio de las tutorías académicas será a partir del lunes 28 de julio del 2025, según horario matriculado. ` +
                  `En caso de que la tutoría matriculada se desarrolle de manera presencial, se les estará enviando un correo electrónico indicando el aula donde se desarrollarán las sesiones de tutorías académicas\n\n` +
                  `A continuación, se adjunta enlace al grupo de TEAMS:\n${enlaceTeams}\n\n` +
                  `Toda persona estudiante matriculada, deberá unirse al grupo, pues Microsoft Teams será el medio oficial de comunicación entre la persona estudiante y la persona tutora.`;
    
    sheet.getRange("BC" + i).setValue(mensaje);
  }

}

function generarMensajesSedes() {
  // ID del documento de Google Sheets
  var ss = SpreadsheetApp.openById('11nKeX7fp_6JGzZtV4jOzCxHCOwnUKCfRgr8lkXw4Pi0'); //Cambiar valor archivos base
  
  // Lista de nombres de hojas (taps)
  var sedes = [
    "Sede Regional Chorotega-Liberia",
    "Sede Regional Chorotega-Nicoya",
    "Sede Regional Huetar Norte-Sarapiquí",
    "Sede Regional Brunca-Pérez Zeledón",
    "Sede Interuniversitaria de Alajuela",
    "Sede Regional Brunca-Coto"
  ];

  // Recorre cada hoja
  sedes.forEach(function(nombreHoja) {
    var hoja;
    try {
      hoja = ss.getSheetByName(nombreHoja);
      if (!hoja) throw new Error("Hoja no encontrada");
      
      var lastRow = hoja.getLastRow();

      for (var i = 4; i <= lastRow; i++) {
        // Datos para BB
        var datosTutoria = hoja.getRange("G" + i).getValue() + " " +
                           hoja.getRange("H" + i).getValue() + " " +
                           hoja.getRange("I" + i).getValue();
        var comprobante = "Comprobante de matrícula para la tutoría académica " + datosTutoria + 
                          ", " + hoja.getRange("BD2").getValue() + ", II ciclo 2025";
        hoja.getRange("BB" + i).setValue(comprobante);

        // Datos para BC
        var enlaceTeams = hoja.getRange("AH" + i).getValue();
        var mensaje = `Estimada persona estudiante:\n\n` +
                      `Su matrícula se gestionó de manera correcta.\n\n` +
                      `El inicio de las tutorías académicas será a partir del lunes 28 de julio del 2025, según horario matriculado. ` +
                      `En caso de que la tutoría matriculada se desarrolle de manera presencial, se les estará enviando un correo electrónico indicando el aula donde se desarrollarán las sesiones de tutorías académicas.\n\n` +
                      `A continuación, se adjunta enlace al grupo de TEAMS:\n${enlaceTeams}\n\n` +
                      `Toda persona estudiante matriculada, deberá unirse al grupo, pues Microsoft Teams será el medio oficial de comunicación entre la persona estudiante y la persona tutora.`;
        
        hoja.getRange("BC" + i).setValue(mensaje);
      }

    } catch (e) {
      Logger.log(`Error en hoja "${nombreHoja}": ${e.message}`);
    }
  });

  Logger.log("Proceso finalizado");
}


function marcaNuevasMatriculas(selectedSheets) {
  selectedSheets.forEach(function(sheet) {
    var nombreHojaRaiz = sheet;
    if (!nombreHojaRaiz) {
      return;
    }
     loadProperties();

    var hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);
    var ultimaFila = hojaRaiz.getLastRow();
    
    for (var fila = 4; fila <= ultimaFila; fila++) {
      var urlHojaCorreos = hojaRaiz.getRange('AD' + fila).getValue();
      if (!urlHojaCorreos) {
        continue; // Si no hay URL, salta a la siguiente fila
      }
      
      var hojaCorreos;
      try {
        hojaCorreos = SpreadsheetApp.openByUrl(urlHojaCorreos).getSheets()[0]; // Asume que la primera hoja es la correcta
      } catch (e) {
        continue; // Si hay un error al abrir la hoja, pasa a la siguiente fila
      }
      
      var ultimaFilaCorreos = hojaCorreos.getLastRow();
      if (ultimaFilaCorreos < 2) { 
        continue; // Si no hay datos, salta a la siguiente fila
      }
      
      var celdaAJ = hojaRaiz.getRange('AJ' + fila);
      
      var contador = 0;
      for (var i = 2; i <= ultimaFilaCorreos; i++) {
        var celda = hojaCorreos.getRange('B' + i);
        if (celda.getBackground() == '#ffffff' || celda.getBackground() == '#f8f9fa') {
          contador++;
        }
      }
      
      if (contador > 0) {
        celdaAJ.setBackground('#a1f0e1');
      }
      
      hojaActiva.toast(
        'Tutoría ' + hojaRaiz.getRange('G' + fila).getValue() + ' ' +
        hojaRaiz.getRange('H' + fila).getValue() + ' ' +
        hojaRaiz.getRange('I' + fila).getValue() + ' actualizada exitosamente',
        'Progreso',
        4
      );
      Utilities.sleep(3000);
    }
    
    
  });
}

