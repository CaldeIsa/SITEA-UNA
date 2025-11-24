var respuestas = null;
var hojaRaiz=null;
var hojaAsistencia = null;
var promedio=0;
var estudianteCorreo= null;
var fecha=null;
var encontrado=null;

/*Esta funcion se llama en ActualizaRetiros, se utiliza para definir en cual hoja general
se va a actualizar los retiros en las hojas de asistencia, 
en esta funcion se llama a revisaRetiros y actualizarEstadistica */


function actualizarRetiros1(selectedSheets) {
  loadProperties();
  selectedSheets.forEach(function(sheet) {


    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);

    //Obtengo la hoja de respuestas segun la hoja que riviso
    for(var fil=3;hojaArchivosBase.getRange('K'+fil).getValue()!="";fil++){
      if(hojaArchivosBase.getRange('K'+fil).getValue()==sheet){

        respuestas= SpreadsheetApp.openById(hojaArchivosBase.getRange('M'+fil).getValue());
      }
    }

    var lastRowRespuestas = respuestas.getLastRow();
    var lastRowRaiz = hojaRaiz.getLastRow();
    
    // Iterar sobre las filas de la hoja de respuestas
    for (var i = 2; i <= lastRowRespuestas; i++) {

      var valorH = respuestas.getRange('G' + i).getValue();
      
      if(idHojaRaiz==hojaArchivosBase.getRange('A6').getValue()){
        var valorH = respuestas.getRange('G' + i).getValue().toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
      }
      else if(idHojaRaiz==hojaArchivosBase.getRange('A8').getValue()){
        var valorH = respuestas.getRange('H' + i).getValue().toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
      }
      
      // Iterar sobre las filas de la hoja raíz
      for (var j = 4; j <= lastRowRaiz; j++) {
        var valorG = (hojaRaiz.getRange('G' + j).getValue()+" "+ hojaRaiz.getRange('H' + j).getValue() + " "+ hojaRaiz.getRange('I' + j).getValue()).toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        var bG = respuestas.getRange('B' + i).getBackground();

        if(bG=="#b6d7a8"){
          break;
        }

        if (valorH == valorG) {
          
          hojaAsistencia = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + j).getValue());
          estudianteCorreo=respuestas.getRange('B'+i).getValue();

          fecha = respuestas.getRange('A' + i).getValue();

          // Notificacion de proceso
          hojaActiva.toast('Retirando estudiante...','Progreso',3);
          Utilities.sleep(3000);

          // Llamar a la función que realiza la comparación implementada
          revisaRetiros();
          if(encontrado){
            respuestas.getRange('B' + i).setBackgroundRGB(182,215,168);
          }
          else {
            respuestas.getRange('B' + i).setBackground("#ffec9e");
          }
        }
      }
      
    }
    actualizarEstadistica(sheet);
  });
  
}

/*Esta funcion se llama en ActualizaMatriculas, se utiliza para definir en cual hoja general 
se va a actualizar la hoja de asistencia en cuanto a matriculas, en esta funcion se llama a revisaMatricula y actualizarEstadistica*/
function actualizarHojaAsistencia(selectedSheets) {
  selectedSheets.forEach(function(sheet) {

    var mensaje = "¿Desea actualizar la matrícula de "+ sheet+"?";
  
    var confirmacion = ui.alert('Confirmar Datos', mensaje, ui.ButtonSet.YES_NO);
  
    // Verificar la respuesta del usuario
    if (confirmacion === ui.Button.YES) {
      var nombreHojaRaiz = sheet;
      if (!nombreHojaRaiz) {
        return;
      }

      hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila1 = 4; fila1 <= ultimaFila; fila1++) {
        revisaMatricula(fila1);
        hojaActiva.toast('Hoja ' + hojaRaiz.getRange('G'+fila1).getValue()+' '+hojaRaiz.getRange('H'+fila1).getValue()+ ' '+hojaRaiz.getRange('I'+fila1).getValue() + ' actualizada exitosamente','Progreso',4);
        Utilities.sleep(3000);
      }

      actualizarEstadistica(sheet);

      ui.alert('Estadisticas y matriculas de hoja ' + hojaRaiz.getName() + ' completa actualizada exitosamente');
      
    }else{
      ui.alert("Operación cancelada")
    }
  });
    
}

function actualizarHojaAsistencia1(selectedSheets) {
  loadProperties();
  selectedSheets.forEach(function(sheet) {

      var nombreHojaRaiz = sheet;
      if (!nombreHojaRaiz) {
        return;
      }

      hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila1 = 4; fila1 <= ultimaFila; fila1++) {
        revisaMatricula(fila1);
        Utilities.sleep(3000);
      }

      actualizarEstadistica(sheet);
      
  });
    
}

