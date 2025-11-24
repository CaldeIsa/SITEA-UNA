function crearCorreoTutor(data) {

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) return;

  loadProperties();

  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  // Mapeo de funciones según el tipo de formulario
  var funcionesEnvio = {
    "AsistenciaVirtual": enviarCorreoAsistenciaVirtual,
    "CorreoContrato": enviarCorreoContrato,
    "InformeMensual": enviarCorreoInformeMensual
  };

  var funcionEnvio = funcionesEnvio[data.formType];
  if (!funcionEnvio) return;

  enviarCorreosPorTipo(hojaRaiz, data, funcionEnvio);
}

function crearCorreoTodos(data) {

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) return;

  loadProperties();

  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  // Mapeo de funciones según el tipo de formulario
  var funcionesEnvio = {
    "AsignacionAula": enviarCorreoAula,
    "ReAsignacionAula": enviarCorreoReasignacion,
    "Espera": enviarCorreoEspera,
    "Cierre": enviarCorreoCierre // Parece un duplicado, confirmar si debe ser distinto
    
  };

  var funcionEnvio = funcionesEnvio[data.formType];
  if (!funcionEnvio) return;

  enviarCorreosPorTipo(hojaRaiz, data, funcionEnvio);
}

function crearCorreoEstudiante(data) {

  var nombreHojaRaiz = data.page;
  if (!nombreHojaRaiz) return;

  loadProperties();

  hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(nombreHojaRaiz);

  // Mapeo de funciones según el tipo de formulario
  var funcionesEnvio = {
    "Evaluacion": enviarCorreosEvaluacion,
    "Links": enviarCorreosLinks,
    "Personalizado": enviarCorreoPersonalizadoEstudiante,
    "Nuevos": enviarCorreoNuevos
  };

  var funcionEnvio = funcionesEnvio[data.formType];
  if (!funcionEnvio) return;

  if (data.formType === "Personalizado") {
    hojaArchivosBase.getRange('B38').setValue(data.asunto);
    hojaArchivosBase.getRange('C38').setValue(data.correo);
  }

  enviarCorreosPorTipo(hojaRaiz, data, funcionEnvio);
}

function enviarCorreosPorTipo(hoja, data, funcionEnvio) {
  var filaIni, filaFin;

 switch (data.tipo) {
  case "grupal":
    var color = hojaRaiz.getRange('A' + data.fila).getBackground();
    if (color === "#ff0000") {
      Logger.log("Fila " + data.fila + " omitida por tener fondo rojo.");
      break;
    }

  funcionEnvio(data.fila);
  break;

  case "general":
    filaIni = 4;
    filaFin = hoja.getLastRow();
    for (var fila = filaIni; fila <= filaFin; fila++) {
      var color = hojaRaiz.getRange('A' + fila).getBackground();
      if (color === "#ff0000") {
        Logger.log("Fila " + fila + " omitida por tener fondo rojo.");
        continue;
      }
      funcionEnvio(fila);
    }
    break;

  case "rango":
    filaIni = parseInt(data.filaIni, 10);
    filaFin = parseInt(data.filaFin, 10);
    for (var fila = filaIni; fila <= filaFin; fila++) {
      var color = hojaRaiz.getRange('A' + fila).getBackground();
      if (color === "#ff0000") {
        Logger.log("Fila " + fila + " omitida por tener fondo rojo.");
        continue;
      }
      funcionEnvio(fila);
    }
    break;
}


}

//TUTORES


function enviarCorreoAsistenciaVirtual(fila) {

  var correoTutor = hojaRaiz.getRange("R"+fila).getValue();
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S6').getValue();
  var cuerpo = hojaArchivosBase.getRange('T6').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue() + " enlace de asistencia virtual: "+ hojaRaiz.getRange('AF'+fila).getValue();
  var final = hojaArchivosBase.getRange('U6').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo+ tutoria+ "<br>"+final;

  MailApp.sendEmail({
    to: correoTutor, // Deja este campo vacío para que no haya un destinatario principal
    bcc:"" , // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
    subject: asunto,
    htmlBody: mensaje // Puedes usar htmlBody para enviar correos con formato HTML
  });
}

