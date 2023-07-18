// Obtener elementos del DOM
const form = document.getElementById("formRegister");
const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descriptionInput");
const durationInput = document.getElementById("durationInput");
const priceInput = document.getElementById("priceInput");
const dateInput = document.getElementById("dateInput");
const teacherInput = document.getElementById("teacherInput");
const tableBody = document.getElementById("tableBody");

// Obtener los datos almacenados en Local Storage
let data = JSON.parse(localStorage.getItem("cursos")) || [];

// Agregar un elemento predeterminado si el array de datos está vacío
if (data.length === 0) {
  const defaultData = {
    name: "Curso de ejemplo",
    description: "Descripción del curso de ejemplo",
    duration: 1,
    price: "20.000",
    date: "2023-07-17T12:00",
    teacher: "Juan Ortiz",
  };
  data.push(defaultData);
  saveDataToLocalStorage();
}

// Guardar los datos en Local Storage
function saveDataToLocalStorage() {
  localStorage.setItem("cursos", JSON.stringify(data));
}

// Event Listener para el evento "submit"
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const description = descriptionInput.value;
  const duration = parseInt(durationInput.value);
  const price = priceInput.value;
  const date = dateInput.value;
  const teacher = teacherSelect.value;

  // Verificar que todos los campos estén completos
  if (name && description && !isNaN(duration) && !isNaN(price) && date && teacher) {    
    const newData = { name, description, duration, price, date, teacher };
    data.push(newData);
    saveDataToLocalStorage();
    renderTable();
    form.reset();
  }else{
    alert('Todos los campos de la tabla cursos son obligatorios')
  }
});

// Guardar los datos en Local Storage
function saveDataToLocalStorage() {
  localStorage.setItem("cursos", JSON.stringify(data));
}

// Renderizar la tabla con los datos
function renderTable() {

  // Ordenar los datos por fecha
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  tableBody.innerHTML = "";

  data.forEach(function (item, index) {
    
    const row = document.createElement("tr");
    const nameCell = document.createElement("td"); 
    const descriptionCell = document.createElement("td");
    const durationCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const teacherCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameCell.textContent = item.name; 
    descriptionCell.textContent = item.description;
    durationCell.textContent = item.duration;
    priceCell.textContent = item.price;
    dateCell.textContent = item.date;
    teacherCell.textContent = item.teacher;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    actionCell.classList.add("column--action");
    editButton.classList.add("button", "button--secondary");
    deleteButton.classList.add("button", "button--tertiary");

    // Event Listener al botón de editar
    editButton.addEventListener("click", function () {      
      editData(index);
    });

    // Event Listener al botón de eliminar
    deleteButton.addEventListener("click", function () {      
      deleteData(index);
    });

    actionCell.appendChild(editButton); 
    actionCell.appendChild(deleteButton); 

    row.appendChild(nameCell); 
    row.appendChild(descriptionCell); 
    row.appendChild(durationCell);
    row.appendChild(priceCell);
    row.appendChild(dateCell); 
    row.appendChild(teacherCell); 
    row.appendChild(actionCell); 

    tableBody.appendChild(row); 
  });
}

// Editar los datos
function editData(index) {
  const item = data[index];
  nameInput.value = item.name;
  descriptionInput.value = item.description; 
  durationInput.value = item.duration; 
  priceInput.value = item.price;
  dateInput.value = item.date; 
  teacherSelect.value = item.teacher; 
  data.splice(index, 1); 
  saveDataToLocalStorage(); 
  renderTable(); 
}

// Eliminar los datos
function deleteData(index) {
  data.splice(index, 1);
  saveDataToLocalStorage();
  renderTable();
}

// Cargar y renderizar los datos desde Local Storage al cargar la página
renderTable();
