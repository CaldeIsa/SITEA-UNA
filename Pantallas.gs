/*Imprime en el menu principal el HTML de crear formulario */
function imprimeCrearFormulario() {
  return `
  <h3>Crear formularios</h3>
  <p>Esta es la sección para gestionar crear formularios</p>
    <div id="typeForm" class="form-group">
      <label>Seleccione el formulario que desea crear:</label>
      <select id="formType">
          <option value="">Seleccione una opción</option>
          <option value="matricula">Formulario de Matrícula</option>
          <option value="evaluacion">Formulario de Evaluación</option>
          <option value="asistenciavirtual">Formulario de Asistencia Virtual</option>
          <option value="informeMensual">Formulario de Informe Mensual</option>
      </select>
    </div>

    <div id="campusField" class="form-group">
      <label for="campus">Seleccione el campus correspondiente:</label>
      <select id="Campus">
        <option value="">Seleccione una opción</option>
        <option value="HO-Campus Omar Dengo">HO-Campus Omar Dengo</option>
        <option value="HB-Campus Benjamín Núñez">HB-Campus Benjamín Núñez</option>
        <option value="BC-Sede Región Brunca: Coto">BC-Sede Región Brunca: Coto</option>
        <option value="BP-Sede Región Brunca: PZ">BP-Sede Región Brunca: PZ</option>
        <option value="CL-Subsede Liberia">CL-Subsede Liberia</option>
        <option value="CN-Subsede Nicoya">CN-Subsede Nicoya</option>
        <option value="HS-Campus Sarapiquí">HS-Campus Sarapiquí</option>
        <option value="SA-Sede Interuniversit. Alajuela">SA-Sede Interuniversit. Alajuela</option>
      </select>
    </div>

    <div id="creaForm" class="form-group">
      <label>Seleccione el tipo de creación:</label>
      <div class="radio-group">
        <label class= "lradio"><input type="radio" name="tipo" value="rango" onchange="showRowField()"> Rango</label>
        <label class= "lradio"><input type="radio" name="tipo" value="grupal" onchange="showRowField()"> Individual</label>
        <label class= "lradio"><input type="radio" name="tipo" value="general" onchange="showRowField()"> General</label>
      </div>
    </div>

    <div id="rowField" class="hidden form-group">
      <label for="fila">Indique la fila de la tutoria que desea crear:</label>
      <input type="text" id="fila" name="fila">
    </div>

    <div id="rowStartField" class="hidden form-group">
      <label for="filaIni">Indique la fila de inicio del rango:</label>
      <input type="text" id="filaIni" name="fila">
    </div>

    <div id="rowEndField" class="hidden form-group">
      <label for="filaFin">Indique la fila de fin del rango:</label>
      <input type="text" id="filaFin" name="fila">
    </div>

    <div id="pageField" class="form-group">
      <label for="page">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="cycleField" class="form-group">
      <label for="ciclo">Defina el ciclo actual:</label>
      <input type="text" id="ciclo" name="ciclo">
    </div>

    <div id="yearField" class="form-group">
        <label for="anno">Defina el año actual:</label>
        <input type="text" id="anno" name="anno">
    </div>
      
    <div class="button-container">
      <button id="aceptar" class="btn-V" onclick="crearForms()">
        <i class="fas fa-check"></i>
        Crear
      </button> 
    </div>

  `;
}

