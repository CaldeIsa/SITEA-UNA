var hojaRaiz = null;
var carpetaRespuesta = null;
var campus= null;
var periodo = null;
var hojaAsistenciaBase=null;
var fechaInicio=null;


function update_hojaAsistencia(data) {
  try {
    loadProperties();
    
    const nombreHoja = data.page;
    if (!nombreHoja) {
      return { success: false, error: "No se especificó el nombre de la hoja" };
    }

    hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHoja);
    
    if (!hojaRaiz) {
      return { success: false, error: "No se encontró la hoja: " + nombreHoja };
    }

    let filasActualizadas = 0;
    let errores = [];

    if (data.tipo === "grupal") {
      const resultado = actualizarHoja(data.fila);
      if (resultado.success) filasActualizadas++;
      else errores.push(resultado.error);
      
    } else if (data.tipo === "general") {
      const ultima = hojaRaiz.getLastRow();
      for (let f = 4; f <= ultima; f++) {
        const resultado = actualizarHoja(f);
        if (resultado.success) filasActualizadas++;
        else errores.push("Fila " + f + ": " + resultado.error);
      }
      
    } else if (data.tipo === "rango") {
      for (let f = data.filaIni; f <= data.filaFin; f++) {
        const resultado = actualizarHoja(f);
        if (resultado.success) filasActualizadas++;
        else errores.push("Fila " + f + ": " + resultado.error);
      }
    }

    SpreadsheetApp.flush();
    SpreadsheetApp.flush();
    SpreadsheetApp.flush();
    Utilities.sleep(1000);

    if (errores.length === 0) {
      return {
        success: true,
        message: "✅ " + filasActualizadas + " hojas actualizadas exitosamente",
        data: { filasActualizadas }
      };
    } else if (filasActualizadas > 0) {
      return {
        success: true,
        message: "⚠️ " + filasActualizadas + " actualizadas, " + 
                 errores.length + " con errores",
        data: { filasActualizadas, errores }
      };
    } else {
      return {
        success: false,
        error: "No se pudo actualizar ninguna hoja",
        data: { errores }
      };
    }
    
  } catch (error) {
    SpreadsheetApp.flush();
    return { success: false, error: error.message };
  }
}

function create_hojaAsistencia(data) {
  loadProperties();

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);
  
  carpetaRespuesta=carpetaHojasAsistencia;
  hojaAsistenciaBase = baseHojaAsistencia;
  fechaInicio=data.fecha;
  campus= data.campus;
  periodo= data.periodo;

  var fila;
  var filaIni;
  var filaFin;

  if(data.tipo=="grupal"){
    fila = data.fila;
    crearHoja(fila);
  }else if(data.tipo == "general"){
    var ultimaFila = hojaRaiz.getLastRow();
    for (var fila = 4; fila <= ultimaFila; fila++) {
      crearHoja(fila);
    }
  }
  else if(data.tipo == "rango"){
    filaIni = parseInt(data.filaIni, 10);
    filaFin = parseInt(data.filaFin, 10);
    for (var fila=filaIni ; fila <= filaFin; fila++) {
      crearHoja(fila);
    }
  }  

}

