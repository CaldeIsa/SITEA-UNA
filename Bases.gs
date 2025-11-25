
// Obtiene la hoja llamada "Archivos Base" del archivo activo
var hojaArchivosBase = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Archivos Base");

// Claves y parámetros para usar caché de script.
var CACHE_KEY_PROPERTIES = 'SITEA-UNA:baseProperties';
var CACHE_TTL_SECONDS = 300; // 5 minutos

// ---------------------------------------------------------
// PROPIEDADES
// ---------------------------------------------------------

/**
 * Guarda en las propiedades del script los valores que se encuentran
 * en la hoja "Archivos Base", en celdas específicas (E3:E7 e I3:I12).
 */
function saveProperties() {
  var scriptProperties = PropertiesService.getScriptProperties();

  // Bases
  scriptProperties.setProperty('idHojaRaiz', hojaArchivosBase.getRange('A6').getValue());
  scriptProperties.setProperty('baseHojaAsistencia', hojaArchivosBase.getRange('E3').getValue());
  scriptProperties.setProperty('formBaseMatricula', hojaArchivosBase.getRange('E4').getValue());
  scriptProperties.setProperty('formBaseEvaluacion', hojaArchivosBase.getRange('E5').getValue());
  scriptProperties.setProperty('formBaseAsistenciaV', hojaArchivosBase.getRange('E6').getValue());
  scriptProperties.setProperty('formBaseInformeMensual', hojaArchivosBase.getRange('E7').getValue());

  // Carpetas
  scriptProperties.setProperty('carpetaHojasAsistencia', hojaArchivosBase.getRange('I3').getValue());
  scriptProperties.setProperty('carpetaFormsMatricula', hojaArchivosBase.getRange('I4').getValue());
  scriptProperties.setProperty('carpetaRespuestaMatriculas', hojaArchivosBase.getRange('I5').getValue());
  scriptProperties.setProperty('carpetaFormsEvaluacion', hojaArchivosBase.getRange('I6').getValue());
  scriptProperties.setProperty('carpetaRespuestaEvaluacion', hojaArchivosBase.getRange('I7').getValue());
  scriptProperties.setProperty('carpetaFormsAsistenciaVirtual', hojaArchivosBase.getRange('I8').getValue());
  scriptProperties.setProperty('carpetaRespuestaAsistenciaV', hojaArchivosBase.getRange('I9').getValue());
  scriptProperties.setProperty('carpetaFormsInformeMensual', hojaArchivosBase.getRange('I10').getValue());
  scriptProperties.setProperty('carpetaRespuestaInformeMensual', hojaArchivosBase.getRange('I11').getValue());
  scriptProperties.setProperty('carpetaReportes', hojaArchivosBase.getRange('I12').getValue());

  // Limpiar el caché para que los siguientes llamados a loadProperties obtengan los valores actualizados.
  CacheService.getScriptCache().remove(CACHE_KEY_PROPERTIES);
}

// Variables globales que se inicializarán con loadProperties()
var hojaAsistenciaSheet;
var idHojaRaiz;

var baseHojaAsistencia;
var formBaseMatricula;
var formBaseEvaluacion;
var formBaseAsistenciaV;
var formBaseInformeMensual;

var carpetaHojasAsistencia;
var carpetaFormsMatricula;
var carpetaFormsEvaluacion;
var carpetaFormsAsistenciaVirtual;
var carpetaFormsInformeMensual;
var carpetaReportes;

var carpetaRespuestaMatriculas;
var carpetaRespuestaEvaluacion;
var carpetaRespuestaAsistenciaV;
var carpetaRespuestaInformeMensual;


/**
 * Carga todas las propiedades guardadas previamente con saveProperties()
 * y las convierte en objetos de Drive (archivos o carpetas).
 */
