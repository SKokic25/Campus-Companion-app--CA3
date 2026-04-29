//Note: Stefan if you are updating inform please as I was also working on the script.js for the ML section also state what changes were made. Thanks 

const SUPABASE_URL = "https://xxouzugyuyojvdvxcqpm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b3V6dWd5dXlvanZkdnhjcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDQzMTAsImV4cCI6MjA5MDgyMDMxMH0.LChhHhQC-lXG_JDJKhnXduAD3rApFrc-gRpzU8UEaEs";


const supabaseLibrary = window.supabase?.createClient;

if (window.__APP_SCRIPT_LOADED__) {
  console.warn("script.js already loaded; skipping re-initialization.");
} else {
  window.__APP_SCRIPT_LOADED__ = true;
  if (!sessionStorage.getItem("visited")) {
    localStorage.removeItem("loggedIn");
    sessionStorage.setItem("visited", "true");
  }
  
  if (typeof window.__APP_SUPABASE__ === "undefined") {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      window.__APP_SUPABASE__ = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
      window.__APP_SUPABASE__ = null;
      console.warn("Supabase UMD not found; timetable features disabled until the CDN is loaded.");
    }
  }
  const supabase = window.__APP_SUPABASE__;
  if (!supabase) {
  console.error("Supabase client not loaded. Check CDN script order in HTML.");
}

  const TABLE_NAME = "timetable";

function loadUserInfo() {
    const loggedIn = localStorage.getItem("loggedIn");
    const name = localStorage.getItem("userName") || "Guest";
    const role = localStorage.getItem("userRole") || "Student";
    const course = localStorage.getItem("userCourse") || "Computer Science";

  
    const userNameElem = document.getElementById("user-name");
    const userRoleElem = document.getElementById("user-role");
    const userCourseElem = document.getElementById("user-course");

    if (userNameElem) userNameElem.textContent = name;
    if (userRoleElem) userRoleElem.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    if (userCourseElem) userCourseElem.textContent = course;

    const loginSection = document.getElementById("login");
    const dashboardSection = document.getElementById("dashboard");


      if (loggedIn === "true" && name !== "Guest") {
        if (loginSection) loginSection.style.display = "none";
        if (dashboardSection) dashboardSection.style.display = "grid"; //
    } else {
        if (loginSection) loginSection.style.display = "block";
        if (dashboardSection) dashboardSection.style.display = "none";
    }
}
function login() {
  console.log("login() called");
  const usernameInput = document.getElementById("username");
  const roleSelect = document.getElementById("role");
  const courseSelect = document.getElementById("courseSelect");

  const username = usernameInput ? usernameInput.value.trim() : "";
  const role = roleSelect ? roleSelect.value : "student";
  const course = courseSelect ? courseSelect.value : "";

  if (!username) {
    alert("Please enter a username");
    return;
  }

  if (!course) {
    alert("Please select a course");
    return;
  }


  localStorage.setItem("userName", username);
  localStorage.setItem("userRole", role);
  localStorage.setItem("userCourse", course);
  localStorage.setItem("loggedIn", "true");

  loadUserInfo();
  const dashboard = document.getElementById("dashboard");
  if (dashboard) dashboard.scrollIntoView({ behavior: "smooth " });
}

    const currentPage = window.location.pathname.split("/").pop();



    function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
}

window.logout = logout;


