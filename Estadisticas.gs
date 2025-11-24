/*Esta funcion se llama en el boton actualizar estadisticas evaluaciones, se utiliza para recopilar 
cuantos estudiantes realizaron la evaluacion*/
function actualizarInformes() {

    loadProperties();
    var sheets= ["Art.9", "Especializadas"]

    sheets.forEach(function(sheet) {

      var nombreHojaRaiz = sheet;
      if (!nombreHojaRaiz) {
        return;
      }

      hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila1 = 4; fila1 <= ultimaFila; fila1++) {

        if(hojaRaiz.getRange('AX'+fila1).getBackground()=="#ff0000"){
          hojaRaiz.getRange('AY' + fila1).setValue("Cerrada");
          continue;
        }
        var cont = 0;
        
        // Intentamos abrir la hoja por URL usando try-catch
        try {
          var informes = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AX' + fila1).getValue());
          
        } catch (error) {
          ui.alert('Error al abrir la hoja de evaluaciones en la fila ' + fila1+ " hoja "+sheet);
          hojaRaiz.getRange('AY' + fila1).setValue("Error");
          continue; // Salta esta fila y sigue con la siguiente
        }

        var ultimoInforme = informes.getLastRow();
        for (var i = 2; i <= ultimoInforme; i++) {
          cont++;
        }

        hojaRaiz.getRange('AY' + fila1).setValue(cont);

        hojaActiva.toast('Tutoria ' + hojaRaiz.getRange('G'+fila1).getValue()+' '+hojaRaiz.getRange('H'+fila1).getValue()+ ' '+hojaRaiz.getRange('I'+fila1).getValue() + ' actualizada exitosamente','Progreso',4);
        Utilities.sleep(3000);
        
      }
    });
}