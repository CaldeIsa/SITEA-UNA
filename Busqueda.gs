function busquedaEstudiante(correo) {

  loadProperties();
  
  var sheets = [];

  for (var i = 2; hojaArchivosBase.getRange('B'+i).getValue()!=""; i++) {
    var area = hojaArchivosBase.getRange('B'+i);
    sheets.push(area.getValue());
  }

  var datos = {};
  var estudiante = [];
  var tutoriaM = [];

  sheets.forEach(sheet => {
    Logger.log("hoja "+idHojaRaiz);
    var hojaRaiz = SpreadsheetApp.openById(idHojaRaiz).getSheetByName(sheet);
    var ultimaFila = hojaRaiz.getLastRow();

    for (var fila = 4; fila <= ultimaFila; fila++) {
      var url = hojaRaiz.getRange('AD' + fila).getValue();
      var hojaMatriculas;

      // Validar si la URL está vacía o si genera error al abrir
      try {
        if (!url) continue; // si está vacía, salta al siguiente
        hojaMatriculas = SpreadsheetApp.openByUrl(url);
      } catch (e) {
        Logger.log("URL inválida en fila " + fila + " de hoja " + sheet + ": " + url);
        continue; // si lanza error, pasa a la siguiente
      }

      var ultimaMatricula = hojaMatriculas.getLastRow();

      for (var i = 2; i <= ultimaMatricula; i++) {
        var correoMatricula = hojaMatriculas.getRange('B' + i).getValue();
        if (correoMatricula == correo) {
          if (Object.keys(datos).length === 0) {
            datos = {
              correo: correoMatricula,
              nombre: hojaMatriculas.getRange('I' + i).getValue() + " " + hojaMatriculas.getRange('G' + i).getValue() + " " + hojaMatriculas.getRange('H' + i).getValue(),
              carrera: hojaMatriculas.getRange('R' + i).getValue(),
              cedula: hojaMatriculas.getRange('J' + i).getValue(),
              telefono: hojaMatriculas.getRange('K' + i).getValue()
            };
          }

          var tutoria = {
            tutoria: hojaRaiz.getRange('G' + fila).getValue() + " " + hojaRaiz.getRange('H' + fila).getValue() + " " + hojaRaiz.getRange('I' + fila).getValue(),
            area: sheet,
            fila: i,
            link: hojaRaiz.getRange('AE' + fila).getValue()
          };

          tutoriaM.push(tutoria);
        }
      }
    }
  });

  estudiante.push(datos, tutoriaM);
  return estudiante;
}