/* Imprime en el menú principal el HTML de crear formulario */
function imprimeCrearFormulario1() {
  return `
  <h4 class="mb-4">Crear formularios</h4>
  <p class="mb-4">Esta es la sección para gestionar crear formularios</p>

  <!-- Fila: Tipo de formulario y campus -->
  <div class="d-flex gap-3 mb-3 flex-wrap">
    <div id="typeForm" class="form-group flex-fill">
      <label for="formType" class="form-label">Formulario a crear:</label>
      <select id="formType" class="form-select">
        <option value="">Seleccione una opción</option>
        <option value="matricula">Formulario de Matrícula</option>
        <option value="evaluacion">Formulario de Evaluación</option>
        <option value="asistenciavirtual">Formulario de Asistencia Virtual</option>
        <option value="informeMensual">Formulario de Informe Mensual</option>
      </select>
    </div>

    <div id="campusField" class="form-group flex-fill">
      <label for="Campus" class="form-label">Campus correspondiente:</label>
      <select id="Campus" class="form-select">
        <option value="">Seleccione una opción</option>
        <option value="HO-Campus Omar Dengo">HO-Campus Omar Dengo</option>
        <option value="HB-Campus Benjamín Núñez">HB-Campus Benjamín Núñez</option>
        <option value="BC-Sede Región Brunca: Coto">BC-Sede Región Brunca: Coto</option>
        <option value="BP-Sede Región Brunca: PZ">BP-Sede Región Brunca: PZ</option>
        <option value="CL-Subsede Liberia">CL-Subsede Liberia</option>
        <option value="CN-Subsede Nicoya">CN-Subsede Nicoya</option>
        <option value="HS-Campus Sarapiquí">HS-Campus Sarapiquí</option>
        <option value="SA-Sede Interuniversit. Alajuela">SA-Sede Interuniversit. Alajuela</option>
      </select>
    </div>
  </div>

  <!-- Tipo de creación -->
  <div id="creaForm" class="form-group mb-3">
    <label class="form-label">Tipo de creación:</label>
    <div class="d-flex gap-4 flex-wrap">
      <div class="form-check">
        <input type="radio" class="form-check-input" name="tipo" value="rango" onchange="showRowField()">
        <label class="form-check-label">Rango</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="tipo" value="grupal" onchange="showRowField()">
        <label class="form-check-label">Individual</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="tipo" value="general" onchange="showRowField()">
        <label class="form-check-label">General</label>
      </div>
    </div>
  </div>

  <!-- Fila: inicio y fin de rango + fila individual -->
  <div class="d-flex gap-3 mb-3 flex-wrap">
    <div id="rowField" class="hidden form-group flex-fill">
      <label for="fila" class="form-label">Fila individual:</label>
      <input type="text" id="fila" name="fila" class="form-control">
    </div>

    <div id="rowStartField" class="hidden form-group flex-fill">
      <label for="filaIni" class="form-label">Fila de inicio:</label>
      <input type="text" id="filaIni" name="filaIni" class="form-control">
    </div>

    <div id="rowEndField" class="hidden form-group flex-fill">
      <label for="filaFin" class="form-label">Fila de fin:</label>
      <input type="text" id="filaFin" name="filaFin" class="form-control">
    </div>
  </div>

  <!-- Fila: hoja, ciclo, año -->
  <div class="d-flex gap-3 mb-4 flex-wrap">
    <div id="pageField" class="form-group flex-fill">
      <label for="pages" class="form-label">Hoja de cálculo:</label>
      <select id="pages" class="form-select">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="cycleField" class="form-group flex-fill">
      <label for="ciclo" class="form-label">Ciclo actual:</label>
      <input type="text" id="ciclo" name="ciclo" class="form-control">
    </div>

    <div id="yearField" class="form-group flex-fill">
      <label for="anno" class="form-label">Año actual:</label>
      <input type="text" id="anno" name="anno" class="form-control">
    </div>
  </div>

  <!-- Botón -->
  <div class="text-end">
    <button id="aceptar" class="btn btn-success" onclick="crearForms()">
      <i class="fas fa-check me-2"></i>
      Crear
    </button>
  </div>
  `;
}

/*Imprime en el menu principal el HTML de eliminar formulario */
function imprimeEliminarFormulario() {
  return `

  <h1>Eliminar formularios</h1>
  <p>Esta es la sección para gestionar eliminar formularios</p>
  <div id="typeForm" class="form-group" >
      <label>Seleccione el formulario que desea eliminar:</label>
      <select id="formType">
          <option value="">Seleccione una opción</option>
          <option value="matricula">Formulario de Matrícula</option>
          <option value="evaluacion">Formulario de Evaluación</option>
          <option value="asistenciavirtual">Formulario de Asistencia Virtual</option>
          <option value="informeMensual">Formulario de Informe Mensual</option>
      </select>
    </div>

    <div id="creaForm" class="form-group">
      <label>Seleccione el tipo de eliminación:</label>
      <div class="radio-group">
        <label class= "lradio"><input type="radio" name="tipo" value="rango" onchange="showRowField()"> Rango</label>
        <label class= "lradio"><input type="radio" name="tipo" value="grupal" onchange="showRowField()"> Individual</label>
        <label class= "lradio"><input type="radio" name="tipo" value="general" onchange="showRowField()"> General</label>
      </div>
    </div>

    <div id="rowField" class="hidden form-group" >
      <label for="fila">Indique la fila de la tutoria que desea crear:</label>
      <input type="text" id="fila" name="fila">
    </div>

    <div id="rowStartField" class="hidden form-group">
      <label for="filaIni">Indique la fila de inicio del rango:</label>
      <input type="text" id="filaIni" name="fila">
    </div>

    <div id="rowEndField" class="hidden form-group">
      <label for="filaFin">Indique la fila de fin del rango:</label>
      <input type="text" id="filaFin" name="fila">
    </div>

    <div id="pageField" class="form-group">
      <label for="page">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages">
        <option value="">Seleccione una opción</option>
      </select>
    </div>
      
    <div class="button-container">
      <button id="eliminar" class="btn-RE" onclick="eliminarForms()">
        <i class="fas fa-times"></i>
        Eliminar
      </button> 
    </div>
  `;
}