function enviarCorreoContrato(fila) {

  var correoTutor = hojaRaiz.getRange("R"+fila).getValue();
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S19').getValue();
  var cuerpo = hojaArchivosBase.getRange('T19').getValue().replace(/\n/g, "<br>");
  var nombramiento = "Número de nombramiento: "+ hojaRaiz.getRange('O'+fila).getValue();
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue();
  var aprobacion= "Yo "+hojaRaiz.getRange('P'+fila).getValue()+", cédula "+ hojaRaiz.getRange('Q'+fila).getValue()+", a cargo de la tutoría "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue() +" bajo el nombramiento "+ hojaRaiz.getRange('O'+fila).getValue()+", acepto todos los términos y me comprometo a cumplir todas las normativas del cargo de persona tutora.";
  var final = hojaArchivosBase.getRange('U19').getValue().replace(/\n/g, "<br>");

  var mensaje = tutoria+"<br>"+nombramiento+"<br><br>"+ cuerpo+"<br>"+aprobacion+"<br>"+ final;

  MailApp.sendEmail({
    to: correoTutor, // Deja este campo vacío para que no haya un destinatario principal
    bcc:"" , // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
    subject: asunto,
    htmlBody: mensaje // Puedes usar htmlBody para enviar correos con formato HTML
  });

}

function enviarCorreoInformeMensual(fila) {

  var correoTutor = hojaRaiz.getRange("R"+fila).getValue();
  var tutorizado = hojaRaiz.getRange("U"+fila).getValue();
  var correoTutorizado = hojaRaiz.getRange("Z"+fila).getValue();
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S22').getValue();
  var cuerpo = hojaArchivosBase.getRange('T22').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue() +", persona estudiante "+tutorizado +", correo: "+correoTutorizado+", enlace de informe mensual: "+ hojaRaiz.getRange('AW'+fila).getValue();
  var final = hojaArchivosBase.getRange('U22').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo+ "<br>"+"<br>"+tutoria+ "<br>"+final;

  MailApp.sendEmail({
    to: correoTutor, // Deja este campo vacío para que no haya un destinatario principal
    bcc:"" , // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
    subject: asunto,
    htmlBody: mensaje // Puedes usar htmlBody para enviar correos con formato HTML
  });

}

//ESTUDIANTES

function enviarCorreoNuevos(fila) {
  
  var color = hojaRaiz.getRange('AJ' + fila).getBackground();
  if (color === "#d1e772") {
    Logger.log("Fila " + fila + " omitida por estar actualizada.");
    return; // Sale de la función sin hacer nada
  }

  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    if((celda.getBackground()=='#ffffff') || (celda.getBackground()=='#f8f9fa')){
      listaCorreos.push(celda.getValue());
    }
  }

  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S9').getValue();
  var cuerpo = hojaArchivosBase.getRange('T9').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue() + " aula asignada: " + hojaRaiz.getRange('AI' + fila).getValue() + " / Horario: "+hojaRaiz.getRange('AB' + fila).getValue();
  
  var final = hojaArchivosBase.getRange('U9').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo + tutoria + "<br>" + final;

  hojaRaiz.getRange('AI' + fila).setBackground('#a6be3d');
  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    celda.setBackground('#a6be3d'); // Cambia el color de fondo de la celda
  }

  if (listaCorreos.length > 0) {
    MailApp.sendEmail({
      to: "", 
      cc: listaCorreos.join(","), // Enviar a la lista sin que se vean entre ellos
      subject: asunto,
      htmlBody: mensaje
    });
    hojaRaiz.getRange('AJ'+fila).setBackground('#d1e772');
  } 
}

