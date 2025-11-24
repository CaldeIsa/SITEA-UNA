function actualizarAsistenciaV(selectedSheets) {

  loadProperties();

  selectedSheets.forEach(function(sheet) {

    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);


    var lastRowRaiz = hojaRaiz.getLastRow();

    for (var j = 4; j <= lastRowRaiz; j++) {

      respuestas= SpreadsheetApp.openByUrl(hojaRaiz.getRange('AG'+j).getValue());

      hojaAsistencia = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + j).getValue());

      var lastRowRespuestas = respuestas.getLastRow();

      //Entra a la hoja de respuestas 
      for (var i = 2; i <= lastRowRespuestas; i++) {
        estudianteCorreo=respuestas.getRange('B'+i).getValue();
        fecha = respuestas.getRange('A' + i).getValue();
        
        revisaAsistenciaV();
        if(!encontrado){
          respuestas.getRange('B' + i).setBackgroundRGB(255,236,158);
        }
        else if(encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(182,215,168);
          }
      }
      hojaActiva.toast('Hoja ' + hojaRaiz.getRange('G'+j).getValue()+' '+hojaRaiz.getRange('H'+j).getValue()+ ' '+hojaRaiz.getRange('I'+j).getValue() + ' actualizada exitosamente','Progreso',4);
    }
    
  });  
}

function revisaAsistenciaV(){

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
        
        // Establecer la hora a medianoche para eliminar las horas, minutos y segundos
        fechaM.setHours(0,0,0,0);
        fechaCelda.setHours(0, 0, 0, 0);
        
        if (fechaM.getTime() == fechaCelda.getTime()) {
          hojaAsistencia.getRange(columnaLetra(i + 10) + j).setValue("Presente");
          break;
        }
        else{
          encontrado=false;
        }

      }
      break;
    }
        
  }
}