function imprimeEliminarFormulario1() {
  return `
  <div class="container mt-4">
    <h3 class="mb-3">Eliminar formularios</h3>
    <p class="mb-4">Esta es la sección para gestionar eliminar formularios</p>

    <div class="mb-3">
      <label for="formType" class="form-label">Seleccione el formulario que desea eliminar:</label>
      <select id="formType" class="form-select">
        <option value="">Seleccione una opción</option>
        <option value="matricula">Formulario de Matrícula</option>
        <option value="evaluacion">Formulario de Evaluación</option>
        <option value="asistenciavirtual">Formulario de Asistencia Virtual</option>
        <option value="informeMensual">Formulario de Informe Mensual</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Seleccione el tipo de eliminación:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Fila de la tutoría a eliminar:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-4">
      <label for="pages" class="form-label">Nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button id="eliminar" class="btn btn-danger" onclick="eliminarForms()">
        <i class="fas fa-times me-2"></i>Eliminar
      </button>
    </div>
  </div>
  `;
}

/*Imprime en el menu principal el HTML de crear hoja asistencia */
function imprimeCrearHojaAsistencia(){
  return `

    <h1>Crear hojas asistencia</h1>
    <p>Esta es la sección para crear hojas de asistencia</p>
    <div id="campusField" class="form-group">
      <label for="campus">Seleccione el campus correspondiente:</label>
      <select id="Campus">
        <option value="">Seleccione una opción</option>
        <option value="HO-Campus Omar Dengo">HO-Campus Omar Dengo</option>
        <option value="HB-Campus Benjamín Núñez">HB-Campus Benjamín Núñez</option>
        <option value="BC-Sede Región Brunca: Coto">BC-Sede Región Brunca: Coto</option>
        <option value="BP-Sede Región Brunca: PZ">BP-Sede Región Brunca: PZ</option>
        <option value="CL-Subsede Liberia">CL-Subsede Liberia</option>
        <option value="CN-Subsede Nicoya">CN-Subsede Nicoya</option>
        <option value="HS-Campus Sarapiquí">HS-Campus Sarapiquí</option>
        <option value="SA-Sede Interuniversit. Alajuela">SA-Sede Interuniversit. Alajuela</option>
      </select>
    </div>

    <div id="creaForm" class="form-group">
      <label>Seleccione el tipo de creación:</label>
      <div class="radio-group">
        <label class= "lradio"><input type="radio" name="tipo" value="rango" onchange="showRowField()"> Rango</label>
        <label class= "lradio"><input type="radio" name="tipo" value="grupal" onchange="showRowField()"> Individual</label>
        <label class= "lradio"><input type="radio" name="tipo" value="general" onchange="showRowField()"> General</label>
      </div>
    </div>

    <div id="rowField" class="hidden form-group" >
      <label for="fila">Indique la fila de la tutoria que desea crear:</label>
      <input type="text" id="fila" name="fila">
    </div>

    <div id="rowStartField" class="hidden form-group">
      <label for="filaIni">Indique la fila de inicio del rango:</label>
      <input type="text" id="filaIni" name="fila">
    </div>

    <div id="rowEndField" class="hidden form-group">
      <label for="filaFin">Indique la fila de fin del rango:</label>
      <input type="text" id="filaFin" name="fila">
    </div>

    <div id="pageField" class="form-group">
      <label for="page">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="dateField" class="form-group">
        <label for="fecha">Defina la fecha de inicio de tutorias:</label>
        <input type="date" id="fecha" name="fecha">
    </div>

    <div id="periodoField" class="form-group">
        <label for="periodo">Defina el periodo:</label>
        <input type="text" id="periodo" name="periodo">
    </div>
      
    <div class="button-container">
      <button id="aceptar" class="btn-V" onclick="crearHoja()">
        <i class="fas fa-check"></i>
        Crear
      </button>
    </div>

  `;
}
function imprimeActualizarHojaAsistencia() {
  return `
    <h3 class="mb-4">Actualizar hojas asistencia</h3>
    <p class="mb-4">Esta es la sección para actualizar hojas de asistencia</p>

    <div class="mb-3">
      <label class="form-label">Seleccione el tipo de actualización:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" onchange="showRowField()">
        <label class="form-check-label">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" onchange="showRowField()">
        <label class="form-check-label">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" onchange="showRowField()">
        <label class="form-check-label">General</label>
      </div>
    </div>

    <div class="row hidden" id="rowField">
      <div class="col-md-6 mb-3">
        <label for="fila" class="form-label">Indique la fila de la tutoría que desea actualizar:</label>
        <input type="text" class="form-control" id="fila" name="fila">
      </div>
    </div>

    <div class="row hidden" id="rowStartField">
      <div class="col-md-6 mb-3">
        <label for="filaIni" class="form-label">Indique la fila de inicio del rango:</label>
        <input type="text" class="form-control" id="filaIni" name="filaIni">
      </div>
    </div>

    <div class="row hidden" id="rowEndField">
      <div class="col-md-6 mb-3">
        <label for="filaFin" class="form-label">Indique la fila de fin del rango:</label>
        <input type="text" class="form-control" id="filaFin" name="filaFin">
      </div>
    </div>

    <div class="mb-3">
      <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div class="button-container">
      <button id="aceptar" class="btn btn-primary" onclick="actualizarHojaAsistencia()">
        <i class="fas fa-check"></i> Actualizar
      </button>
    </div>
  `;
}


