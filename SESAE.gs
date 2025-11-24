
function obtenerDatosBases() {
  
  const idBase1 = hojaArchivosBase.getRange('A6').getValue();
  const idBase2 = hojaArchivosBase.getRange('A8').getValue();

  const base1 = SpreadsheetApp.openById(idBase1);
  const base2 = SpreadsheetApp.openById(idBase2);

  return {
    base1: {
      id: idBase1,
      hojas: base1.getSheets().map(s => s.getName())
    },
    base2: {
      id: idBase2,
      hojas: base2.getSheets().map(s => s.getName())
    }
  };
}

function creaSESAE(datos) {

  const idBase1 = hojaArchivosBase.getRange('A6').getValue();
  const idBase2 = hojaArchivosBase.getRange('A8').getValue();

  const base1 = SpreadsheetApp.openById(idBase1);
  const base2 = SpreadsheetApp.openById(idBase2);

  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
  const reporte = SpreadsheetApp.create(`Reporte SESAE - ${fecha}`);
  const hojaReporte = reporte.getActiveSheet();
  hojaReporte.setName("Detalle");
  let fila = 1;

  // Nueva hoja para el consolidado
  const hojaConsolidado = reporte.insertSheet("Consolidado");
  const encabezado = ["CEDULA", "CORREO", "PORCENTAJE_PARTICIPACION", "PERIODO", "CAMPUS", "CODIGO", "GRUPO", "MODALIDAD", "DIA", "HORA_INICIO", "HORA_FINAL", "TUTOR"];
  hojaConsolidado.getRange(1, 1, 1, encabezado.length).setValues([encabezado]);
  hojaConsolidado.getRange(1, 3).setNumberFormat("0.00");
  let filaConsolidado = 2;

  function procesarBase(base, nombreBase, hojasSeleccionadas) {
    hojaReporte.getRange(fila, 1).setValue(`📁 ${nombreBase}: ${base.getName()}`);
    fila += 2;

    hojasSeleccionadas.forEach(nombreHoja => {
      const hoja = base.getSheetByName(nombreHoja);
      if (!hoja) return;

      const data = hoja.getDataRange().getValues();

      hojaReporte.getRange(fila, 1).setValue(`📝 Hoja: ${nombreHoja}`);
      fila += 2;

      for (let i = 3; i < data.length; i++) {
        const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
        hojaReporte.getRange(fila, 1).setValue(nombreTutoria).setFontWeight("bold");
        fila++;

        const url = data[i][30]; // AE
        if (url && typeof url === "string" && url.includes("https://")) {
          try {
            const subHoja = SpreadsheetApp.openByUrl(url);
            const hojaActiva = subHoja.getActiveSheet();
            const periodo = hojaActiva.getRange("M5").getValue();
            const modalidad = hojaActiva.getRange("G4").getValue();
            const campusTexto = hojaActiva.getRange("M3").getValue();
            const campus = campusTexto.split("-")[0]; 
            const codigo = hojaActiva.getRange("J3").getValue();
            const grupo = hojaActiva.getRange("J5").getValue();
            const tutor = hojaActiva.getRange("G7").getValue();

            let horaInicio = ""; 
            let horaFin = "";
            let dia = "";

            const horario = hojaActiva.getRange("J7").getValue();
            const diasInicial = {
              "Lunes": "L", "Martes": "K", "Miércoles": "M", "Jueves": "J",
              "Viernes": "V", "Sábado": "S", "Domingo": "D"
            };
            const regex = /([\p{L}]+) de (\d+):\d+ a (\d+):\d+/u;
            const match = horario.match(regex);

            if (match) {
              const diaTexto = match[1];
              horaInicio = parseInt(match[2]);
              horaFin = parseInt(match[3]);
              dia = diasInicial[diaTexto] || "";
            }

            let filaI = 12;
            let listaI = [];
            while (true) {
              const correoEstudiantil = hojaActiva.getRange(`I${filaI}`).getValue();
              const cedulaEstudiante = hojaActiva.getRange(`C${filaI}`).getValue();
              if (!correoEstudiantil) break;
              const porcentaje = hojaActiva.getRange(`AD${filaI}`).getValue();
              const filaDatos = [cedulaEstudiante, correoEstudiantil, porcentaje, periodo, campus, codigo, grupo, modalidad, dia, horaInicio, horaFin, tutor];
              listaI.push(filaDatos);
              filaI++;
            }

            if (listaI.length > 0) {
              hojaReporte.getRange(fila, 2, 1, encabezado.length).setValues([encabezado]);
              hojaReporte.getRange(fila, 3, listaI.length, 1).setNumberFormat("0.00");
              fila++;
              hojaReporte.getRange(fila, 2, listaI.length, encabezado.length).setValues(listaI);
              fila += listaI.length;

              // Agrega a la hoja de consolidado
              hojaConsolidado.getRange(filaConsolidado, 1, listaI.length, encabezado.length).setValues(listaI);
              filaConsolidado += listaI.length;
            }

          } catch (e) {
            hojaReporte.getRange(fila, 1).setValue(`⚠️ Error al abrir subhoja en fila ${i + 1}: ${e.message}`);
            fila++;
          }
        }

        fila++;
      }

      fila += 2;
    });
  }

  procesarBase(base1, "Base 1", datos.hojasBase1);
  procesarBase(base2, "Base 2", datos.hojasBase2);

  const url = reporte.getUrl();
  SpreadsheetApp.getUi().alert("Reporte generado con éxito. Url: " + url);
  Logger.log("📄 Reporte creado: " + url);
}


