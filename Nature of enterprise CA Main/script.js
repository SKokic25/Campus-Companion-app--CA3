function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  localStorage.setItem("userName", username);
  localStorage.setItem("userRole", role);


  document.getElementById("user-name").textContent = username;
  document.getElementById("user-role").textContent =
    role.charAt(0).toUpperCase() + role.slice(1);


  document.getElementById("dashboard").scrollIntoView({
    behavior: "smooth"
  });
}

function loadUserInfo() {
  const name = localStorage.getItem("userName") || "Staff";
  const role = localStorage.getItem("userRole") || "Student";

  document.getElementById("user-name").textContent = name;
  document.getElementById("user-role").textContent = role;
}
function changeName() {
  const newName = prompt('Enter new name:');
  if(newName) {
    document.getElementById('user-name').textContent = newName;
  }
}

function calculateGPA() {
  const gradeCards = document.querySelectorAll(".grade-card");
  let total = 0;
  let count = 0;

  gradeCards.forEach(card => {
    const grade = parseFloat(card.getAttribute("data-grade"));
    if (!isNaN(grade)) {
      total += grade;
      count++;
    }
  });

  const gpa = count > 0 ? (total / count).toFixed(2) : "0.00";

  document.getElementById("gpa-value").textContent = gpa;
}

window.onload = function () {
  loadUserInfo();
  calculateGPA && calculateGPA();
  colorGrades && colorGrades();
  applyRoleView && applyRoleView();
};