function imprimeCrearHojaAsistencia1() {
  return `
    <div class="container py-3">
      <h3 class="mb-4">Crear hojas asistencia</h3>
      <p class="mb-4">Esta es la sección para crear hojas de asistencia</p>

      <div class="mb-3">
        <label for="campus" class="form-label">Seleccione el campus correspondiente:</label>
        <select id="Campus" class="form-select">
          <option value="">Seleccione una opción</option>
          <option value="HO-Campus Omar Dengo">HO-Campus Omar Dengo</option>
          <option value="HB-Campus Benjamín Núñez">HB-Campus Benjamín Núñez</option>
          <option value="BC-Sede Región Brunca: Coto">BC-Sede Región Brunca: Coto</option>
          <option value="BP-Sede Región Brunca: PZ">BP-Sede Región Brunca: PZ</option>
          <option value="CL-Subsede Liberia">CL-Subsede Liberia</option>
          <option value="CN-Subsede Nicoya">CN-Subsede Nicoya</option>
          <option value="HS-Campus Sarapiquí">HS-Campus Sarapiquí</option>
          <option value="SA-Sede Interuniversit. Alajuela">SA-Sede Interuniversit. Alajuela</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Seleccione el tipo de creación:</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipo" value="rango" onchange="showRowField()">
          <label class="form-check-label">Rango</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipo" value="grupal" onchange="showRowField()">
          <label class="form-check-label">Individual</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="tipo" value="general" onchange="showRowField()">
          <label class="form-check-label">General</label>
        </div>
      </div>

      <div class="row hidden" id="rowField">
        <div class="col-md-6 mb-3">
          <label for="fila" class="form-label">Indique la fila de la tutoría que desea crear:</label>
          <input type="text" class="form-control" id="fila" name="fila">
        </div>
      </div>

      <div class="row hidden" id="rowStartField">
        <div class="col-md-6 mb-3">
          <label for="filaIni" class="form-label">Indique la fila de inicio del rango:</label>
          <input type="text" class="form-control" id="filaIni" name="fila">
        </div>
      </div>

      <div class="row hidden" id="rowEndField">
        <div class="col-md-6 mb-3">
          <label for="filaFin" class="form-label">Indique la fila de fin del rango:</label>
          <input type="text" class="form-control" id="filaFin" name="fila">
        </div>
      </div>

      <div class="mb-3">
        <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
        <select id="pages" class="form-select">
          <option value="">Seleccione una opción</option>
        </select>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="fecha" class="form-label">Defina la fecha de inicio de tutorías:</label>
          <input type="date" class="form-control" id="fecha" name="fecha">
        </div>
        <div class="col-md-6 mb-3">
          <label for="periodo" class="form-label">Defina el periodo:</label>
          <input type="text" class="form-control" id="periodo" name="periodo">
        </div>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <button id="aceptar" class="btn btn-success" onclick="crearHoja()">
          <i class="fas fa-check me-2"></i> Crear
        </button>
      </div>
    </div>
  `;
}

/*Imprime en el menu principal el HTML de eliminar hojas de asistencia */
function imprimeEliminarHojaAsistencia() {
  return `
  <h1>Eliminar hojas de asistencia</h1>
  <p>Esta es la sección para gestionar eliminar hojas de asistencia</p>
     <div id="creaForm" class="form-group">
      <label>Seleccione el tipo de eliminación:</label>
      <div class="radio-group">
        <label class= "lradio"><input type="radio" name="tipo" value="rango" onchange="showRowField()"> Rango</label>
        <label class= "lradio"><input type="radio" name="tipo" value="grupal" onchange="showRowField()"> Individual</label>
        <label class= "lradio"><input type="radio" name="tipo" value="general" onchange="showRowField()"> General</label>
      </div>
    </div>

    <div id="rowField" class="hidden form-group">
      <label for="fila">Indique la fila de la tutoria que desea eliminar:</label>
      <input type="text" id="fila" name="fila">
    </div>

    <div id="rowStartField" class="hidden form-group">
      <label for="filaIni">Indique la fila de inicio del rango:</label>
      <input type="text" id="filaIni" name="fila">
    </div>

    <div id="rowEndField" class="hidden form-group">
      <label for="filaFin">Indique la fila de fin del rango:</label>
      <input type="text" id="filaFin" name="fila">
    </div>

    <div id="pageField" class="form-group">
      <label for="page">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages">
        <option value="">Seleccione una opción</option>
      </select>
    </div>
      
    <div class="button-container">
      <button id="eliminarhoja" class="btn-RE" onclick="eliminarHoja()">
        <i class="fas fa-times"></i>
        Eliminar
      </button>
  `;
}

