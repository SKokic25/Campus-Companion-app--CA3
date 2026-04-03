
const SUPABASE_URL = "https://dtgvwyumlcyuvdakoigp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Z3Z3eXVtbGN5dXZkYWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjM5MTgsImV4cCI6MjA4OTkzOTkxOH0.L84fSP7uRs-02N5xeaanpyOwFt7Ob1mLV_eJ8r75j64";

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
    if (dashboardSection) dashboardSection.style.display = "grid";
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

    loadUserInfo();
    const dashboard = document.getElementById("dashboard");
    if (dashboard) dashboard.scrollIntoView({ behavior: "smooth" });
  }

  function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedIn");
    loadUserInfo();
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

  
