
function actualizarRetiros(selectedSheets) {
  loadProperties();
  selectedSheets.forEach(function(sheet) {


    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);

    //Obtengo la hoja de respuestas segun la hoja que riviso
    for(var fil=3;hojaArchivosBase.getRange('K'+fil).getValue()!="";fil++){
      if(hojaArchivosBase.getRange('K'+fil).getValue()==sheet){

        respuestas= SpreadsheetApp.openById(hojaArchivosBase.getRange('M'+fil).getValue());
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
          fecha = respuestas.getRange('A' + i).getValue();

          // Notificacion de proceso
          hojaActiva.toast('Retirando estudiante...','Progreso',3);
          Utilities.sleep(3000);

          // Llamar a la función que realiza la comparación implementada
          revisaRetiros();
          if(!encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(255,236,158);
          }
          else if(encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(182,215,168);
          }
        }
      }
    }
    actualizarEstadistica(sheet);
    ui.alert('Retiros y estadisticas de la hoja ' + hojaRaiz.getName() + ' completa actualizada exitosamente');
  });
  
}