function enviarCorreosEvaluacion(fila) {

  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    listaCorreos.push(hojaCorreos.getRange('B' + i).getValue());
    hojaCorreos.getRange('A' + i).setBackground('#d1e772');
  }

  var asunto = hojaArchivosBase.getRange('S3').getValue();
  var cuerpo = hojaArchivosBase.getRange('T3').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoria académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue() + " enlace de evaluación de tutorias: " + hojaRaiz.getRange('AT' + fila).getValue();
  var final = hojaArchivosBase.getRange('U3').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo + tutoria + "<br>" + final;

    if (listaCorreos.length > 0) {
    try {
      MailApp.sendEmail({
        to: "", // Puede ir tu correo o dejarse vacío si solo se usa bcc
        cc: listaCorreos.join(","), // Envío en copia oculta
        subject: asunto,
        htmlBody: mensaje
      });

      // Solo si se envió correctamente, se cambia el fondo
      hojaRaiz.getRange('AT' + fila).setBackground('#d1e772');

    } catch (error) {
      ui.alert("Error al enviar el correo", 
              "No se pudo enviar el correo de la " + tutoria + 
              " por el siguiente error:\n" + error.message, 
              ui.ButtonSet.OK);
      Logger.log("Error en tutoría: " + tutoria + " - " + error);
    }
  }
}

//TODOS

function enviarCorreoAula(fila) {

  var correoTutor = hojaRaiz.getRange("R" + fila).getValue();
  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    listaCorreos.push(celda.getValue());
  }

  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S9').getValue();
  var cuerpo = hojaArchivosBase.getRange('T9').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue() + " aula asignada: " + hojaRaiz.getRange('AI' + fila).getValue() + " / Horario: "+hojaRaiz.getRange('AB' + fila).getValue();
  
  var final = hojaArchivosBase.getRange('U9').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo + tutoria + "<br>" + final;


  hojaRaiz.getRange('AI' + fila).setBackground('#a6be3d');
  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    celda.setBackground('#a6be3d'); // Cambia el color de fondo de la celda
  }

  if (listaCorreos.length > 0) {
    MailApp.sendEmail({
      to: correoTutor, // Ahora el tutor es el destinatario principal
      cc: listaCorreos.join(","), // Enviar a la lista sin que se vean entre ellos
      subject: asunto,
      htmlBody: mensaje
    });
  }

}

function enviarCorreoReasignacion(fila) {

  var correoTutor = hojaRaiz.getRange("R" + fila).getValue();
  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    listaCorreos.push(celda.getValue());
  }

  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S28').getValue();
  var cuerpo = hojaArchivosBase.getRange('T28').getValue().replace(/\n/g, "<br>");
  var tutoria = "Tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue() + " aula asignada: " + hojaRaiz.getRange('AI' + fila).getValue() + " / Horario: "+hojaRaiz.getRange('AB' + fila).getValue();
  
  var final = hojaArchivosBase.getRange('U28').getValue().replace(/\n/g, "<br>");

  var mensaje = cuerpo + tutoria + "<br>" + final;

  // Verificar la respuesta del usuario
  

    hojaRaiz.getRange('AI' + fila).setBackground('#a6be3d');
    for (var i = 2; i <= ultimaFila; i++) {
      var celda = hojaCorreos.getRange('B' + i);
      celda.setBackground('#a6be3d'); // Cambia el color de fondo de la celda
    }

    if (listaCorreos.length > 0) {
      MailApp.sendEmail({
        to: correoTutor, // Ahora el tutor es el destinatario principal
        cc: listaCorreos.join(","), // Enviar a la lista sin que se vean entre ellos
        subject: asunto,
        htmlBody: mensaje
      });
    } else {
      MailApp.sendEmail({
        to: correoTutor,
        subject: asunto,
        htmlBody: mensaje
      });
    }
}

