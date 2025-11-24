function obtenerNotificacionesTodas() {
  var sheets = [];

  for (var i = 2; hojaArchivosBase.getRange('B'+i).getValue()!=""; i++) {
    var area = hojaArchivosBase.getRange('B'+i);
    sheets.push(area.getValue());
  }

  const allNotifications = [];

  sheets.forEach(sheet => {
    const data = listaPendientes(sheet); 
    allNotifications.push({ sheet, data });
  });

  return allNotifications;
}

function listaPendientes(sheet) {
  loadProperties();

  var academico="";
  var listaP = [];
  var contador = 0;
  var estado = true;
  var pendientes = 0;
  var correo = "Fechas con asistencias pendientes:\n";

  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);
  var ultimaFila = hojaRaiz.getLastRow();

  for (var fila = 4; fila <= ultimaFila; fila++) {
    if (hojaRaiz.getRange('AE' + fila).getBackground() != "#ff0000") {
      pendientes = 0;
      var hojaAsistencia = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AE' + fila).getValue());
      academico=  hojaRaiz.getRange('C'+fila).getValue();
      var correoTutor = hojaRaiz.getRange('R'+fila).getValue();
      if (hojaAsistencia.getRange('I12').getValue() != "") {
        contador = 0;
        for (var j = 12; hojaAsistencia.getRange('A' + j).getValue() != ""; j++) {
          contador++;
        }

        var rangoFechas = hojaAsistencia.getRange('J11:Y11');
        var fechas = rangoFechas.getValues()[0];
        var hoy = new Date();
        var diaSemana = hoy.getDay();
        var lunesSemanaActual = new Date(hoy);
        lunesSemanaActual.setDate(hoy.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1));
        lunesSemanaActual.setHours(0, 0, 0, 0);

        var columnasAnteriores = [];
        for (var i = 0; i < fechas.length; i++) {
          var fechaCelda = new Date(fechas[i]);
          fechaCelda.setHours(0, 0, 0, 0);
          if (fechaCelda < lunesSemanaActual) {
            columnasAnteriores.push({ columna: columnaLetra(i + 10), fecha: fechaCelda.toLocaleDateString() });
          }
        }

        columnasAnteriores.forEach(function (columnaData) {
          var sinIns = 0;
          estado = true;
          for (var nFila = 0; nFila < contador; nFila++) {
            var value = hojaAsistencia.getRange(columnaData.columna + (12 + nFila)).getValue();
            if (["Presente", "Ausente", "Inactiva", "Feriado", "No desarrollada"].includes(value)) {
              estado = false;
              break;
            }
            if (value == "Sin inscripción") {
              sinIns++;
            }
          }

          if (sinIns == contador) {
            estado = false;
          }
          if (estado) {
            pendientes++;
            correo += "- " + columnaData.fecha + "\n";
          }
        });

        if (pendientes >= 1) {
          var prioridad = pendientes == 1 ? 0 : pendientes == 2 ? 3 : pendientes == 3 ? 2 : 1;
          var tutoria = {
            title: hojaAsistencia.getRange('D4').getValue() + " " + hojaAsistencia.getRange('J5').getValue(),
            message: 'Asistencias pendientes: ' + pendientes,
            link: hojaAsistencia.getUrl(),
            prioridad: prioridad,
            correoTutor: correoTutor,
            academico: academico,
            correo
          };
          listaP.push(tutoria);
        }
      }
    }
  }
  
  return listaP;
}

function obtenerNombresHojas() { 
  loadProperties();
  const spreadsheet = SpreadsheetApp.openById(idHojaRaiz);
  const sheets = spreadsheet.getSheets();
  const sheetNames = sheets.map(sheet => sheet.getName());
  return sheetNames;
}

function notificarTutor(data){

  var tutoria = data.title;
  var correoTutor = data.correoTutor;
  var correo = data.correo;
  var academico = data.academico;
  var correoAcademico = "";

  for (var i = 2; hojaArchivosBase.getRange('Z'+i).getValue()!=""; i++) {
    var nAcademico = hojaArchivosBase.getRange('Z'+i).getValue();
    
    if(academico == nAcademico){
      
      correoAcademico = hojaArchivosBase.getRange('AA'+i).getValue();
      break;
    }
    else{
      correoAcademico="tutorias@una.cr";
    }
  }
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S25').getValue();
  var cuerpo = hojaArchivosBase.getRange('T25').getValue().replace(/\n/g, "<br>");
  var tutoria = tutoria;
  var final = hojaArchivosBase.getRange('U25').getValue().replace(/\n/g, "<br>");
  correoM=correo;
  correo = correo.replace(/\n/g, "<br>");

  var mensaje = cuerpo+"<br><br>"+tutoria+"<br><br>"+correo+"<br><br>"+final;


  MailApp.sendEmail({
    to: correoTutor, // Deja este campo vacío para que no haya un destinatario principal
    cc:correoAcademico, // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
    subject: asunto,
    htmlBody: mensaje // Puedes usar htmlBody para enviar correos con formato HTML
  });

}