function imprimeEliminarHojaAsistencia1() {
  return `
  <div class="container py-4">
  <h3 class="mb-3">Eliminar hojas de asistencia</h3>
  <p>Esta es la sección para gestionar la eliminación de hojas de asistencia.</p>

    <div class="mb-3">
      <label class="form-label">Seleccione el tipo de eliminación:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Fila de la tutoría a eliminar:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-4">
      <label for="pages" class="form-label">Nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button id="eliminar" class="btn btn-danger" onclick="eliminarHoja()">
        <i class="fas fa-times me-2"></i>Eliminar
      </button>
    </div>
  </div>
  </div>
  `;
}

/*Imprime en el menu principal el HTML de estudiante */
function imprimeBusquedaEstudiante() {
  return `
    <h1>Búsqueda</h1>
    <p>Esta es la sección para la búsqueda de estudiantes</p>
    <div id="rowField" class="search-group" >
      <label for="fila">Correo del estudiante:</label>
      <input type="text" id="correoEstudiante" name="correo">
      <button id="buscar" class="btn-Az" onclick="buscarEstudiante()">
        <i class="fas fa-search"></i>
        Buscar
      </button> 
    </div>
    <div id="infoEstudiante" >
      
    </div>

     <div id="tableContainer">

    <!-- Tabla para mostrar los resultados -->
    <table id="resultsTable">
      <thead>
        <tr>
          <th>Tutoría</th>
          <th>Área</th>
          <th>Fila</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody id="resultsTableBody">
        <!-- Las filas se agregarán aquí dinámicamente -->
      </tbody>
    </table>

  </div>

 <div id="loadingSpinner" class="spinner-wheel hidden"></div>

  `;
}

function imprimeBusquedaEstudiante1() {
  return `
    <div class="container mt-4">
      <h3 class="mb-3">Búsqueda</h3>
      <p>Esta es la sección para la búsqueda de estudiantes</p>

      <div class="mb-4">
        <label for="correoEstudiante" class="form-label">Correo del estudiante:</label>
        <div class="input-group">
          <input type="text" id="correoEstudiante" name="correo" class="form-control" placeholder="nombre.apellido.apellido@est.una.ac.cr" style="margin-right:15px">
          <button id="buscar" class="btn btn-primary" onclick="buscarEstudiante()">
            <i class="fas fa-search"></i> Buscar
          </button>
        </div>
      </div>

      <div id="infoEstudiante" class="mb-4">
        <!-- Información del estudiante se mostrará aquí -->
      </div>

      <div id="tableContainer" class="table-responsive">
        <table id="resultsTable" class="table table-bordered table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>Tutoría</th>
              <th>Área</th>
              <th>Fila</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody id="resultsTableBody">
            <!-- Las filas se agregarán aquí dinámicamente -->
          </tbody>
        </table>
      </div>
    </div>

    <div id="loadingSpinner" class="d-none text-center my-4">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
  `;
}

/*Imprime en el menu principal el HTML de las opciones de datos para actualizar */
function imprimeOpcionesDatos() {
  return `
  <h1>Actualizar datos</h1>
  <p>Seleccione el área de datos que desee actualizar: </p>
  <div class="buttons-container">
     <div class="button-container">
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Estadisticas')">
        <i class="fas fa-sync-alt"></i>
        Estadísticas
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Matriculas')">
        <i class="fas fa-sync-alt"></i>
        Matrículas
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Retiros')">
        <i class="fas fa-sync-alt"></i>
        Retiros
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Justificaciones')">
        <i class="fas fa-sync-alt"></i>
        Justificaciones
      </button>
    </div>
    <div class="button-container">
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Asistencia Virtual')">
        <i class="fas fa-sync-alt"></i>
        Asistencia virtual
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Evaluaciones')">
        <i class="fas fa-sync-alt"></i>
        Evaluaciones
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Informes')">
        <i class="fas fa-file-alt"></i>
        Informes
      </button>
      <button class="btn-R op-Button" onclick="loadContent('Actualizar Nuevos Estudiantes')">
        <i class="fas fa-file-alt"></i>
        Nuevos Estudiantes
      </button>
    </div>
  </div>

  `;
}

function imprimeOpcionesDatos1() {
  return `
    <div class="container py-4">
    <h3 class="mb-4">Actualizar datos</h3>
    <p class="mb-4">Seleccione el área de datos que desea actualizar:</p>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Estadisticas')">
              <i class="fas fa-sync-alt me-2"></i> Estadísticas
            </button>
            <p class="card-text">Actualiza los cálculos estadísticos como tasas de deserción y efectividad.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Matriculas')">
              <i class="fas fa-sync-alt me-2"></i> Matrículas
            </button>
            <p class="card-text">Actualiza el número total de estudiantes matriculados por tutoría.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Retiros')">
              <i class="fas fa-sync-alt me-2"></i> Retiros
            </button>
            <p class="card-text">Registra y actualiza los estudiantes que se han retirado de las tutorías.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Justificaciones')">
              <i class="fas fa-sync-alt me-2"></i> Justificaciones
            </button>
            <p class="card-text">Actualiza las justificaciones presentadas por inasistencias u otros motivos.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Asistencia Virtual')">
              <i class="fas fa-sync-alt me-2"></i> Asistencia virtual
            </button>
            <p class="card-text">Registra la asistencia de estudiantes en sesiones virtuales.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Evaluaciones')">
              <i class="fas fa-sync-alt me-2"></i> Evaluaciones
            </button>
            <p class="card-text">Actualiza los resultados de las evaluaciones aplicadas a los estudiantes.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Informes')">
              <i class="fas fa-file-alt me-2"></i> Informes
            </button>
            <p class="card-text">Carga o actualiza los informes generados sobre las tutorías.</p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-body">
            <button class="btn btn-danger mb-2" onclick="loadContent('Actualizar Nuevos Estudiantes')">
              <i class="fas fa-file-alt me-2"></i> Nuevos Estudiantes
            </button>
            <p class="card-text">Agrega o actualiza la información de estudiantes de primer ingreso.</p>
          </div>
        </div>
      </div>
    </div>
    </div>

  `;
}