function togglePassword() {
  const input = document.getElementById("loginPassword");
  
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

  function changeName() {
    const newName = prompt("Enter new name:");
    if (newName && newName.trim()) {
      localStorage.setItem("userName", newName.trim());
      loadUserInfo();
    }
  }

  function calculateGPA(grades) {
  if (!grades || !grades.length) {
    const gpaElem = document.getElementById("gpa-value");
    if (gpaElem) gpaElem.textContent = "0.00";
    return;
  }

  let total = 0;

  grades.forEach(row => {
    if (!isNaN(row.grade)) {
      total += row.grade;
    }
  });

  const gpa = (total / grades.length).toFixed(2);

  const gpaElem = document.getElementById("gpa-value");
  if (gpaElem) gpaElem.textContent = gpa;
}

async function loadGradesPage() {
  const localRole = (localStorage.getItem("userRole") || "").toLowerCase();

  const { data, error } = await supabase
    .from("grades")
    .select("*");

  if (error) {
    console.error("Error loading grades:", error);
    return;
  }

  console.log("GRADES DATA:", data);

  renderGradeCards(data || [], localRole);
  calculateGPA(data || []);
}


function renderGradeCards(grades, role) {
  const container = document.getElementById("gradesContainer");
  if (!container) return;

  container.innerHTML = "";

  const normalizedRole = (role || "").toLowerCase();

  grades.forEach(row => {
    const gradeLetter = convertToLetter(row.grade);

    const studentName = row.student_name || "";
    const courseId = row.course_id || "";

    const card = document.createElement("div");
    card.classList.add("grade-card");
    card.style.borderLeft = `8px solid ${gradeColour(row.grade)}`;

    card.innerHTML = `
      <h3>${courseId}</h3>
     <p><strong>Student:</strong> ${row.student_display_name || studentName}</p>

      <p><strong>Grade:</strong>
        <input 
          type="number" 
          value="${row.grade}" 
          data-student-name="${studentName}"
          data-course-id="${courseId}"
          class="grade-input"
          ${normalizedRole === "student" ? "disabled" : ""}
        >
        (<span class="grade-letter">${gradeLetter}</span>)
      </p>

      <p><strong>Feedback:</strong>
        <input 
          type="text"
          value="${row.feedback || ""}"
          data-student-name="${studentName}"
          data-course-id="${courseId}"
          class="feedback-input"
          ${normalizedRole === "student" ? "disabled" : ""}
        >
      </p>
    `;

    container.appendChild(card);
  });

  const addBtn = document.getElementById("addGradeBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (normalizedRole === "staff") {
    if (addBtn) addBtn.style.display = "block";
    if (saveBtn) saveBtn.style.display = "block";
  } else {
    if (addBtn) addBtn.style.display = "none";
    if (saveBtn) saveBtn.style.display = "none";
  }
}

function convertToLetter(grade) {
  if (grade >= 90) return "A";
  if (grade >= 85) return "A-";
  if (grade >= 80) return "B+";
  if (grade >= 75) return "B";
  if (grade >= 70) return "B-";
  if (grade >= 65) return "C+";
  if (grade >= 60) return "C";
  return "D";
}

function gradeColour(grade) {
  if (grade >= 85) return "#4CAF50";   
  if (grade >= 70) return "#FFC107";   
  return "#F44336";                 
}

// GPA
function calculateGPA(grades) {
  if (!grades.length) return;

  let total = 0;
  grades.forEach(row => total += row.grade / 25);

  document.getElementById("gpa-value").textContent =
    (total / grades.length).toFixed(2);
}

async function addGrade() {
  const student = prompt("Student name:");
  const course = prompt("Course name:");
  const grade = prompt("Grade (0–100):");

  if (!student || !course || !grade) return;

  const { data, error } = await supabase
    .from("grades")
    .insert({
      student_name: student,
      course_id: course,
      grade: parseInt(grade),
      feedback: ""
    })
    .select(); // ✅ THIS LINE FIXES IT

  if (error) {
    console.error(error);
    alert("Error adding grade ❌");
    return;
  }

  alert("Grade added ✅");
  loadGradesPage();
}

async function saveGrades() {
  const role = (localStorage.getItem("userRole") || "").toLowerCase();

  if (role !== "staff") {
    alert("Students cannot edit ❌");
    return;
  }

  const gradeInputs = document.querySelectorAll(".grade-input");
  const feedbackInputs = document.querySelectorAll(".feedback-input");

  for (let i = 0; i < gradeInputs.length; i++) {
    const studentName = (gradeInputs[i].dataset.studentName || "").trim();
    const courseId = (gradeInputs[i].dataset.courseId || "").trim();
    const gradeValue = parseInt(gradeInputs[i].value, 10);
    const feedbackValue = feedbackInputs[i].value;

    if (!studentName || !courseId) {
      alert("Save failed: missing row data");
      console.error("Missing row data", { studentName, courseId });
      return;
    }

    const { data, error } = await supabase
      .from("grades")
      .update({
        grade: gradeValue,
        feedback: feedbackValue
      })
      .eq("student_name", studentName)
      .eq("course_id", courseId)
      .select();

    console.log("Updated result:", data);
    console.log("Update error:", error);

    if (error) {
      alert("Error saving: " + error.message);
      console.error(error);
      return;
    }

    if (!data || data.length === 0) {
      alert(`Save failed for ${studentName} / ${courseId}`);
      return;
    }

    const card = gradeInputs[i].closest(".grade-card");
    if (card) {
      card.style.borderLeft = `8px solid ${gradeColour(gradeValue)}`;
      const letterSpan = card.querySelector(".grade-letter");
      if (letterSpan) letterSpan.textContent = convertToLetter(gradeValue);
    }
  }

  alert("Changes saved ✅");
  await loadGradesPage();
}

async function getCurrentGrades() {
  const { data } = await supabase.from("grades").select("*");
  return data || [];
}

  
async function searchBooks() {
    const query = document.getElementById("bookSearch").value;
    const resultsList = document.getElementById("bookResults");

    resultsList.innerHTML = "Searching...";

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .ilike("title", `%${query}%`);

    resultsList.innerHTML = "";

    if (data) {
        data.forEach(book => {
            const li = document.createElement("li");
            li.textContent = `${book.title} - ${book.is_available ? "✅ Available" : "❌ Out on Loan"}`;
            resultsList.appendChild(li);
        });
    }
}

async function loadLoans() {
    const loanList = document.getElementById("loanList");

    const { data, error } = await supabase
        .from("loans")
        .select("id, due_date, book_title");

    loanList.innerHTML = "";

    if (error) {
        loanList.innerHTML = "<li>Error loading loans</li>";
        console.error(error);
        return;
    }

    if (!data || data.length === 0) {
        loanList.innerHTML = "<li>No loans found</li>";
        return;
    }

    data.forEach(loan => {
        const li = document.createElement("li");
        li.textContent = `📚 ${loan.book_title} | Due: ${loan.due_date}`;
        loanList.appendChild(li);
    });
}

async function loadReservations() {
    const reservationList = document.getElementById("reservationList");

    const { data, error } = await supabase
        .from("reservations")
        .select("id, reservation_date, reservation_time")
        .order("reservation_date", { ascending: true });

    reservationList.innerHTML = "";

    if (error) {
        reservationList.innerHTML = "<li>Error loading reservations</li>";
        console.error(error);
        return;
    }

    if (!data || data.length === 0) {
        reservationList.innerHTML = "<li>No reservations yet</li>";
        return;
    }

    data.forEach(res => {
        const li = document.createElement("li");

        li.textContent = `📅 ${res.reservation_date} at ⏰ ${res.reservation_time} `;

        const btn = document.createElement("button");
        btn.textContent = "Cancel";
        btn.style.marginLeft = "10px";

        btn.onclick = () => deleteReservation(res.id);

        li.appendChild(btn);
        reservationList.appendChild(li);
    });
}

async function deleteReservation(id) {
    const confirmDelete = confirm("Are you sure you want to cancel this reservation?");
    if (!confirmDelete) return;

    const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", id);

    if (error) {
        alert("Error deleting reservation: " + error.message);
        console.error(error);
    } else {
        alert("Reservation cancelled ✅");

        loadReservations();
    }
}

async function reserveRoom() {
    const date = document.getElementById("roomDate").value;
    const time = document.getElementById("roomTime").value;
    const status = document.getElementById("reservationStatus");
    const reservationList = document.getElementById("reservationList");

    if (!date || !time) {
        status.textContent = "Please select both date and time.";
        return;
    }

    const { data, error } = await supabase
        .from("reservations")
        .insert([{ reservation_date: date, reservation_time: time }])
        .select();

    if (error) {
        status.textContent = "Error: " + error.message;
    } else {
        status.textContent = "Reservation successful! 🎉";

        const li = document.createElement("li");
        li.textContent = `📅 ${date} at ⏰ ${time}`;
        reservationList.appendChild(li);


        
    }
}




async function loadTable() {
    const tableBody = document.getElementById("timetableBody");

    if (!tableBody) return;

    const { data, error } = await supabase
        .from("timetable")
        .select("*")
        .order("day", { ascending: true });

    if (error) {
        tableBody.innerHTML = "<tr><td colspan='5'>Error loading data</td></tr>";
        console.error(error);
        return;
    }

    
    if (!data || data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No timetable data found</td></tr>";
        return;
    }

    tableBody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.day}</td>
            <td>${row.time_slot}</td>
            <td>${row.subject}</td>
            <td>${row.teacher}</td>
            <td>${row.room}</td>
        `;

        tableBody.appendChild(tr);
    });
}


async function signupStudent() {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const course = document.getElementById("signupCourse").value.trim();

  if (!email || !password || !course) {
    alert("Please fill in all fields");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "student",
        course: course
      }
    }
  });

  if (error) {
    alert("Signup failed: " + error.message);
    return;
  }

  alert("Signup successful! Please check your email to confirm your account.");
}



async function loginStudent() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const roleSelect = document.getElementById("role").value;
  const courseSelect = document.getElementById("courseSelect").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  const user = data.user;

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userName", user.email);
  localStorage.setItem("userRole", user.app_metadata.role || roleSelect);
  localStorage.setItem("userCourse", user.user_metadata.course || courseSelect);

  alert("Login successful!");
  window.location.href = "index.html";
}

function appInit() {
  loadUserInfo();

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  console.log("Current page:", currentPage);

  if (currentPage.includes("grades")) {
    console.log("Loading grades page...");
    loadGradesPage();
  }

  if (currentPage.includes("timetable")) {
    console.log("Loading timetable page...");
    loadTable();
  }

  if (document.getElementById("loanList")) {
    loadLoans();
  }

  if (document.getElementById("reservationList")) {
    loadReservations();
  }
}

document.addEventListener("DOMContentLoaded", appInit);


window.login = login;
window.logout = logout;
window.changeName = changeName;
window.signupStudent = signupStudent;
window.loginStudent = loginStudent;
window.calculateGPA = calculateGPA;
window.searchBooks = searchBooks;
window.loadLoans = loadLoans;
window.saveGrades = saveGrades;
window.addGrade = addGrade;
window.reserveRoom = reserveRoom; }