/*Esta funcion se llama en actualizarHojaAsistencia, se utiliza para ver la hoja de respuestas de la tutoria
compararla con la hoja de asistencia y agregar a los estudiantes matriculados, en esta funcion se llama a actualizarParticipacion */
function revisaMatricula(fila1) {

  loadProperties();
  var color = hojaRaiz.getRange('A' + fila1).getBackground();
  if (color === "#ff0000") {
    Logger.log("Fila " + fila + " omitida por tener fondo rojo.");
    return; // Sale de la función sin hacer nada
  }

  var f = 12;

  respuestas = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila1).getValue());
  hojaAsistencia = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + fila1).getValue());

  var ultimaFilaRespuestas = respuestas.getLastRow();

  for (var fila = 2; fila <= ultimaFilaRespuestas; fila++) {
    var estudianteCorreo = respuestas.getRange('B' + fila).getValue();
    var fechamatricula = respuestas.getRange('A' + fila).getValue();
    var cedula = respuestas.getRange('J' + fila).getValue();
    var nombre = respuestas.getRange('I' + fila).getValue();
    var pApellido = respuestas.getRange('G' + fila).getValue();
    var sApellido = respuestas.getRange('H' + fila).getValue();
    var telefono = respuestas.getRange('K' + fila).getValue();
    var carrera = respuestas.getRange('R' + fila).getValue();

    var encontrado = false;

    // Revisa si la celda I12 está vacía para el primer dato
    if (hojaAsistencia.getRange('I12').getValue() == "") {
      hojaAsistencia.getRange('B' + f).setValue(fechamatricula);
      hojaAsistencia.getRange('C' + f).setValue(cedula);
      hojaAsistencia.getRange('D' + f).setValue(nombre);
      hojaAsistencia.getRange('E' + f).setValue(pApellido);
      hojaAsistencia.getRange('F' + f).setValue(sApellido);
      hojaAsistencia.getRange('G' + f).setValue(telefono);
      hojaAsistencia.getRange('H' + f).setValue(carrera);
      hojaAsistencia.getRange('I' + f).setValue(estudianteCorreo);

      // Obtener la fecha de la celda B12
      var fechaB12 = hojaAsistencia.getRange('B12').getValue();
      var fechaM = new Date(fechaB12);

      // Obtener las fechas de las celdas J11 a Y11
      var rangoFechas = hojaAsistencia.getRange('J11:Y11');
      var fechas = rangoFechas.getValues()[0];

      // Recorrer las fechas y verificar si fechaM es mayor que alguna de ellas
      for (var i = 0; i < fechas.length; i++) {
        var fechaCelda = new Date(fechas[i]);

        if (fechaM > fechaCelda) {
          hojaAsistencia.getRange(columnaLetra(i + 10) + '12').setValue("Sin inscripción");
        }
      }
      continue; // Pasar al siguiente estudiante
    }

    // Buscar estudiante en la hoja de asistencia
    for (var j = f; hojaAsistencia.getRange('A' + j).getValue() != ""; j++) {
      var estudianteAsistenciaCorreo = hojaAsistencia.getRange('I' + j).getValue();
      if (estudianteCorreo == estudianteAsistenciaCorreo) {
        encontrado = true;
        break;
      }
    }

    // Si no se encuentra, agregar una nueva fila
    if (!encontrado) {
      hojaAsistencia.insertRowAfter(j - 1);
      hojaAsistencia.getRange('B' + j).setValue(fechamatricula);
      hojaAsistencia.getRange('C' + j).setValue(cedula);
      hojaAsistencia.getRange('D' + j).setValue(nombre);
      hojaAsistencia.getRange('E' + j).setValue(pApellido);
      hojaAsistencia.getRange('F' + j).setValue(sApellido);
      hojaAsistencia.getRange('G' + j).setValue(telefono);
      hojaAsistencia.getRange('H' + j).setValue(carrera);
      hojaAsistencia.getRange('I' + j).setValue(estudianteCorreo);


      hojaAsistencia.getRange('A' + j).setValue(hojaAsistencia.getRange('A' + (j - 1)).getValue() + 1);
      hojaAsistencia.getRange('Z' + j).setFormula('=COUNTIF(J' + j + ':Y' + j + '; "Ausente")');
      hojaAsistencia.getRange('AA' + j).setFormula('=COUNTIF(J' + j + ':Y' + j + '; "Presente")');
      hojaAsistencia.getRange('AB' + j).setFormula('=COUNTIF(J' + j + ':Y' + j + '; "Justifica")');
      hojaAsistencia.getRange('AC' + j).setFormula('=16-(COUNTIF(J' + j + ':Y' + j + ';"Sin inscripción") + COUNTIF(J' + j + ':Y' + j + '; "Inactiva") + COUNTIF(J' + j + ':Y' + j + '; "No desarrollada") + COUNTIF(J' + j + ':Y' + j + '; "Feriado"))');
      hojaAsistencia.getRange('AD' + j).setFormula('=AA' + j + '/ AC' + j + '*100');

      var fecha = hojaAsistencia.getRange('B' + j).getValue();
      var fechaM = new Date(fecha);

      // Obtener las fechas de las celdas J11 a Y11
      var rangoFechas = hojaAsistencia.getRange('J11:Y11');
      var fechas = rangoFechas.getValues()[0];

      // Recorrer las fechas y verificar si fechaM es mayor que alguna de ellas
      for (var i = 0; i < fechas.length; i++) {
        var fechaCelda = new Date(fechas[i]);

        if (fechaM > fechaCelda) {
          hojaAsistencia.getRange(columnaLetra(i + 10) + j).setValue("Sin inscripción");
        }
      }
    }
  }
  actualizarParticipacion();
  hojaRaiz.getRange('AP' + fila1).setValue(promedio);

}