/*Imprime en el menu principal el HTML de correos estudiantes */
function imprimeCorreosEstudiantes() {
  return `

    <h1>Enviar correos a estudiantes</h1>
    <p>Esta es la sección para crear correos para estudiantes</p>

    <div id="typeForm" class="form-group">
      <label>Seleccione el correo que desea enviar:</label>
      <select id="formType" onchange="showCorreo()">
          <option value="">Seleccione una opción</option>
          <option value="Evaluacion">Evaluación de tutorias</option>
          <option value="Links">Links de importancia</option>
          <option value="Nuevos">Asignación de Aulas (Nuevos estudiantes)</option>
          <option value="Apertura">Apertura en espera</option>
          <option value="Personalizado">Personalizado</option>
      </select>
    </div>

    <div id=creaForm class="form-group">
      <label>Seleccione el tipo de creación:</label>
      <div class="radio-group">
        <label class= "lradio"><input type="radio" name="tipo" value="rango" onchange="showRowField()"> Rango</label>
        <label class= "lradio"><input type="radio" name="tipo" value="grupal" onchange="showRowField()"> Individual</label>
        <label class= "lradio"><input type="radio" name="tipo" value="general" onchange="showRowField()"> General</label>
      </div>
    </div>

    <div id="rowField" class="hidden form-group">
      <label for="fila">Indique la fila de la tutoria:</label>
      <input type="text" id="fila" name="fila">
    </div>

    <div id="rowStartField" class="hidden form-group">
      <label for="filaIni">Indique la fila de inicio del rango:</label>
      <input type="text" id="filaIni" name="fila">
    </div>

    <div id="rowEndField" class="hidden form-group">
      <label for="filaFin">Indique la fila de fin del rango:</label>
      <input type="text" id="filaFin" name="fila">
    </div>

    <div id="pageField" class="form-group">
      <label for="page">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages">
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="asuntoField" class="hidden form-group">
      <label for="asunto">Asunto:</label>
      <input type="text" id="asunto" name="asunto">
    </div>

    <div id="correoField" class="hidden form-group">
        <label for="correo">Correo:</label>
        <textarea id="correo" name="correo"></textarea>
    </div>

    <div class="button-container">
      <button id="aceptar" class="btn-V" onclick="creaCorreoEstudiante()">
        <i class="fas fa-check"></i>
        Enviar
      </button> 
    </div>
  `;
}

function imprimeCorreosEstudiantes1() {
  return `
    <div class="container mt-5">
    <h3 class="mb-4">Enviar correos a estudiantes</h3>
    <p class="mb-4">Esta es la sección para crear correos para estudiantes</p>

    <div class="mb-3">
      <label for="formType" class="form-label">Seleccione el correo que desea enviar:</label>
      <select id="formType" class="form-select" onchange="showCorreo()">
        <option value="">Seleccione una opción</option>
        <option value="Evaluacion">Evaluación de tutorías</option>
        <option value="Links">Links de importancia</option>
        <option value="Nuevos">Asignación de Aulas (Nuevos estudiantes)</option>
        <option value="Apertura">Apertura en espera</option>
        <option value="Personalizado">Personalizado</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Indique el tipo de selección de datos:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Indique la fila de la tutoría:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-3">
      <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select" required>
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="asuntoField" class="mb-3 d-none">
      <label for="asunto" class="form-label">Asunto:</label>
      <input type="text" id="asunto" class="form-control" name="asunto">
    </div>

    <div id="correoField" class="mb-3 d-none">
      <label for="correo" class="form-label">Correo:</label>
      <textarea id="correo" class="form-control" name="correo" rows="5"></textarea>
    </div>

    <div class="text-end">
      <button id="aceptar" class="btn btn-success" onclick="creaCorreoEstudiante()">
        <i class="fas fa-check me-2"></i>Enviar
      </button>
    </div>
  </div>

  `;
}