function hojaAs(data) {
  loadProperties();

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);
  
 carpetaRespuesta=carpetaHojasAsistencia;
 hojaAsistenciaBase = baseHojaAsistencia;
 fechaInicio=data.fecha;
 campus= data.campus;
 periodo= data.periodo;
  // Obtener el nombre de la carpeta a partir de su ID
  var carpetaNombre = carpetaRespuesta.getName();
  var archivoNombre = hojaAsistenciaBase.getName();

  var mensaje = "Se crearán hojas de asistencia con los siguientes datos:\n\n" +
                "Hoja de Cálculo: " + nombreHojaRaiz + "\n" +
                "Período: " + data.periodo + "\n" +
                "Fecha: " + data.fecha + "\n" +
                "Hoja de Asistencia base: " + archivoNombre + "\n" +
                "Carpeta destino: " + carpetaNombre + "\n\n" +
                "¿Son estos datos correctos?";
  
  var confirmacion = ui.alert('Confirmar Datos', mensaje, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {
    var fila;
    var filaIni;
    var filaFin;

    if(data.tipo=="grupal"){
      fila = data.fila;
      crearHoja(fila);
      ui.alert("Hoja de asistencia "+ hojaRaiz.getName()+" creada exitosamente.");
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        crearHoja(fila);
      }
      ui.alert("Hojas de asistencia "+ hojaRaiz.getName()+" creadas exitosamente.");
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        crearHoja(fila);
      }
      ui.alert("Hojas de asistencia "+ hojaRaiz.getName()+" creadas exitosamente.");
    } 

  } 

}

function obtenerDia(nombreDia){

  var dias = {
      "Domingo": 0,
      "Lunes": 1,
      "Martes": 2,
      "Miércoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sábado": 6
    };

    if (dias.hasOwnProperty(nombreDia)) {
      return dias[nombreDia];
    } else {
      // Si el nombre del día no está en el diccionario, devuelve -1 como indicador de error
      return -1;
    }
}

function actualizarHoja(fila) {
  try {
    const url = hojaRaiz.getRange("AE" + fila).getValue();
    const id = extraerIdDesdeUrl(url);
    
    if (!id) {
      return { 
        success: false, 
        error: "No existe URL de hoja de asistencia" 
      };
    }

    const hojaCopia = SpreadsheetApp.openById(id)
                                    .getSheetByName("Hoja 1");
    
    if (!hojaCopia) {
      return { 
        success: false, 
        error: "No se pudo abrir la hoja de asistencia" 
      };
    }

    // Actualizar datos
    hojaCopia.getRange("D4:F4").setValue(
      hojaRaiz.getRange("G" + fila).getValue()
    );
    hojaCopia.getRange("D7:F7").setValue(
      hojaRaiz.getRange("P" + fila).getValue()
    );
    hojaCopia.getRange("G7").setValue(
      hojaRaiz.getRange("Q" + fila).getValue()
    );
    hojaCopia.getRange("J3").setValue(
      hojaRaiz.getRange("H" + fila).getValue()
    );
    hojaCopia.getRange("J5").setValue(
      hojaRaiz.getRange("I" + fila).getValue()
    );
    hojaCopia.getRange("J7:M7").setValue(
      hojaRaiz.getRange("AB" + fila).getValue()
    );
    hojaCopia.getRange("G4").setValue(
      hojaRaiz.getRange("F" + fila).getValue()
    );

    // Recalcular fechas
    const fechaInicio = hojaRaiz.getRange("AD" + fila).getValue();
    if (fechaInicio) {
      let fecha = new Date(fechaInicio);
      const diaTutorias = obtenerDia(
        hojaRaiz.getRange("AA" + fila).getValue()
      );
      let col = 10, count = 0;
      
      while (count < 16) {
        if (fecha.getDay() === diaTutorias) {
          hojaCopia.getRange(11, col).setValue(
            fecha.toLocaleDateString()
          );
          col++;
          count++;
        }
        fecha.setDate(fecha.getDate() + 1);
      }
    }

    return { success: true, fila };

  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}


function extraerIdDesdeUrl(url) {
  var match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

function crearHoja(fila) {

    var nombreCopiaAsistencia = 'Registro de Asistencia ' + campus+" "+ hojaRaiz.getRange('G' + fila).getValue() + ' ' + hojaRaiz.getRange('H' + fila).getValue() + ' ' + hojaRaiz.getRange('I' + fila).getValue();
    var copia = hojaAsistenciaBase.makeCopy(nombreCopiaAsistencia, carpetaRespuesta);
    var hojaCopia = SpreadsheetApp.openById(copia.getId()).getSheetByName('Hoja 1');

    hojaCopia.getRange('D4:F4').setValue(hojaRaiz.getRange('G' + fila).getValue()); //Nombre Tutoria
    hojaCopia.getRange('D7:F7').setValue(hojaRaiz.getRange('P' + fila).getValue()); //Nombre Tutor
    hojaCopia.getRange('G7').setValue(hojaRaiz.getRange('Q' + fila).getValue()); //Cedula Tutor
    hojaCopia.getRange('J3').setValue(hojaRaiz.getRange('H' + fila).getValue()); //Codigo Curso
    hojaCopia.getRange('J5').setValue(hojaRaiz.getRange('I' + fila).getValue()); //Grupo
    hojaCopia.getRange('J7:M7').setValue(hojaRaiz.getRange('AB' + fila).getValue()); //Horario
    hojaCopia.getRange('G4').setValue(hojaRaiz.getRange('F' + fila).getValue()); //Modalidad
    hojaCopia.getRange('M3:N3').setValue(campus); //Campus
    hojaCopia.getRange('M5:N5').setValue(periodo); //Periodo


    var fechaActual = new Date(fechaInicio);
    var colIni = 10
    var contador = 0;

    while(contador<16){

      var diaSemana = fechaActual.getDay();

      if (diaSemana === obtenerDia(hojaRaiz.getRange('AA'+fila).getValue())) {
        hojaCopia.getRange(11,colIni).setValue(fechaActual.toLocaleDateString());
        contador++;
        colIni++;
      }
      
      fechaActual.setDate(fechaActual.getDate() + 1);
      
    }
    //hojaCopia.getRange(11, 10 + j).setValue(fechas[j]);
    hojaRaiz.getRange('AE' + fila).setValue(copia.getUrl());
    hojaActiva.toast('Tutoria ' + hojaRaiz.getRange('G'+fila).getValue()+' '+hojaRaiz.getRange('H'+fila).getValue()+ ' '+hojaRaiz.getRange('I'+fila).getValue() + ' creada exitosamente','Progreso',4);
}

function delete_hojaAsistencia(data){
  
  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) {
    return;
  }
  
  loadProperties();
  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  
    var fila;
    var filaIni;
    var filaFin;

    if(data.tipo=="grupal"){
      fila = data.fila;
      eliminarHoja(fila);
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        eliminarHoja(fila);
      }
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        eliminarHoja(fila);
      }
    }
}