function loadProperties() {
  var cache = CacheService.getScriptCache();
  var cachedProperties = cache.get(CACHE_KEY_PROPERTIES);
  var properties;

  if (cachedProperties) {
    properties = JSON.parse(cachedProperties);
  } else {
    var scriptProperties = PropertiesService.getScriptProperties();
    properties = {
      idHojaRaiz: scriptProperties.getProperty('idHojaRaiz'),
      baseHojaAsistencia: scriptProperties.getProperty('baseHojaAsistencia'),
      formBaseMatricula: scriptProperties.getProperty('formBaseMatricula'),
      formBaseEvaluacion: scriptProperties.getProperty('formBaseEvaluacion'),
      formBaseAsistenciaV: scriptProperties.getProperty('formBaseAsistenciaV'),
      formBaseInformeMensual: scriptProperties.getProperty('formBaseInformeMensual'),
      carpetaHojasAsistencia: scriptProperties.getProperty('carpetaHojasAsistencia'),
      carpetaFormsMatricula: scriptProperties.getProperty('carpetaFormsMatricula'),
      carpetaFormsEvaluacion: scriptProperties.getProperty('carpetaFormsEvaluacion'),
      carpetaFormsAsistenciaVirtual: scriptProperties.getProperty('carpetaFormsAsistenciaVirtual'),
      carpetaFormsInformeMensual: scriptProperties.getProperty('carpetaFormsInformeMensual'),
      carpetaReportes: scriptProperties.getProperty('carpetaReportes'),
      carpetaRespuestaMatriculas: scriptProperties.getProperty('carpetaRespuestaMatriculas'),
      carpetaRespuestaEvaluacion: scriptProperties.getProperty('carpetaRespuestaEvaluacion'),
      carpetaRespuestaAsistenciaV: scriptProperties.getProperty('carpetaRespuestaAsistenciaV'),
      carpetaRespuestaInformeMensual: scriptProperties.getProperty('carpetaRespuestaInformeMensual')
    };

    cache.put(CACHE_KEY_PROPERTIES, JSON.stringify(properties), CACHE_TTL_SECONDS);
  }

  // Asigna un valor predeterminado para idHojaRaiz si aún no existe para evitar fallos en la carga inicial.
  if (!properties.idHojaRaiz) {
    var idPorDefecto = hojaArchivosBase.getRange('A6').getValue() || hojaArchivosBase.getRange('A8').getValue();

    if (idPorDefecto) {
      properties.idHojaRaiz = idPorDefecto;
      PropertiesService.getScriptProperties().setProperty('idHojaRaiz', idPorDefecto);
      cache.put(CACHE_KEY_PROPERTIES, JSON.stringify(properties), CACHE_TTL_SECONDS);
    }
  }

  // Validación temprana para evitar fallos por propiedades faltantes.
  var requiredKeys = Object.keys(properties);
  requiredKeys.forEach(function(key) {
    if (!properties[key]) {
      throw new Error('La propiedad "' + key + '" no está configurada en Archivos Base. Ejecuta saveProperties nuevamente.');
    }
  });

  // Bases
  idHojaRaiz = properties.idHojaRaiz;
  hojaAsistenciaSheet = SpreadsheetApp.openById(properties.baseHojaAsistencia);
  baseHojaAsistencia = DriveApp.getFileById(properties.baseHojaAsistencia);
  formBaseMatricula = DriveApp.getFileById(properties.formBaseMatricula);
  formBaseEvaluacion = DriveApp.getFileById(properties.formBaseEvaluacion);
  formBaseAsistenciaV = DriveApp.getFileById(properties.formBaseAsistenciaV);
  formBaseInformeMensual = DriveApp.getFileById(properties.formBaseInformeMensual);

  // Carpetas de archivos
  carpetaHojasAsistencia = DriveApp.getFolderById(properties.carpetaHojasAsistencia);
  carpetaFormsMatricula = DriveApp.getFolderById(properties.carpetaFormsMatricula);
  carpetaFormsEvaluacion = DriveApp.getFolderById(properties.carpetaFormsEvaluacion);
  carpetaFormsAsistenciaVirtual = DriveApp.getFolderById(properties.carpetaFormsAsistenciaVirtual);
  carpetaFormsInformeMensual = DriveApp.getFolderById(properties.carpetaFormsInformeMensual);
  carpetaReportes = DriveApp.getFolderById(properties.carpetaReportes);

  // Carpetas de respuestas
  carpetaRespuestaMatriculas = DriveApp.getFolderById(properties.carpetaRespuestaMatriculas);
  carpetaRespuestaEvaluacion = DriveApp.getFolderById(properties.carpetaRespuestaEvaluacion);
  carpetaRespuestaAsistenciaV = DriveApp.getFolderById(properties.carpetaRespuestaAsistenciaV);
  carpetaRespuestaInformeMensual = DriveApp.getFolderById(properties.carpetaRespuestaInformeMensual);
}


/**
 * Guarda un ID (de hoja o recurso) en las propiedades del script
 * @param {string} rango - celda de la hoja "Archivos Base" de donde se toma el ID
 * Se usa en el menuprincipal3.HTML para cargar cual hoja debe usar
 */
function saveIDPropertie(rango) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var id = hojaArchivosBase.getRange(rango).getValue();

  scriptProperties.setProperty('idHojaRaiz', id);
  CacheService.getScriptCache().remove(CACHE_KEY_PROPERTIES);
}





// Servicio para guardar y recuperar propiedades (valores persistentes entre ejecuciones)
var scriptProperties = PropertiesService.getScriptProperties();

// Variables iniciales para carpetas y formularios (se definen con valores de otras propiedades)
carpetaForms = carpetaFormsInformeMensual;
formsUso = formBaseInformeMensual;
carpetaRespuesta = carpetaRespuestaInformeMensual;
/**
 * Carga el ID guardado en las propiedades y abre la hoja raíz
 */
function loadIDPropertie() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var idGuardado = scriptProperties.getProperty('idHojaRaiz');
  
  if (idGuardado) {
    idHojaRaiz = SpreadsheetApp.openById(idGuardado);
  } else {
    throw new Error("No se ha guardado un ID válido en las propiedades.");
  }
}


/**
 * Busca un valor en la columna J de la hoja activa.
 * Si encuentra coincidencia, devuelve el valor de la columna K de esa misma fila.
 * 
 * @param {string} valor - el valor a buscar en la columna J
 * @returns {string|null} - el valor encontrado en la columna K o null si no existe
 */
function buscarColumna(valor) {
  // Obtiene la hoja activa del archivo actual
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Obtiene todos los valores de la hoja en forma de matriz
  const datos = hoja.getDataRange().getValues();

  // Recorre cada fila buscando coincidencias
  for (let i = 0; i < datos.length; i++) {
    if (datos[i][9] === valor) { // Columna J = índice 9
      return datos[i][10];      // Columna K = índice 10
    }
  }

  // Si no encuentra coincidencia, devuelve null
  return null;
}