function enviarCorreoCierre(fila) {
  loadProperties();
  var ui = SpreadsheetApp.getUi();
  var correoTutor = hojaRaiz.getRange("R" + fila).getValue();
  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    listaCorreos.push(celda.getValue());
  }

  // Configura el asunto y el mensaje del correo
  
  var cuerpo = hojaArchivosBase.getRange('T27').getValue().replace(/\n/g, "<br>");
  var cuerpoM = hojaArchivosBase.getRange('T27').getValue();
  var tutoria = "Tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue();

  var asunto = hojaArchivosBase.getRange('S27').getValue()+tutoria;

  var final = hojaArchivosBase.getRange('U27').getValue().replace(/\n/g, "<br>");
  var finalM = hojaArchivosBase.getRange('U27').getValue();

  var mensajeM = tutoria + "\n" + cuerpoM + "\n" + finalM;
  var mensaje = tutoria + "<br>"+ cuerpo + "<br>" + final;

  var confirmacion = ui.alert('Confirmar Datos', "Destino: \n" + correoTutor + "\nLista de correos: \n" + listaCorreos.join(", ") + "\n\n Asunto: \n" + asunto + "\n\n Mensaje: \n" + mensajeM, ui.ButtonSet.YES_NO);

  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {

    for (var i = 2; i <= ultimaFila; i++) {
      var celda = hojaCorreos.getRange('B' + i);
      celda.setBackground('#ff0000'); // Cambia el color de fondo de la celda
    }

    if (listaCorreos.length > 0) {
      MailApp.sendEmail({
        to: correoTutor, // Ahora el tutor es el destinatario principal
        cc: listaCorreos.join(","), // Enviar a la lista sin que se vean entre ellos
        subject: asunto,
        htmlBody: mensaje
      });
      hojaRaiz.getRange(fila, 1, 1, hojaRaiz.getLastColumn()).setBackground("#ff0000");
    } else {
      MailApp.sendEmail({
        to: correoTutor,
        subject: asunto,
        htmlBody: mensaje
      });
    }
  } else {
    ui.alert("Operación cancelada");
  }
}

function enviarCorreoEspera(fila) {
  loadProperties();

  var ui = SpreadsheetApp.getUi();
  var correoTutor = hojaRaiz.getRange("R" + fila).getValue();
  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for (var i = 2; i <= ultimaFila; i++) {
    var celda = hojaCorreos.getRange('B' + i);
    listaCorreos.push(celda.getValue());
  }

  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('S26').getValue();
  var cuerpo = hojaArchivosBase.getRange('T26').getValue().replace(/\n/g, "<br>");
  var cuerpoM = hojaArchivosBase.getRange('T26').getValue();
  var tutoria = "Tutoría académica de " + hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue();
  
  var final = hojaArchivosBase.getRange('U26').getValue().replace(/\n/g, "<br>");
  var finalM = hojaArchivosBase.getRange('U26').getValue();

  var mensajeM = cuerpoM + tutoria + "\n" + finalM;
  var mensaje = cuerpo + tutoria + "<br>" + final;

  var confirmacion = ui.alert('Confirmar Datos', "Destino: \n" + correoTutor + "\nLista de correos: \n" + listaCorreos.join(", ") + "\n\n Asunto: \n" + asunto + "\n\n Mensaje: \n" + mensajeM, ui.ButtonSet.YES_NO);

  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {

    if (listaCorreos.length > 0) {
      MailApp.sendEmail({
        to: correoTutor, // Ahora el tutor es el destinatario principal
        cc: listaCorreos.join(","), // Enviar a la lista sin que se vean entre ellos
        subject: asunto,
        htmlBody: mensaje
      });
      for (var i = 2; i <= ultimaFila; i++) {
        var celda = hojaCorreos.getRange('B' + i);
        celda.setBackground('#ff582c'); // Cambia el color de fondo de la celda
      }
      hojaRaiz.getRange('AI' + fila).setBackground('#ff582c');
      hojaRaiz.getRange('AJ' + fila).setBackground('#ff582c');
    } else {
      MailApp.sendEmail({
        to: correoTutor,
        subject: asunto,
        htmlBody: mensaje
      });
    }
  } else {
    ui.alert("Operación cancelada");
  }
}

