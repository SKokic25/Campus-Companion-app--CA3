
const SUPABASE_URL = "https://xxouzugyuyojvdvxcqpm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b3V6dWd5dXlvanZkdnhjcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDQzMTAsImV4cCI6MjA5MDgyMDMxMH0.LChhHhQC-lXG_JDJKhnXduAD3rApFrc-gRpzU8UEaEs";


const supabaseLibrary = window.supabase.createClient

if (window.__APP_SCRIPT_LOADED__) {
  console.warn("script.js already loaded; skipping re-initialization.");
} else {
  window.__APP_SCRIPT_LOADED__ = true;

  if (typeof window.__APP_SUPABASE__ === "undefined") {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      window.__APP_SUPABASE__ = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
      window.__APP_SUPABASE__ = null;
      console.warn("Supabase UMD not found; timetable features disabled until the CDN is loaded.");
    }
  }
  const supabase = window.__APP_SUPABASE__;
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


    if (loggedIn === "true") {
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


function logout() {

  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "index.html";
}
  function changeName() {
    const newName = prompt("Enter new name:");
    if (newName && newName.trim()) {
      localStorage.setItem("userName", newName.trim());
      loadUserInfo();
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
    const gpaElem = document.getElementById("gpa-value");
    if (gpaElem) gpaElem.textContent = gpa;
  }

  function appInit() {
    loadUserInfo();
    if (typeof calculateGPA === "function") calculateGPA();
    if (typeof loadTable === "function") loadTable();
  }

  window.login = login;
  window.logout = logout;
  window.changeName = changeName;

  document.addEventListener("DOMContentLoaded", appInit);

  window.addEventListener("pageshow", (event) => {
    loadUserInfo();
    if (typeof calculateGPA === "function") calculateGPA();
    if (typeof loadTable === "function") loadTable();
  });

  
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

function appInit() {
    loadUserInfo();
    calculateGPA();
    loadLoans();
    loadReservations(); 
    loadTable();
}

document.addEventListener("DOMContentLoaded", appInit);


window.login = login;
window.logout = logout;
window.changeName = changeName;

window.searchBooks = searchBooks;
window.loadLoans = loadLoans;
window.reserveRoom = reserveRoom;}