function creaReporteEvaluacion(datos) {
  const idBase1 = hojaArchivosBase.getRange('A6').getValue();
  const idBase2 = hojaArchivosBase.getRange('A8').getValue();

  const base1 = SpreadsheetApp.openById(idBase1);
  const base2 = SpreadsheetApp.openById(idBase2);

  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
  const reporte = SpreadsheetApp.create(`Reporte Evaluaciones - ${fecha}`);
  const hojaReporte = reporte.getActiveSheet();
  hojaReporte.setName("Detalle");

  const hojaConsolidado = reporte.insertSheet("Consolidado");
  const hojaEstadisticas = reporte.insertSheet("Estadísticas");
  const hojaGraficos = reporte.insertSheet("Gráficos");

  let filaDetalle = 1;
  let filaConsolidado = 2;
  let filaEstadisticas = 1;
  let encabezadoColocado = false;

  // Para hojas por área, guardamos objeto { hoja: Sheet, fila: Number }
  const hojasPorArea = {};

  let totalTutorias = 0;
  let totalRespuestas = 0;
  let totalActivos = 0;
  
  // Objeto para acumular estadísticas por área
  const estadisticasPorArea = {};

  function obtenerHojaArea(nombreArea) {
    if (!hojasPorArea[nombreArea]) {
      const nuevaHoja = reporte.insertSheet(nombreArea);
      // Encabezado para esa hoja área (igual que en Detalle)
      nuevaHoja.getRange(1, 1).setValue(`📁 Área: ${nombreArea}`);
      hojasPorArea[nombreArea] = { hoja: nuevaHoja, fila: 3 };
      
      // Inicializar estadísticas para esta área
      estadisticasPorArea[nombreArea] = {
        tutorias: 0,
        activos: 0,
        respuestas: 0
      };
    }
    return hojasPorArea[nombreArea];
  }

  function procesarBase(base, nombreBase, hojasSeleccionadas) {
    hojaReporte.getRange(filaDetalle, 1).setValue(`📁 ${nombreBase}: ${base.getName()}`);
    filaDetalle += 2;

    hojasSeleccionadas.forEach(nombreHoja => {
      const hoja = base.getSheetByName(nombreHoja);
      if (!hoja) return;

      const data = hoja.getDataRange().getValues();

      // Datos acumulativos por hoja
      let acumuladoRespuestas = 0;
      let acumuladoActivos = 0;
      let cantidadTutorias = 0;

      const inicioTitulo = filaEstadisticas;

      hojaEstadisticas.getRange(filaEstadisticas, 1).setValue(`📝 Hoja: ${nombreHoja}`);
      filaEstadisticas++;
      hojaEstadisticas.getRange(filaEstadisticas, 1, 1, 5).setValues([
        ["Tutoría", "Matriculados", "Participantes Activos", "Respuestas Evaluación", "% Participación"]
      ]);
      filaEstadisticas++;

      hojaReporte.getRange(filaDetalle, 1).setValue(`📝 Hoja: ${nombreHoja}`);
      filaDetalle += 2;

      for (let i = 3; i < data.length; i++) {
        const colorFondoAU = hoja.getRange(i + 1, 46).getBackground();
        if (colorFondoAU.toLowerCase() === "#ff0000") {
          const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
          hojaReporte.getRange(filaDetalle, 1).setValue(`⛔ ${nombreTutoria} - Omitida por tutoría cerrada`);
          filaDetalle += 2;
          continue;
        }

        const area = nombreHoja;
        const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
        const matriculados = Number(data[i][35]);
        const activos = Number(data[i][42]);
        const url = data[i][46];

        // Escribe en Detalle
        hojaReporte.getRange(filaDetalle, 1).setValue(nombreTutoria).setFontWeight("bold");
        filaDetalle++;

        // Escribe en hoja área
        const hojaAreaData = obtenerHojaArea(area);
        const hojaArea = hojaAreaData.hoja;
        let filaArea = hojaAreaData.fila;
        hojaArea.getRange(filaArea, 1).setValue(nombreTutoria).setFontWeight("bold");
        filaArea++;

        if (url && typeof url === "string" && /^https:\/\/docs\.google\.com\/spreadsheets\//.test(url.trim())) {
          try {
            const subHoja = SpreadsheetApp.openByUrl(url.trim());
            const hojaActiva = subHoja.getActiveSheet();

            const ultimaFila = hojaActiva.getLastRow();
            const ultimaColumna = hojaActiva.getLastColumn();
            const respuestas = Math.max(0, ultimaFila - 1);
            const porcentaje = (activos > 0) ? (respuestas / activos) : 0;

            if (ultimaFila >= 1) {
              const encabezado = hojaActiva.getRange(1, 1, 1, ultimaColumna).getValues();
              const datosFiltrados = hojaActiva.getRange(2, 1, ultimaFila - 1, ultimaColumna).getValues();

              // DETALLE
              hojaReporte.getRange(filaDetalle, 2, 1, ultimaColumna).setValues(encabezado);
              filaDetalle++;
              if (datosFiltrados.length > 0) {
                hojaReporte.getRange(filaDetalle, 2, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
                filaDetalle += datosFiltrados.length;
              } else {
                hojaReporte.getRange(filaDetalle, 2).setValue("⚠️ La hoja está vacía después del encabezado");
                filaDetalle++;
              }

              // HOJA ÁREA (igual detalle)
              hojaArea.getRange(filaArea, 2, 1, ultimaColumna).setValues(encabezado);
              filaArea++;
              if (datosFiltrados.length > 0) {
                hojaArea.getRange(filaArea, 2, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
                filaArea += datosFiltrados.length;
              } else {
                hojaArea.getRange(filaArea, 2).setValue("⚠️ La hoja está vacía después del encabezado");
                filaArea++;
              }

              // CONSOLIDADO
              if (!encabezadoColocado) {
                hojaConsolidado.getRange(1, 1, 1, ultimaColumna).setValues(encabezado);
                encabezadoColocado = true;
              }
              if (datosFiltrados.length > 0) {
                hojaConsolidado.getRange(filaConsolidado, 1, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
                filaConsolidado += datosFiltrados.length;
              }

              // ESTADÍSTICAS
              hojaEstadisticas.getRange(filaEstadisticas, 1, 1, 5).setValues([
                [nombreTutoria, matriculados, activos, respuestas, porcentaje]
              ]);
              filaEstadisticas++;

              // Acumulados
              totalTutorias++;
              cantidadTutorias++;
              totalRespuestas += respuestas;
              totalActivos += activos;
              acumuladoRespuestas += respuestas;
              acumuladoActivos += activos;
              
              // Acumular por área
              estadisticasPorArea[area].tutorias++;
              estadisticasPorArea[area].activos += activos;
              estadisticasPorArea[area].respuestas += respuestas;
            }

          } catch (e) {
            const mensajeError = `⚠️ Error al abrir subhoja en fila ${i + 1}: ${e.message}`;
            hojaReporte.getRange(filaDetalle, 1).setValue(mensajeError);
            filaDetalle++;

            hojaArea.getRange(filaArea, 2).setValue(mensajeError);
            filaArea++;
          }
        } else {
          const mensajeNoUrl = `⚠️ Enlace inválido o ausente en fila ${i + 1}`;
          hojaReporte.getRange(filaDetalle, 1).setValue(mensajeNoUrl);
          filaDetalle++;

          hojaArea.getRange(filaArea, 2).setValue(mensajeNoUrl);
          filaArea++;
        }

        // Actualizar fila del área
        hojasPorArea[area].fila = filaArea;

        filaDetalle++;
      }

      // Promedio hoja
      const promedio = (acumuladoActivos > 0)
        ? (acumuladoRespuestas / acumuladoActivos)
        : 0;

      hojaEstadisticas.getRange(inicioTitulo, 1).setValue(`📝 Hoja: ${nombreHoja} (Promedio participación: ${(promedio * 100).toFixed(2)}%)`);
      filaDetalle += 2;
      filaEstadisticas += 2;
    });
  }

  procesarBase(base1, "Base 1", datos.hojasBase1);
  procesarBase(base2, "Base 2", datos.hojasBase2);

  // 📊 Resumen general
  const porcentajeGeneral = (totalActivos > 0)
    ? (totalRespuestas / totalActivos)
    : 0;

  hojaEstadisticas.getRange(filaEstadisticas, 1).setValue("📊 Resumen General");
  filaEstadisticas++;
  hojaEstadisticas.getRange(filaEstadisticas, 1, 1, 4).setValues([
    ["Total Tutorías", "Total Participantes Activos", "Total Respuestas", "% Participación"]
  ]);
  filaEstadisticas++;
  hojaEstadisticas.getRange(filaEstadisticas, 1, 1, 4).setValues([
    [totalTutorias, totalActivos, totalRespuestas, porcentajeGeneral]
  ]);

  // Formatear porcentajes en hoja Estadísticas
  const ultimaFilaEstadisticas = hojaEstadisticas.getLastRow();
  hojaEstadisticas.getRange(2, 5, ultimaFilaEstadisticas - 1).setNumberFormat("0.00%");
  hojaEstadisticas.getRange(filaEstadisticas, 4).setNumberFormat("0.00%");

  // Crear gráficos en la hoja de Gráficos
  crearGraficosParticipacion(hojaGraficos, estadisticasPorArea, totalActivos, totalRespuestas);

  const url = reporte.getUrl();
  SpreadsheetApp.getUi().alert("Reporte generado con éxito. Url: " + url);
  Logger.log("📄 Reporte creado: " + url);
}

function crearGraficosParticipacion(hojaGraficos, estadisticasPorArea, totalActivos, totalRespuestas) {
  // Limpiar la hoja de gráficos
  hojaGraficos.clear();
  
  // Crear encabezados para los datos
  hojaGraficos.getRange(1, 1).setValue("Área");
  hojaGraficos.getRange(1, 2).setValue("Participantes Activos");
  hojaGraficos.getRange(1, 3).setValue("Respuestas");
  hojaGraficos.getRange(1, 4).setValue("% Participación");
  
  let fila = 2;
  const areas = [];
  const porcentajes = [];
  
  // Agregar datos por área (excluyendo el total general)
  for (const area in estadisticasPorArea) {
    const datosArea = estadisticasPorArea[area];
    const porcentaje = (datosArea.activos > 0) 
      ? (datosArea.respuestas / datosArea.activos)
      : 0;
    
    hojaGraficos.getRange(fila, 1).setValue(area);
    hojaGraficos.getRange(fila, 2).setValue(datosArea.activos);
    hojaGraficos.getRange(fila, 3).setValue(datosArea.respuestas);
    hojaGraficos.getRange(fila, 4).setValue(porcentaje);
    
    areas.push(area);
    porcentajes.push(porcentaje);
    fila++;
  }
  
  // Agregar total general en una fila separada
  const porcentajeGeneral = (totalActivos > 0) 
    ? (totalRespuestas / totalActivos)
    : 0;
  
  hojaGraficos.getRange(fila, 1).setValue("TOTAL GENERAL");
  hojaGraficos.getRange(fila, 2).setValue(totalActivos);
  hojaGraficos.getRange(fila, 3).setValue(totalRespuestas);
  hojaGraficos.getRange(fila, 4).setValue(porcentajeGeneral);
  
  // Formatear como porcentaje (0.1327 se mostrará como 13.27%)
  hojaGraficos.getRange("D2:D" + fila).setNumberFormat("0.00%");
  
  // Ajustar el ancho de las columnas
  hojaGraficos.autoResizeColumns(1, 4);
  
  // Crear gráfico de barras SOLO para % de participación por área (sin el total general)
  const chart = hojaGraficos.newChart()
    .asColumnChart()
    .addRange(hojaGraficos.getRange(2, 1, areas.length, 1)) // Áreas
    .addRange(hojaGraficos.getRange(2, 4, areas.length, 1)) // % Participación
    .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
    .setTransposeRowsAndColumns(false)
    .setNumHeaders(0)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
    .setOption('title', 'Participación por Área (%)')
    .setOption('subtitle', 'Porcentaje de respuestas sobre participantes activos')
    .setOption('isStacked', 'false')
    .setOption('legend.position', 'none')
    .setOption('hAxis.title', 'Áreas')
    .setOption('vAxis.title', 'Porcentaje de participación')
    .setOption('vAxis.minValue', 0)
    .setOption('vAxis.maxValue', 1) // 1 = 100%
    .setOption('vAxis.format', '#\'%\'')
    .setOption('colors', ['#4285F4']) // Color azul para las barras
    .setPosition(1, 6, 0, 0)
    .setOption('width', 600)
    .setOption('height', 400)
    .build();
  
  hojaGraficos.insertChart(chart);
  
  // Crear gráfico de pastel para distribución de respuestas por área
  const pieChart = hojaGraficos.newChart()
    .asPieChart()
    .addRange(hojaGraficos.getRange(1, 1, fila-1, 1)) // Áreas
    .addRange(hojaGraficos.getRange(1, 3, fila-1, 1)) // Respuestas
    .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
    .setTransposeRowsAndColumns(false)
    .setNumHeaders(1)
    .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
    .setOption('title', 'Distribución de Respuestas por Área')
    .setOption('legend.position', 'right')
    .setOption('pieSliceText', 'percentage')
    .setOption('pieSliceTextStyle.color', 'white')
    .setOption('slices', {0: {offset: 0.2}})
    .setPosition(1, 12, 0, 0)
    .setOption('width', 500)
    .setOption('height', 400)
    .build();
  
  hojaGraficos.insertChart(pieChart);
  
  // Crear gráfico comparativo entre participantes activos y respuestas
  const comparisonChart = hojaGraficos.newChart()
  .asColumnChart()
  .addRange(hojaGraficos.getRange(1, 1, fila, 1)) // Áreas (incluye encabezado)
  .addRange(hojaGraficos.getRange(1, 2, fila, 1)) // Activos (incluye encabezado)
  .addRange(hojaGraficos.getRange(1, 3, fila, 1)) // Respuestas (incluye encabezado)
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(true)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('title', 'Comparación: Participantes Activos vs. Respuestas')
  .setOption('subtitle', 'Por área (Total General en rojo)')
  .setOption('isStacked', 'false')
  .setOption('legend.position', 'top')
  .setOption('series', {
    0: {color: '#4285F4', targetAxisIndex: 0}, // Azul para participantes activos (áreas normales)
    1: {color: '#34A853', targetAxisIndex: 0}, // Verde para respuestas (áreas normales)
    2: {color: '#EA4335', targetAxisIndex: 0}  // Rojo para el TOTAL GENERAL
  })
  .setOption('vAxes', {
    0: {title: 'Cantidad', minValue: 0}
  })
  .setOption('series', {
    // Configuración especial para diferenciar el TOTAL GENERAL
    [areas.length]: { // El índice corresponde a la posición del TOTAL GENERAL
      color: '#EA4335', // Rojo para participantes activos (TOTAL GENERAL)
      targetAxisIndex: 0
    },
    [areas.length + 1 + areas.length]: { // Índice para respuestas del TOTAL GENERAL
      color: '#EA4335', // Rojo para respuestas (TOTAL GENERAL)
      targetAxisIndex: 0
    }
  })
  .setPosition(25, 6, 0, 0)
  .setOption('width', 600)
  .setOption('height', 400)
  .build();

  hojaGraficos.insertChart(comparisonChart);
}

function creaReporteParticipacion(datos) {
  const idBase1 = hojaArchivosBase.getRange('A6').getValue();
  const idBase2 = hojaArchivosBase.getRange('A8').getValue();

  const base1 = SpreadsheetApp.openById(idBase1);
  const base2 = SpreadsheetApp.openById(idBase2);

  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
  const reporte = SpreadsheetApp.create(`Reporte Participacion - ${fecha}`);
  const hojaDetalle = reporte.getActiveSheet();
  hojaDetalle.setName("Detalle");

  let filaDetalle = 1;

  function procesarBase(base, nombreBase, hojasSeleccionadas) {
    hojaDetalle.getRange(filaDetalle, 1).setValue(`📁 ${nombreBase}: ${base.getName()}`);
    filaDetalle += 2;

    hojasSeleccionadas.forEach(nombreHoja => {
      const hoja = base.getSheetByName(nombreHoja);
      if (!hoja) return;

      const data = hoja.getDataRange().getValues();

      hojaDetalle.getRange(filaDetalle, 1).setValue(`📝 Área: ${nombreHoja}`);
      filaDetalle++;

      // Encabezados
      hojaDetalle.getRange(filaDetalle, 1, 1, 9).setValues([[
        "Tutoría", "Matriculados", "Hombres", "Mujeres", 
        "No Binario", "No Especificado", "Retiros", 
        "% Participación Grupal", "Participantes Activos"
      ]]);
      filaDetalle++;

      for (let i = 3; i < data.length; i++) {
        const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
        if (!nombreTutoria) continue;

        // Extrae los datos de las columnas específicas
        const filaDatos = [
          nombreTutoria,
          Number(data[i][35]), // AJ - Matriculados
          Number(data[i][36]), // AK - Hombres
          Number(data[i][37]), // AL - Mujeres
          Number(data[i][38]), // AM - No binario
          Number(data[i][39]), // AN - No especificado
          Number(data[i][40]), // AO - Retiros
          data[i][41],         // AP - % Participación Grupal
          Number(data[i][42])  // AQ - Participantes Activos
        ];

        hojaDetalle.getRange(filaDetalle, 1, 1, 9).setValues([filaDatos]);
        filaDetalle++;
      }

      filaDetalle += 2;
    });
  }

  procesarBase(base1, "Base 1", datos.hojasBase1);
  procesarBase(base2, "Base 2", datos.hojasBase2);

  const url = reporte.getUrl();
  SpreadsheetApp.getUi().alert("Reporte generado con éxito. Url: " + url);
  Logger.log("📄 Reporte creado: " + url);
}


function creaReportePOA(datos) {
  const idBase1 = hojaArchivosBase.getRange('A6').getValue();
  const idBase2 = hojaArchivosBase.getRange('A8').getValue();

  const base1 = SpreadsheetApp.openById(idBase1);
  const base2 = SpreadsheetApp.openById(idBase2);

  const fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
  const reporte = SpreadsheetApp.create(`Reporte POA - ${fecha}`);
  const hojaReporte = reporte.getActiveSheet();
  hojaReporte.setName("Detalle");

  const hojaConsolidado = reporte.insertSheet("Consolidado");
  const hojaEstadisticas = reporte.insertSheet("Estadísticas");
  const hojaGraficos = reporte.insertSheet("Gráficos");

  let filaDetalle = 1;
  let filaConsolidado = 2;
  let filaEstadisticas = 1;
  let encabezadoColocado = false;

  const hojasPorArea = {};
  let totalTutorias = 0;
  let totalRespuestas = 0;
  let totalActivos = 0;
  const estadisticasPorArea = {};

  function obtenerHojaArea(nombreArea) {
    if (!hojasPorArea[nombreArea]) {
      const nuevaHoja = reporte.insertSheet(nombreArea);
      nuevaHoja.getRange(1, 1).setValue(`📁 Área: ${nombreArea}`);
      hojasPorArea[nombreArea] = { hoja: nuevaHoja, fila: 3 };
      estadisticasPorArea[nombreArea] = { tutorias: 0, activos: 0, respuestas: 0 };
    }
    return hojasPorArea[nombreArea];
  }

  function procesarBase(base, nombreBase, hojasSeleccionadas) {
    hojaReporte.getRange(filaDetalle++, 1).setValue(`📁 ${nombreBase}: ${base.getName()}`);
    filaDetalle++;

    hojasSeleccionadas.forEach(nombreHoja => {
      const hoja = base.getSheetByName(nombreHoja);
      if (!hoja) return;

      const data = hoja.getDataRange().getValues();
      let acumuladoRespuestas = 0;
      let acumuladoActivos = 0;
      let cantidadTutorias = 0;
      const inicioTitulo = filaEstadisticas;

      hojaEstadisticas.getRange(filaEstadisticas++, 1).setValue(`📝 Hoja: ${nombreHoja}`);
      hojaEstadisticas.getRange(filaEstadisticas++, 1, 1, 5).setValues([
        ["Tutoría", "Matriculados", "Participantes Activos", "Respuestas Evaluación", "% Participación"]
      ]);

      hojaReporte.getRange(filaDetalle++, 1).setValue(`📝 Hoja: ${nombreHoja}`);
      filaDetalle++;

      for (let i = 3; i < data.length; i++) {
        const colorFondoAU = hoja.getRange(i + 1, 46).getBackground();
        if (colorFondoAU.toLowerCase() === "#ff0000") {
          const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
          hojaReporte.getRange(filaDetalle++, 1).setValue(`⛔ ${nombreTutoria} - Omitida por tutoría cerrada`);
          filaDetalle++;
          continue;
        }

        const area = nombreHoja;
        const nombreTutoria = `${data[i][6]} ${data[i][7]} ${data[i][8]}`.trim();
        const matriculados = Number(data[i][35]);
        const activos = Number(data[i][42]);
        const url = data[i][29];

        hojaReporte.getRange(filaDetalle++, 1).setValue(nombreTutoria).setFontWeight("bold");
        const hojaAreaData = obtenerHojaArea(area);
        const hojaArea = hojaAreaData.hoja;
        let filaArea = hojaAreaData.fila;
        hojaArea.getRange(filaArea++, 1).setValue(nombreTutoria).setFontWeight("bold");

        if (url && typeof url === "string" && /^https:\/\/docs\.google\.com\/spreadsheets\//.test(url.trim())) {
          try {
            const subHoja = SpreadsheetApp.openByUrl(url.trim());
            const hojaActiva = subHoja.getActiveSheet();
            const ultimaFila = hojaActiva.getLastRow();
            const ultimaColumna = hojaActiva.getLastColumn();
            const respuestas = Math.max(0, ultimaFila - 1);
            const porcentaje = (activos > 0) ? (respuestas / activos) : 0;

            const encabezado = hojaActiva.getRange(1, 1, 1, ultimaColumna).getValues();
            const datosFiltrados = hojaActiva.getRange(2, 1, respuestas, ultimaColumna).getValues();

            hojaReporte.getRange(filaDetalle++, 2, 1, ultimaColumna).setValues(encabezado);
            if (datosFiltrados.length > 0) {
              hojaReporte.getRange(filaDetalle, 2, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
              filaDetalle += datosFiltrados.length;
            }

            hojaArea.getRange(filaArea++, 2, 1, ultimaColumna).setValues(encabezado);
            if (datosFiltrados.length > 0) {
              hojaArea.getRange(filaArea, 2, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
              filaArea += datosFiltrados.length;
            }

            if (!encabezadoColocado) {
              hojaConsolidado.getRange(1, 1, 1, ultimaColumna).setValues(encabezado);
              encabezadoColocado = true;
            }
            if (datosFiltrados.length > 0) {
              hojaConsolidado.getRange(filaConsolidado, 1, datosFiltrados.length, ultimaColumna).setValues(datosFiltrados);
              filaConsolidado += datosFiltrados.length;
            }

            hojaEstadisticas.getRange(filaEstadisticas++, 1, 1, 5).setValues([
              [nombreTutoria, matriculados, activos, respuestas, porcentaje]
            ]);

            totalTutorias++;
            cantidadTutorias++;
            totalRespuestas += respuestas;
            totalActivos += activos;
            acumuladoRespuestas += respuestas;
            acumuladoActivos += activos;
            estadisticasPorArea[area].tutorias++;
            estadisticasPorArea[area].activos += activos;
            estadisticasPorArea[area].respuestas += respuestas;
          } catch (e) {
            hojaReporte.getRange(filaDetalle++, 1).setValue(`⚠️ Error al abrir subhoja: ${e.message}`);
            hojaArea.getRange(filaArea++, 2).setValue(`⚠️ Error al abrir subhoja: ${e.message}`);
          }
        } else {
          hojaReporte.getRange(filaDetalle++, 1).setValue(`⚠️ Enlace inválido o ausente en fila ${i + 1}`);
          hojaArea.getRange(filaArea++, 2).setValue(`⚠️ Enlace inválido o ausente en fila ${i + 1}`);
        }

        hojasPorArea[area].fila = filaArea;
        filaDetalle++;
      }

      const promedio = (acumuladoActivos > 0) ? (acumuladoRespuestas / acumuladoActivos) : 0;
      hojaEstadisticas.getRange(inicioTitulo, 1).setValue(`📝 Hoja: ${nombreHoja} (Promedio participación: ${(promedio * 100).toFixed(2)}%)`);
      filaDetalle += 2;
      filaEstadisticas += 2;
    });
  }

  procesarBase(base1, "Base 1", datos.hojasBase1);
  procesarBase(base2, "Base 2", datos.hojasBase2);

  const porcentajeGeneral = (totalActivos > 0) ? (totalRespuestas / totalActivos) : 0;
  hojaEstadisticas.getRange(filaEstadisticas++, 1).setValue("📊 Resumen General");
  hojaEstadisticas.getRange(filaEstadisticas++, 1, 1, 4).setValues([["Total Tutorías", "Total Participantes Activos", "Total Respuestas", "% Participación"]]);
  hojaEstadisticas.getRange(filaEstadisticas++, 1, 1, 4).setValues([[totalTutorias, totalActivos, totalRespuestas, porcentajeGeneral]]);
  hojaEstadisticas.getRange(2, 5, hojaEstadisticas.getLastRow() - 1).setNumberFormat("0.00%");
  hojaEstadisticas.getRange(filaEstadisticas - 1, 4).setNumberFormat("0.00%");

  crearGraficosParticipacion(hojaGraficos, estadisticasPorArea, totalActivos, totalRespuestas);
  generarResumenPorCarrera(reporte); // 👈 Se agrega nuevo análisis por carrera

  const url = reporte.getUrl();
  const htmlOutput = HtmlService.createHtmlOutput('<script>window.open("' + url + '", "_blank");google.script.host.close();</script>').setWidth(100).setHeight(50);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Abriendo enlace...");
}

// NUEVA FUNCIÓN PARA GENERAR TABLA POA CON CARRERAS
function generarResumenPorCarrera(reporte) {
  const hojaConsolidado = reporte.getSheetByName("Consolidado");
  if (!hojaConsolidado) return;

  const hojaPOA = reporte.insertSheet("POA");
  hojaPOA.getRange(1, 1, 1, 2).setValues([["Carrera", "Cantidad"]]);

  const data = hojaConsolidado.getDataRange().getValues();
  const resumen = {};

  for (let i = 1; i < data.length; i++) {
    const carrera = (data[i][17] || "").toString().trim(); // Columna R = índice 17
    if (carrera) {
      resumen[carrera] = (resumen[carrera] || 0) + 1;
    }
  }

  const carreras = Object.keys(resumen).sort();
  const salida = carreras.map(c => [c, resumen[c]]);

  if (salida.length > 0) {
    hojaPOA.getRange(2, 1, salida.length, 2).setValues(salida);
    hojaPOA.autoResizeColumns(1, 2);
  }
}
