// Obtener elementos del DOM
const formDocentes = document.getElementById("formRegisterDocente");
const nombreDocenteInput = document.getElementById("nombreDocenteInput");
const documentoDocenteInput = document.getElementById("documentoDocenteInput");
const correoDocenteInput = document.getElementById("correoDocenteInput");
const tableBodyDocentes = document.getElementById("tableBodyDocentes");

// Obtener los datos almacenados en Local Storage
let dataDocentes = JSON.parse(localStorage.getItem("docentes")) || [];

// Agregar un elemento predeterminado si el array de datos está vacío
if (dataDocentes.length === 0) {
  const defaultData = {
    nombreDocente: "Juan Ortiz",
    documentoDocente: "1234567890",
    correoDocente: "example@example.com",
  };
  dataDocentes.push(defaultData);
  saveDataToLocalStorage();
}

// Event Listener para el evento "submit"
formDocentes.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const nombreDocente = nombreDocenteInput.value;
  const documentoDocente = documentoDocenteInput.value;
  const correoDocente = correoDocenteInput.value;

  // Verificar que todos los campos estén completos
  if (nombreDocente && documentoDocente && correoDocente) {    
    const newDocenteData = { nombreDocente, documentoDocente, correoDocente };
    dataDocentes.push(newDocenteData);
    saveDataDocentesToLocalStorage();
    renderTableDocentes();
    formDocentes.reset();
  }else{
    alert('Todos los campos de la tabla docentes son obligatorios')
  }
});

// Guardar los datos de docentes en Local Storage
function saveDataDocentesToLocalStorage() {
  localStorage.setItem("docentes", JSON.stringify(dataDocentes));
}

// Renderizar la tabla de docentes con los datos
function renderTableDocentes() {
  tableBodyDocentes.innerHTML = "";  

  dataDocentes.forEach(function (item, index) {
    const row = document.createElement("tr");
    const nombreCell = document.createElement("td");
    const documentoCell = document.createElement("td");
    const correoCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nombreCell.textContent = item.nombreDocente;
    documentoCell.textContent = item.documentoDocente;
    correoCell.textContent = item.correoDocente;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    actionCell.classList.add("column--action");
    editButton.classList.add("button", "button--secondary"); 
    deleteButton.classList.add("button", "button--tertiary");

    editButton.addEventListener("click", function () {
      editDocenteData(index);
    });

    deleteButton.addEventListener("click", function () {
      deleteDocenteData(index);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(nombreCell);
    row.appendChild(documentoCell);
    row.appendChild(correoCell);
    row.appendChild(actionCell);

    tableBodyDocentes.appendChild(row);

    // Agregar las opciones de docentes al elemento select
    const teacherSelect = document.getElementById("teacherSelect");
    teacherSelect.innerHTML = "<option value=''>Seleccionar docente</option>";

    dataDocentes.forEach(function (item) {
      const option = document.createElement("option");
      option.value = item.nombreDocente;
      option.textContent = item.nombreDocente;
      teacherSelect.appendChild(option);
    });
  });
}

// Editar los datos de docentes
function editDocenteData(index) {
  const item = dataDocentes[index]; 
  nombreDocenteInput.value = item.nombreDocente; 
  documentoDocenteInput.value = item.documentoDocente;
  correoDocenteInput.value = item.correoDocente; 
  dataDocentes.splice(index, 1); 
  saveDataDocentesToLocalStorage();
  renderTableDocentes(); 
}

// Eliminar los datos de docentes
function deleteDocenteData(index) {
  dataDocentes.splice(index, 1);
  saveDataDocentesToLocalStorage();
  renderTableDocentes();
}

// Cargar y renderizar los datos desde Local Storage al cargar la página
renderTableDocentes();
