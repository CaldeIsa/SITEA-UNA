function actualizarJustificaciones(selectedSheets) {
  loadProperties();

  selectedSheets.forEach(function(sheet) {

    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);

    //Obtengo la hoja de respuestas segun la hoja que reviso
    for(var fil=3;hojaArchivosBase.getRange('K'+fil).getValue()!="";fil++){
      if(hojaArchivosBase.getRange('K'+fil).getValue()==sheet){

        respuestas= SpreadsheetApp.openById(hojaArchivosBase.getRange('P'+fil).getValue());
      }
    }

    ui.alert("Respuestas "+ respuestas.getName());

    var lastRowRespuestas = respuestas.getLastRow();
    var lastRowRaiz = hojaRaiz.getLastRow();
  
    // Iterar sobre las filas de la hoja de respuestas
    for (var i = 2; i <= lastRowRespuestas; i++) {

      var valorH = respuestas.getRange('G' + i).getValue();
      
      // Iterar sobre las filas de la hoja raíz
      for (var j = 4; j <= lastRowRaiz; j++) {
        var valorG = hojaRaiz.getRange('G' + j).getValue()+" "+ hojaRaiz.getRange('H' + j).getValue() + " "+ hojaRaiz.getRange('I' + j).getValue();
        
        
        if (valorH == valorG) {
          
          hojaAsistencia = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + j).getValue());
          estudianteCorreo=respuestas.getRange('B'+i).getValue();
          fecha = respuestas.getRange('I' + i).getValue();

          // Notificacion de proceso
          hojaActiva.toast('Justificando estudiante...','Progreso',3);
          Utilities.sleep(3000);

          revisaJustificacion();
          if(encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(209,231,114);
          }
          else if(!encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(255,236,158);
          }
        }
      }
    }
    ui.alert('Justificaciones de la hoja ' + hojaRaiz.getName() + ' completa actualizada exitosamente');
  });  
}

function revisaJustificacion(){

  for (var j = 12; hojaAsistencia.getRange('A' + j).getValue() != ""; j++) {

    encontrado = false;
    
    //Obtiene el correo del estudiante en la lista de asistencia
    var estudianteAsistenciaCorreo = hojaAsistencia.getRange('I' + j).getValue();

    //Revisa si el correo se encuentra 
    if (estudianteCorreo == estudianteAsistenciaCorreo) {

      encontrado = true;
    }

    //Si lo encurntra revisa las fechas para registrar el retiro
    if (encontrado) {

    
      var fechaM = new Date(fecha);


      // Obtener las fechas de las celdas J11 a Y11
      var rangoFechas = hojaAsistencia.getRange('J11:Y11');
      var fechas = rangoFechas.getValues()[0];

      for (var i = 0; i < fechas.length; i++) {  
        
        var fechaCelda = new Date(fechas[i]);
        
        if (fechaM.getTime() == fechaCelda.getTime()) {
          hojaAsistencia.getRange(columnaLetra(i + 10) + j).setValue("Justifica");
          break;
        }

      }
      break;
    }
        
  }
}