//Esta funcion se utiliza para ver cual letra es la columna a partir de un numero
function columnaLetra(columnIndex) {
  return String.fromCharCode(64 + columnIndex);
}

/*Esta funcion se llama en revisaMatricula, se utiliza para actualizar el procentaje de participacion de la tutoria*/
function actualizarParticipacion(){
  var estadistica=0;
  var cont=0;
  for (var j = 12; hojaAsistencia.getRange('A' + j).getValue() != ""; j++) {
    estadistica += hojaAsistencia.getRange('AD' + j).getValue();
    cont++;
  }
  promedio=estadistica/cont;
  hojaAsistencia.getRange('AE11').setValue(promedio);
  
}

/*Esta funcion se llama en actualizarRetiros, se utiliza para ver la hoja de respuestas de retiros del area,
compararla con las hoja de asistencia y retirar a los estudiantes*/
function revisaRetiros(){

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
        if (fechaM <= fechaCelda) {
          hojaAsistencia.getRange(columnaLetra(i + 10) + j).setValue("Retira");
        }
      }
      break;
    }
        
  }
}

/*Esta funcion se llama en actualizarRetiros, actualizarHojaAsistencia, se utiliza para actualizar
los datos estadisticos de solo una hoja general, en esta funcion se llama a actualizarEstadisticasRetiros*/
function actualizarEstadistica(sheet) {

    loadProperties();

    var nombreHojaRaiz = sheet;
    if (!nombreHojaRaiz) {
      return;
    }
    
    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

    for (var fila1 = 4; hojaRaiz.getRange('A'+fila1).getValue() != ""; fila1++) {

      try {
        var matriculas = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD'+fila1).getValue());

        var ultimaMatricula = matriculas.getLastRow();

        var f=0;
        var m=0;
        var nb=0;
        var ne=0;
        var cont=0;

        for (var i = 2; i <= ultimaMatricula; i++) {
          cont++;
          var sexo = matriculas.getRange('F'+i).getValue();

          if(sexo == "Femenino"){
            f++;
          }else if(sexo == "Masculino"){
            m++;
          }else if(sexo == "No binario"){
            nb++;
          }else if(sexo == "Prefiere no especificar"){
            ne++;
          }
        }
        hojaRaiz.getRange('AJ'+fila1).setValue(cont);
        hojaRaiz.getRange('AK'+fila1).setValue(m);
        hojaRaiz.getRange('AL'+fila1).setValue(f);
        hojaRaiz.getRange('AM'+fila1).setValue(nb);
        hojaRaiz.getRange('AN'+fila1).setValue(ne);

        hojaAsistencia=SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + fila1).getValue());
        var retiros=actualizarEstadisticasRetiros(hojaAsistencia);

        actualizarParticipacion();
        hojaRaiz.getRange('AP' + fila1).setValue(promedio);
        
        hojaRaiz.getRange('AO'+fila1).setValue(retiros);

        hojaRaiz.getRange('AQ'+fila1).setValue(cont-retiros);

      } catch (error) {
        Logger.log("Error al abrir "+sheet+" fila "+fila1)
      }
      
    }
  
}

