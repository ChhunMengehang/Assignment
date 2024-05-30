document.addEventListener("DOMContentLoaded", function () {
  // Get value from input
  var form = document.getElementById("form-login");
  var nameInput = document.getElementById("InputName");
  var phoneInput = document.getElementById("InputPhone");
  var emailInput = document.getElementById("InputEmail");
  var contactTable = document.querySelector("table tbody");

  // Create var for localStorage
  var contactForm = JSON.parse(localStorage.getItem("contact")) || [];
  var editData = null;

  // Create button for delete and update
  function tableContacts() {
    contactTable.innerHTML = "";
    contactForm.forEach((contact, index) => {
      var tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${contact.name}</td>
          <td>${contact.phone}</td>
          <td>${contact.email}</td>
          <td>${contact.date}</td>
          <td>
            <button class="btn btn-info btn-edit" data-index="${index}">Edit</button>
            <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
          </td>
        `;
      contactTable.appendChild(tr);
    });
  }

  // Save data in localStorage when refreshing
  function saveContact() {
    localStorage.setItem("contact", JSON.stringify(contactForm));
  }

  // Add data and edit data
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var phone = phoneInput.value.trim();
    var email = emailInput.value.trim();
    var date = new Date().toLocaleString();

    if (editData !== null) {
      contactForm[editData] = { name, phone, email, date };
      editData = null;
    } else {
      contactForm.push({ name, phone, email, date });
    }

    saveContact();
    tableContacts();
    form.reset();
  });

  contactTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-edit")) {
      var index = e.target.getAttribute("data-index");
      var contact = contactForm[index];
      nameInput.value = contact.name;
      phoneInput.value = contact.phone;
      emailInput.value = contact.email;
      editData = index;
    } else if (e.target.classList.contains("btn-delete")) {
      var index = e.target.getAttribute("data-index");
      contactForm.splice(index, 1);
      saveContact();
      tableContacts();
    }
  });

  tableContacts();
});