/*Imprime en el menu principal el HTML de correos tutores */
function imprimeCorreosTutores() {
  return `

    <h3>Enviar correos a tutores</h3>
    <p>Esta es la sección para crear correos para tutores</p>

    <div id="typeForm" class="form-group">
      <label>Seleccione el correo que desea enviar:</label>
      <select id="formType" onchange="showCorreo()">
          <option value="">Seleccione una opción</option>
          <option value="AsignacionAula">Asignación de aula</option>
          <option value="ReAsignacionAula">Reasignación de aula</option>
          <option value="AsistenciaVirtual">Formularios de asistencia virtual</option>
          <option value="CorreoContrato">Contrato persona tutora</option>
          <option value="InformeMensual">Informe mensual</option>
          <option value="Espera">Espera apertura</option>
          <option value="Cierre">Cierre tutoría</option>
          <option value="Personalizado">Personalizado</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Indique el tipo de selección de datos:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Indique la fila de la tutoría:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-3">
      <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select" required>
        <option value="">Seleccione una opción</option>
      </select>
    </div>

    <div id="asuntoField" class="hidden form-group">
      <label for="asunto">Asunto:</label>
      <input type="text" id="asunto" name="asunto">
    </div>

    <div id="correoField" class="hidden form-group">
        <label for="correo">Correo:</label>
        <textarea id="correo" name="correo"></textarea>
    </div>
      
    <div class="button-container">
      <button id="aceptar" class="btn-V" onclick="creaCorreoTutor()">
        <i class="fas fa-check"></i>
        Crear
      </button> 
    </div>
  `;
}

function imprimeCorreosTutores1() {
  return `
    <div class="container py-4">
      <h3 class="mb-4">Enviar correos a tutores</h3>
      <p class="mb-4">Esta es la sección para crear correos para tutores</p>

      <div class="mb-3">
        <label for="formType" class="form-label">Seleccione el correo que desea enviar:</label>
        <select id="formType" class="form-select" onchange="showCorreo()">
          <option value="">Seleccione una opción</option>
          <option value="AsignacionAula">Asignación de aula</option>
          <option value="ReAsignacionAula">Reasignación de aula</option>
          <option value="AsistenciaVirtual">Formularios de asistencia virtual</option>
          <option value="CorreoContrato">Contrato persona tutora</option>
          <option value="InformeMensual">Informe mensual</option>
          <option value="Espera">Espera apertura</option>
          <option value="Cierre">Cierre tutoría</option>
          <option value="Personalizado">Personalizado</option>
        </select>
      </div>

      <div class="mb-3">
      <label class="form-label">Indique el tipo de selección de datos:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Indique la fila de la tutoría:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-3">
      <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select" required>
        <option value="">Seleccione una opción</option>
      </select>
    </div>

      <div id="asuntoField" class="mb-3 d-none">
        <label for="asunto" class="form-label">Asunto:</label>
        <input type="text" class="form-control" id="asunto" name="asunto">
      </div>

      <div id="correoField" class="mb-3 d-none">
        <label for="correo" class="form-label">Correo:</label>
        <textarea class="form-control" id="correo" name="correo" rows="5"></textarea>
      </div>

      <div class="text-end">
        <button id="aceptar" class="btn btn-success" onclick="creaCorreoTutor()">
          <i class="fas fa-check me-2"></i>Crear
        </button>
      </div>
    </div>
  `;
}

function imprimeCorreosTodos() {
  return `
    <div class="container py-4">
      <h3 class="mb-4">Enviar correos a estudiantes y tutores</h3>
      <p class="mb-4">Esta es la sección para crear correos para tutores</p>

      <div class="mb-3">
        <label for="formType" class="form-label">Seleccione el correo que desea enviar:</label>
        <select id="formType" class="form-select" onchange="showCorreo()">
          <option value="">Seleccione una opción</option>
          <option value="AsignacionAula">Asignación de aula</option>
          <option value="ReAsignacionAula">Reasignación de aula</option>
          <option value="Espera">Tutoría en espera de apertura</option>
          <option value="AsistenciaVirtual">Formularios de asistencia virtual</option>
          <option value="Cierre">Cierre de tutoría</option>
          <option value="Links">Links de importancia</option>
        </select>
      </div>

      <div class="mb-3">
      <label class="form-label">Indique el tipo de selección de datos:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="rango" id="radioRango" onchange="showRowField()">
        <label class="form-check-label" for="radioRango">Rango</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="grupal" id="radioGrupal" onchange="showRowField()">
        <label class="form-check-label" for="radioGrupal">Individual</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" value="general" id="radioGeneral" onchange="showRowField()">
        <label class="form-check-label" for="radioGeneral">General</label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3 hidden" id="rowField">
        <label for="fila" class="form-label">Indique la fila de la tutoría:</label>
        <input type="text" id="fila" name="fila" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowStartField">
        <label for="filaIni" class="form-label">Fila de inicio del rango:</label>
        <input type="text" id="filaIni" name="filaIni" class="form-control">
      </div>
      <div class="col-md-4 mb-3 hidden" id="rowEndField">
        <label for="filaFin" class="form-label">Fila de fin del rango:</label>
        <input type="text" id="filaFin" name="filaFin" class="form-control">
      </div>
    </div>

    <div class="mb-3">
      <label for="pages" class="form-label">Indique el nombre de la hoja de cálculo:</label>
      <select id="pages" class="form-select" required>
        <option value="">Seleccione una opción</option>
      </select>
    </div>

      <div id="asuntoField" class="mb-3 d-none">
        <label for="asunto" class="form-label">Asunto:</label>
        <input type="text" class="form-control" id="asunto" name="asunto">
      </div>

      <div id="correoField" class="mb-3 d-none">
        <label for="correo" class="form-label">Correo:</label>
        <textarea class="form-control" id="correo" name="correo" rows="5"></textarea>
      </div>

      <div class="text-end">
        <button id="aceptar" class="btn btn-success" onclick="creaCorreoTodos()">
          <i class="fas fa-check me-2"></i>Crear
        </button>
      </div>
    </div>
  `;
}