function eliminarHojasAsistencia(data){
  
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

    if(data.tipo=="grupal"){
      fila = data.fila;
      eliminarHoja(fila);
      ui.alert('Hoja de asistencia eliminada exitosamente');
    }else if(data.tipo == "general"){
      var ultimaFila = hojaRaiz.getLastRow();
      for (var fila = 4; fila <= ultimaFila; fila++) {
        eliminarHoja(fila);
      }
      ui.alert('Hojas de asistencia eliminadas exitosamente');
    }
    else if(data.tipo == "rango"){
      filaIni = parseInt(data.filaIni, 10);
      filaFin = parseInt(data.filaFin, 10);
      for (var fila=filaIni ; fila <= filaFin; fila++) {
        eliminarHoja(fila);
      }
      ui.alert('Hojas de asistencia eliminadas exitosamente');
    }
  
  }
}

function eliminarHoja(fila) {
  
  column="AE";

  var hojaUrl= hojaRaiz.getRange(column+fila).getValue();
  
  if (hojaUrl) {
    try {
      var hojaId = SpreadsheetApp.openByUrl(hojaUrl).getId();
      var file = DriveApp.getFileById(hojaId);
      file.setTrashed(true);

      hojaRaiz.getRange(column + fila).setValue("");

    } catch (e) {
      ui.alert('Error al intentar eliminar la hoja de asistencia: ' + column +fila);
    }
  } else {
    ui.alert('No se encontró la URL de la hoja de asistencia en la celda '+column +fila);
  }
}