/*Esta funcion se llama en actualizarRetiros, actualizarHojaAsistencia y ActualizarEstadisticas, se utiliza para actualizar
los datos estadisticos de solo varias hojas generales, en esta funcion se llama a actualizarEstadisticasRetiros*/
function actualizarEstadisticas(selectedSheets) {
  loadProperties();
  selectedSheets.forEach(function(sheet) {
    var nombreHojaRaiz = sheet;
    if (!nombreHojaRaiz) {
      return;
    }

    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

    var ultimaFila = hojaRaiz.getLastRow();
    for (var fila1 = 4; fila1 <= ultimaFila; fila1++) {
      var matriculas = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD'+fila1).getValue());

      var ultimaMatricula = matriculas.getLastRow();

      var f=0;
      var m=0;
      var nb=0;
      var ne=0;
      var cont=0;

      for (var i = 2; i <= ultimaMatricula; i++) {
        cont++;
        var sexo = matriculas.getRange('F'+i).getValue();

        if(sexo == "Femenino"){
          f++;
        }else if(sexo == "Masculino"){
          m++;
        }else if(sexo == "No binario"){
          nb++;
        }else if(sexo == "Prefiere no especificar"){
          ne++;
        }
        
      }

      hojaRaiz.getRange('AJ'+fila1).setValue(cont);
      hojaRaiz.getRange('AK'+fila1).setValue(m);
      hojaRaiz.getRange('AL'+fila1).setValue(f);
      hojaRaiz.getRange('AM'+fila1).setValue(nb);
      hojaRaiz.getRange('AN'+fila1).setValue(ne);

      hojaAsistencia=SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + fila1).getValue());
      var retiros=actualizarEstadisticasRetiros(hojaAsistencia);

      actualizarParticipacion();
      hojaRaiz.getRange('AP' + fila1).setValue(promedio);

      hojaRaiz.getRange('AO'+fila1).setValue(retiros);

      hojaRaiz.getRange('AQ'+fila1).setValue(cont-retiros);

      SpreadsheetApp.getActiveSpreadsheet().toast(
        'Tutoria ' + hojaRaiz.getRange('G' + fila1).getValue() + ' ' + 
        hojaRaiz.getRange('H' + fila1).getValue() + ' ' + 
        hojaRaiz.getRange('I' + fila1).getValue() + ' actualizada exitosamente', 
        'Actualización Exitosa'
      );

    }
  });
  marcaNuevasMatriculas(selectedSheets);
}

/*Esta funcion se llama en actualizarEstadistica y actualizarEstadisticas, se utiliza para recopilar cuantos retiros
tiene una tutoria y devuelve el valor con un return*/
function actualizarEstadisticasRetiros(hojaAsistencia){
  
  var cont=0;

  for (var j = 12; hojaAsistencia.getRange('A' + j).getValue() != ""; j++) {
    for(var i=10; i<=16;i++){
      if(hojaAsistencia.getRange(columnaLetra(i) + j).getValue()=="Retira"){
        cont++;
        break;
      } 
    }

  }

  return cont;
}

/*Esta funcion se llama en el boton actualizar estadisticas evaluaciones, se utiliza para recopilar 
cuantos estudiantes realizaron la evaluacion*/
function actualizarEstadisticasEvaluacion(selectedSheets) {

  loadProperties();
  
  selectedSheets.forEach(function(sheet) {
    var nombreHojaRaiz = sheet;
    if (!nombreHojaRaiz) {
      return;
    }

    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

    var ultimaFila = hojaRaiz.getLastRow();
    for (var fila1 = 4; fila1 <= ultimaFila; fila1++) {

      if(hojaRaiz.getRange('AU'+fila1).getBackground()=="#ff0000"){
        hojaRaiz.getRange('AV' + fila1).setValue("Cerrada");
        continue;
      }
      var cont = 0;
      
      // Intentamos abrir la hoja por URL usando try-catch
      try {
        var evaluaciones = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AU' + fila1).getValue());
        
      } catch (error) {
        Logger.log('Error al abrir la hoja de evaluaciones en la fila ' + fila1+ " hoja "+sheet);
        hojaRaiz.getRange('AV' + fila1).setValue("Error");
        continue; // Salta esta fila y sigue con la siguiente
      }

      var ultimaEvaluacion = evaluaciones.getLastRow();
      for (var i = 2; i <= ultimaEvaluacion; i++) {
        cont++;
      }

      hojaRaiz.getRange('AV' + fila1).setValue(cont);
      hojaActiva.toast('Generando datos...', 'Progreso', 3);
      Utilities.sleep(3000);
    }
  });
}