function enviarCorreoPersonalizado(fila) {

  var correoTutor = hojaRaiz.getRange("R"+fila).getValue();
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('B38').getValue();
  var cuerpo = hojaArchivosBase.getRange('C38').getValue().replace(/\n/g, "<br>");
  var cuerpoM = hojaArchivosBase.getRange('C38').getValue();
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue();
  var final = hojaArchivosBase.getRange('D38').getValue().replace(/\n/g, "<br>");
  var finalM = hojaArchivosBase.getRange('D38').getValue();

  var mensajeM = tutoria+"\n\n"+ cuerpoM+ finalM;
  var mensaje = tutoria+"<br><br>"+ cuerpo+ final;

  var confirmacion = ui.alert('Confirmar Datos', "Destino: \n"+correoTutor +"\n\n Asunto: \n"+asunto +"\n\n Mensaje: \n" + mensajeM, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {

    MailApp.sendEmail({
      to: correoTutor, // Deja este campo vacío para que no haya un destinatario principal
      bcc:"" , // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
      subject: asunto,
      htmlBody: mensaje // Puedes usar htmlBody para enviar correos con formato HTML
    });
  }
  else{
    ui.alert("Operación cancelada");
  }
}


function enviarCorreosLinks(fila) {

  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for(var i=2;i<=ultimaFila;i++){
    listaCorreos.push(hojaCorreos.getRange('B'+i).getValue());
  }

  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('B39').getValue();
  var cuerpo = hojaArchivosBase.getRange('C39').getValue().replace(/\n/g, "<br>");
  var cuerpoM = hojaArchivosBase.getRange('C39').getValue();
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue();
  var final = hojaArchivosBase.getRange('D39').getValue().replace(/\n/g, "<br>");
  var finalM = hojaArchivosBase.getRange('D39').getValue();

  var mensajeM = tutoria+"\n\n"+cuerpoM+ finalM;
  var mensaje = tutoria+ "<br><br>"+cuerpo+ final;

  var confirmacion = ui.alert('Confirmar Datos', "Destino: \n"+listaCorreos +"\n\n Asunto: \n"+asunto +"\n\n Mensaje: \n" + mensajeM, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {

    if (listaCorreos.length > 0) {
      MailApp.sendEmail({
        to: "", // Tu propia dirección de correo
        cc: listaCorreos.join(","), // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
        subject: asunto,
        htmlBody: mensaje // Usa htmlBody para enviar correos con formato HTML
      });
    }
  }
  else{
    ui.alert("Operación cancelada");
  }
}




function enviarCorreoPersonalizadoEstudiante(fila) {

  var hojaCorreos = SpreadsheetApp.openByUrl(hojaRaiz.getRange('AD' + fila).getValue());
  var ultimaFila = hojaCorreos.getLastRow();
  var listaCorreos = [];

  for(var i=2;i<=ultimaFila;i++){
    listaCorreos.push(hojaCorreos.getRange('B'+i).getValue());
  }
  
  // Configura el asunto y el mensaje del correo
  var asunto = hojaArchivosBase.getRange('B38').getValue();
  var cuerpo = hojaArchivosBase.getRange('C38').getValue().replace(/\n/g, "<br>");
  var cuerpoM = hojaArchivosBase.getRange('C38').getValue();
  var tutoria = "Tutoria académica de "+ hojaRaiz.getRange('G'+fila).getValue()+" "+hojaRaiz.getRange('H'+fila).getValue()+" "+hojaRaiz.getRange('I'+fila).getValue();
  var final = hojaArchivosBase.getRange('D38').getValue().replace(/\n/g, "<br>");
  var finalM = hojaArchivosBase.getRange('D38').getValue();

  var mensajeM = tutoria+"\n\n"+ cuerpoM+ finalM;
  var mensaje = tutoria+"<br><br>"+ cuerpo+ final;

  var confirmacion = ui.alert('Confirmar Datos', "Destino: \n"+listaCorreos +"\n\n Asunto: \n"+asunto +"\n\n Mensaje: \n" + mensajeM, ui.ButtonSet.YES_NO);
  
  // Verificar la respuesta del usuario
  if (confirmacion === ui.Button.YES) {

    if (listaCorreos.length > 0) {
      MailApp.sendEmail({
        to: "", // Tu propia dirección de correo
        cc: listaCorreos.join(","), // Usa bcc para enviar a múltiples destinatarios sin que se vean entre ellos
        subject: asunto,
        htmlBody: mensaje // Usa htmlBody para enviar correos con formato HTML
      });
    }
  }
  else{
    ui.alert("Operación cancelada");
  }
}