/*Imprime en el menu principal el HTML de selección de hoja */
function imprimeSeleccionHoja() {
  return `
    <h3>Selecciona las hojas que necesite para continuar con el proceso:</h3>
    <form id="sheetForm">
      <div id="checkboxes" class="checkbox-container">
        <!-- Aquí se insertarán los checkboxes -->
      </div>
    </form>
  `;
}
function imprimeSeleccionHoja1() {
  return `
    <h3 class="mb-4">Selección de áreas</h3>
    <p class="mb-4">Selecciona las hojas que necesite para continuar con el proceso:</p>

    <form id="sheetForm">
      <div id="checkboxes" class="row row-cols-1 row-cols-md-2 g-2">
        <!-- Aquí se insertarán los checkboxes dinámicamente -->
      </div>
    </form>
  `;
}


function imprimeGenerarSesae(){
  return `
  <h4 class="mb-4 text-center">Selecciona las hojas de cada base</h4>

  <div class="row">
    <div class="col-md-6">
      <h5>Campus Omar Dengo y Benjamín Núñez</h5>
      <div id="base1-checkboxes" class="checkbox-list"></div>
    </div>
    <div class="col-md-6">
      <h5>Sedes Regionales</h5>
      <div id="base2-checkboxes" class="checkbox-list"></div>
    </div>
  </div>

  <div class="text-center">
    <button id="btn_createSESAE" class="btn btn-primary px-5 py-2 fs-5" onclick="enviarSeleccionSESAE()">
      <i class="fas fa-check me-2"></i>
      Crear reporte
    </button>
  </div>
`;
}

function imprimeGenerarPOA(){
  return `
  <h4 class="mb-4 text-center">Selecciona las hojas de cada base</h4>

  <div class="row">
    <div class="col-md-6">
      <h5>Campus Omar Dengo y Benjamín Núñez</h5>
      <div id="base1-checkboxes" class="checkbox-list"></div>
    </div>
    <div class="col-md-6">
      <h5>Sedes Regionales</h5>
      <div id="base2-checkboxes" class="checkbox-list"></div>
    </div>
  </div>

  <div class="text-center">
    <button id="btn_createSESAE" class="btn btn-primary px-5 py-2 fs-5" onclick="enviarSeleccionPOA()">
      <i class="fas fa-check me-2"></i>
      Crear reporte
    </button>
  </div>
`;
}

function imprimeReporteEvaluacion(){
  return `
  <h4 class="mb-4 text-center">Selecciona las hojas de cada base</h4>

  <div class="row">
    <div class="col-md-6">
      <h5>Campus Omar Dengo y Benjamín Núñez</h5>
      <div id="base1-checkboxes" class="checkbox-list"></div>
    </div>
    <div class="col-md-6">
      <h5>Sedes Regionales</h5>
      <div id="base2-checkboxes" class="checkbox-list"></div>
    </div>
  </div>

  <div class="text-center">
    <button id="btn_createReporteEvaluacion" class="btn btn-primary px-5 py-2 fs-5" onclick="seleccionReporteEvaluacion()">
      <i class="fas fa-check me-2"></i>
      Crear reporte
    </button>
  </div>
`;
}
function imprimeReporteParticipacion(){
  return `
  <h4 class="mb-4 text-center">Selecciona las hojas de cada base</h4>

  <div class="row">
    <div class="col-md-6">
      <h5>Campus Omar Dengo y Benjamín Núñez</h5>
      <div id="base1-checkboxes" class="checkbox-list"></div>
    </div>
    <div class="col-md-6">
      <h5>Sedes Regionales</h5>
      <div id="base2-checkboxes" class="checkbox-list"></div>
    </div>
  </div>

  <div class="text-center">
    <button id="btn_createReporteParticipacion" class="btn btn-primary px-5 py-2 fs-5" onclick="seleccionReporteParticipacion()">
      <i class="fas fa-check me-2"></i>
      Crear reporte
    </button>
  </div>
`;
}
