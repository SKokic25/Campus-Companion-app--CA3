
const SUPABASE_URL = "https://xxouzugyuyojvdvxcqpm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b3V6dWd5dXlvanZkdnhjcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDQzMTAsImV4cCI6MjA5MDgyMDMxMH0.LChhHhQC-lXG_JDJKhnXduAD3rApFrc-gRpzU8UEaEs";


const supabaseLibrary = window.supabase?.createClient;

if (window.__APP_SCRIPT_LOADED__) {
  console.warn("script.js already loaded; skipping re-initialization.");
} else {
  window.__APP_SCRIPT_LOADED__ = true;

  if (typeof window.__APP_SUPABASE__ === "undefined") {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      window.__APP_SUPABASE__ = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
      window.__APP_SUPABASE__ = null;
      console.warn("Supabase not loaded. Check your CDN script.");
    }
  }

  const supabase = window.__APP_SUPABASE__;
  const translations = {
  en: {
    welcomeBack: "Welcome back",
    enterDetails: "Please enter your details",
    login: "Log In",
    signup: "Sign Up",
    createAccount: "Create Account",
    createStudentAccount: "Create your student account",
    forgotPassword: "Forgot password?",
    studentEmail: "Student email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    selectCourse: "Select Course",
    student: "Student",
    staff: "Staff",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    home: "Home",
    timetable: "Timetable",
    grades: "Grades",
    events: "Events",
    canteenMenu: "Canteen Menu",
    libraryServices: "Library Services",
    logout: "Logout",
    personalInfo: "Personal Info",
    name: "Name",
    course: "Course",
    userType: "User Type",
    changeName: "Change Name",
    viewWeeklyClasses: "View your weekly classes",
    viewTimetable: "View Timetable",
    checkProgress: "Check your progress and feedback",
    viewGrades: "View Grades",
    upcomingEvents: "Upcoming campus events and news",
    viewEvents: "View Events",
    checkLibraryServices: "Check library services",
    viewTodaysDeals: "View today’s deals",
    menu: "Menu ▾",
    lunchMenu: "Lunch Menu",
    mainCourse: "Main Course",
    vegetarianOption: "Vegetarian Option",
    dessert: "Dessert",
    sides: "Sides",
    drinks: "Drinks",
    loading: "Loading…",
    menu: "Menu ▾",
    checkBooks: "Check Book Availability",
    enterBook: "Enter book title...",
    search: "Search",
    borrowedBooks: "Your Borrowed Books",
    loadLoans: "Load My Loans",
    reserveRoom: "Reserve Study Room",
    date: "Date:",
    time: "Time:",
    reserve: "Reserve",
    yourReservations: "Your Reservations",
    studentTimetable: "Student Timetable",
    day: "Day",
    time: "Time",
    subject: "Subject",
    teacher: "Teacher",
    room: "Room",
    loadingData: "Loading data...",
    overallGPA: "Overall GPA",
    saveChanges: "Save Changes",
    addGrade: "Add Grade",
    eventsTitle: "Events",
    upcomingEvents: "Upcoming Events",
    eventName: "Event name",
    eventDate: "Event date",
    selectCategory: "Select category",
    academic: "Academic",
    sports: "Sports",
    social: "Social",
    addEvent: "Add Event",
    addReminder: "Add Reminder",
    reminderSet: "Reminder Set ✅",
    remove: "Remove",
    recommendations: "Recommendations ⭐️",
    showRecommendations: "Show Recommendations",
    chooseType: "Choose type",
    recommendedForYou: "Recommended for you",
    noRecommendations: "No recommendations yet.",
    addToEvents: "Add to Events",
    deleteSuggestion: "Delete suggestion",
    fillAllFields: "Fill all fields",
    chooseCategory: "Choose a category",
    ContactUs: "Contact Us",
    helpResourcesTitle: "Help & Resources",
    helpResourcesSubtitle: "Every contact you might need as a student, all in one place. Tap any link to visit the resource directly.",
    campusCompanion: "Campus Companion",

    emergencyText: "In an emergency, always call 999 or 112 first.",
    campusEmergencyLine: "Campus Emergency Line",

    mentalHealth: "Mental Health & Wellbeing",
    academicSupport: "Academic Support",
    financialSupport: "Practical & Financial",

    studentCounselling: "Student Counselling",
    studentCounsellingDesc: "Confidential one-to-one sessions with qualified counsellors.",
    bookAppointment: "Book an Appointment",
    openingHours: "Opening Hours & Location",

    cantFind: "Can't find what you're looking for?",
    contactSupport: "Contact the Campus Companion support team"


  },

  sr: {
    welcomeBack: "Dobrodošli nazad",
    enterDetails: "Unesite svoje podatke",
    login: "Prijavi se",
    signup: "Registruj se",
    createAccount: "Kreiraj nalog",
    createStudentAccount: "Kreiraj studentski nalog",
    forgotPassword: "Zaboravili ste lozinku?",
    studentEmail: "Studentski email",
    password: "Lozinka",
    firstName: "Ime",
    lastName: "Prezime",
    email: "Email",
    selectCourse: "Izaberite kurs",
    student: "Student",
    staff: "Osoblje",
    dontHaveAccount: "Nemate nalog?",
    alreadyHaveAccount: "Već imate nalog?",
    home: "Početna",
    timetable: "Raspored",
    grades: "Ocene",
    events: "Događaji",
    canteenMenu: "Meni kantine",
    libraryServices: "Biblioteka",
    logout: "Odjava",
    menu: "Meni ▾",
    lunchMenu: "Meni za ručak",
    mainCourse: "Glavno jelo",
    vegetarianOption: "Vegetarijanska opcija",
    dessert: "Dezert",
    sides: "Prilozi", 
    drinks: "Pića",
    loading: "Učitavanje…",
    menu: "Meni ▾",
    checkBooks: "Provera dostupnosti knjiga",
    enterBook: "Unesite naziv knjige...",
    search: "Pretraži",
    borrowedBooks: "Vaše pozajmljene knjige",
    loadLoans: "Učitaj moje pozajmice",
    reserveRoom: "Rezerviši učionicu",
    date: "Datum:",
    time: "Vreme:",
    reserve: "Rezerviši",
    yourReservations: "Vaše rezervacije",
    studentTimetable: "Studentski raspored",
    day: "Dan",
    time: "Vreme",
    subject: "Predmet",
    teacher: "Profesor",
    room: "Učionica",
    loadingData: "Učitavanje podataka...",
    personalInfo: "Lični podaci",
    name: "Ime",
    course: "Kurs",
    userType: "Tip korisnika",
    changeName: "Promeni ime",
    viewWeeklyClasses: "Pogledajte svoje nedeljne časove",
    viewTimetable: "Pogledaj raspored",
    checkProgress: "Proverite svoj napredak i povratne informacije",
    viewGrades: "Pogledaj ocene",
    upcomingEvents: "Predstojeći događaji i vesti sa kampusa",
    viewEvents: "Pogledaj događaje",
    checkLibraryServices: "Proverite bibliotečke usluge",
    viewTodaysDeals: "Pogledajte današnje ponude",
    overallGPA: "Ukupni prosek",
    saveChanges: "Sačuvaj promene",
    addGrade: "Dodaj ocenu",
    eventsTitle: "Događaji",
    upcomingEvents: "Predstojeći događaji",
    eventName: "Naziv događaja",
    eventDate: "Datum događaja",
    selectCategory: "Izaberite kategoriju",
    academic: "Akademski",
    sports: "Sportski",
    social: "Društveni",
    addEvent: "Dodaj događaj",
    addReminder: "Dodaj podsetnik",
    reminderSet: "Podsetnik postavljen ✅",
    remove: "Ukloni",
    recommendations: "Preporuke ⭐️",
    showRecommendations: "Prikaži preporuke",
    chooseType: "Izaberi tip",
    recommendedForYou: "Preporučeno za vas",
    noRecommendations: "Još nema preporuka.",
    addToEvents: "Dodaj u događaje",
    deleteSuggestion: "Obriši predlog",
    fillAllFields: "Popunite sva polja",
    chooseCategory: "Izaberite kategoriju",
    ContactUs: "Kontakt",
    helpResourcesTitle: "Pomoć i resursi",
    helpResourcesSubtitle: "Sve što vam treba kao student na jednom mjestu.",
    campusCompanion: "Studentska aplikacija",

    emergencyText: "U hitnom slučaju pozovite 999 ili 112.",
    campusEmergencyLine: "Hitna linija kampusa",

    mentalHealth: "Mentalno zdravlje",
    academicSupport: "Akademska podrška",
    financialSupport: "Finansijska podrška",

    studentCounselling: "Studentsko savjetovanje",
    studentCounsellingDesc: "Povjerljivi razgovori sa savjetnicima.",
    bookAppointment: "Zakaži termin",
    openingHours: "Radno vrijeme i lokacija",

    cantFind: "Ne možete pronaći ono što tražite?",
    contactSupport: "Kontaktirajte podršku"
  },

  es: {
    welcomeBack: "Bienvenido de nuevo",
    enterDetails: "Introduce tus datos",
    login: "Iniciar sesión",
    signup: "Registrarse",
    createAccount: "Crear cuenta",
    createStudentAccount: "Crea tu cuenta de estudiante",
    forgotPassword: "¿Olvidaste tu contraseña?",
    studentEmail: "Correo de estudiante",
    password: "Contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    selectCourse: "Seleccionar curso",
    student: "Estudiante",
    staff: "Personal",
    dontHaveAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    home: "Inicio",
    timetable: "Horario",
    grades: "Calificaciones",
    events: "Eventos",
    canteenMenu: "Menú de cafetería",
    libraryServices: "Biblioteca",
    logout: "Cerrar sesión",
    menu: "Menú ▾",
    lunchMenu: "Menú de almuerzo",
    mainCourse: "Plato principal",
    vegetarianOption: "Opción vegetariana",
    dessert: "Postre",
    sides: "Acompañamientos",
    drinks: "Bebidas",
    loading: "Cargando…",
    menu: "Menú ▾",
    checkBooks: "Buscar disponibilidad de libros",
    enterBook: "Introduce el título...",
    search: "Buscar",
    borrowedBooks: "Tus libros prestados",
    loadLoans: "Cargar préstamos",
    reserveRoom: "Reservar sala de estudio",
    date: "Fecha:",
    time: "Hora:",
    reserve: "Reservar",
    yourReservations: "Tus reservas",
    studentTimetable: "Horario del estudiante",
    day: "Día",
    time: "Hora",
    subject: "Asignatura",
    teacher: "Profesor",
    room: "Aula",
    loadingData: "Cargando datos...",
    personalInfo: "Información personal",
    name: "Nombre",
    course: "Curso",
    userType: "Tipo de usuario",
    changeName: "Cambiar nombre",
    viewWeeklyClasses: "Consulta tus clases semanales",
    viewTimetable: "Ver horario",
    checkProgress: "Consulta tu progreso y comentarios",
    viewGrades: "Ver calificaciones",
    upcomingEvents: "Próximos eventos y noticias del campus",
    viewEvents: "Ver eventos",
    checkLibraryServices: "Consulta los servicios de biblioteca",
    viewTodaysDeals: "Ver ofertas de hoy",
    overallGPA: "Promedio general",
    saveChanges: "Guardar cambios",
    addGrade: "Agregar nota",
    eventsTitle: "Događaji",
    upcomingEvents: "Predstojeći događaji",
    eventName: "Naziv događaja",
    eventDate: "Datum događaja",
    selectCategory: "Izaberite kategoriju",
    academic: "Akademski",
    sports: "Sportski",
    social: "Društveni",
    addEvent: "Dodaj događaj",
    addReminder: "Dodaj podsetnik",
    reminderSet: "Podsetnik postavljen ✅",
    remove: "Ukloni",
    recommendations: "Preporuke ⭐️",
    showRecommendations: "Prikaži preporuke",
    chooseType: "Izaberi tip",
    recommendedForYou: "Preporučeno za vas",
    noRecommendations: "Još nema preporuka.",
    addToEvents: "Dodaj u događaje",
    deleteSuggestion: "Obriši predlog",
    fillAllFields: "Popunite sva polja",
    chooseCategory: "Izaberite kategoriju",
    ContactUs: "Contáctanos",
    helpResourcesTitle: "Ayuda y recursos",
    helpResourcesSubtitle: "Todo lo que necesitas como estudiante en un solo lugar.",
    campusCompanion: "Aplicación estudiantil",

    emergencyText: "En caso de emergencia, llama al 999 o 112.",
    campusEmergencyLine: "Línea de emergencia del campus",

    mentalHealth: "Salud mental",
    academicSupport: "Apoyo académico",
    financialSupport: "Apoyo financiero",

    studentCounselling: "Asesoramiento estudiantil",
    studentCounsellingDesc: "Sesiones confidenciales con consejeros.",
    bookAppointment: "Reservar cita",
    openingHours: "Horario y ubicación",

    cantFind: "¿No encuentras lo que buscas?",
    contactSupport: "Contactar soporte"
  },

  pl: {
    welcomeBack: "Witamy ponownie",
    enterDetails: "Wprowadź swoje dane",
    login: "Zaloguj się",
    signup: "Zarejestruj się",
    createAccount: "Utwórz konto",
    createStudentAccount: "Utwórz konto studenckie",
    forgotPassword: "Nie pamiętasz hasła?",
    studentEmail: "Email studenta",
    password: "Hasło",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    selectCourse: "Wybierz kurs",
    student: "Student",
    staff: "Pracownik",
    dontHaveAccount: "Nie masz konta?",
    alreadyHaveAccount: "Masz już konto?",
    home: "Strona główna",
    timetable: "Plan zajęć",
    grades: "Oceny",
    events: "Wydarzenia",
    canteenMenu: "Menu stołówki",
    libraryServices: "Biblioteka",
    logout: "Wyloguj",
    menu: "Menu ▾",
    lunchMenu: "Menu obiadowe",
    mainCourse: "Danie główne",
    vegetarianOption: "Opcja wegetariańska",
    dessert: "Deser",
    sides: "Dodatki",
    drinks: "Napoje",
    loading: "Ładowanie…",
    menu: "Menu ▾",
    checkBooks: "Sprawdź dostępność książek",
    enterBook: "Wpisz tytuł książki...",
    search: "Szukaj",
    borrowedBooks: "Twoje wypożyczone książki",
    loadLoans: "Załaduj wypożyczenia",
    reserveRoom: "Zarezerwuj salę",
    date: "Data:",
    time: "Godzina:",
    reserve: "Zarezerwuj",
    yourReservations: "Twoje rezerwacje",
    studentTimetable: "Plan zajęć studenta",
    day: "Dzień",
    time: "Godzina",
    subject: "Przedmiot",
    teacher: "Nauczyciel",
    room: "Sala",
    loadingData: "Ładowanie danych...",
    personalInfo: "Dane osobowe",
    name: "Imię",
    course: "Kurs",
    userType: "Typ użytkownika",
    changeName: "Zmień imię",
    viewWeeklyClasses: "Zobacz swoje tygodniowe zajęcia",
    viewTimetable: "Zobacz plan zajęć",
    checkProgress: "Sprawdź swoje postępy i opinie",
    viewGrades: "Zobacz oceny",
    upcomingEvents: "Nadchodzące wydarzenia i wiadomości z kampusu",
    viewEvents: "Zobacz wydarzenia",
    checkLibraryServices: "Sprawdź usługi biblioteczne",
    viewTodaysDeals: "Zobacz dzisiejsze oferty",  
    personalInfo: "Dane osobowe",
    name: "Imię",
    course: "Kurs",
    userType: "Typ użytkownika",
    changeName: "Zmień imię",
    viewWeeklyClasses: "Zobacz swoje tygodniowe zajęcia",
    viewTimetable: "Zobacz plan zajęć",
    checkProgress: "Sprawdź swoje postępy i opinie",
    viewGrades: "Zobacz oceny",
    upcomingEvents: "Nadchodzące wydarzenia i wiadomości z kampusu",
    viewEvents: "Zobacz wydarzenia",
    checkLibraryServices: "Sprawdź usługi biblioteczne",
    viewTodaysDeals: "Zobacz dzisiejsze oferty",
    overallGPA: "Średnia ocen",
    saveChanges: "Zapisz zmiany",
    addGrade: "Dodaj ocenę",
    eventsTitle: "Wydarzenia",
    upcomingEvents: "Nadchodzące wydarzenia",
    eventName: "Nazwa wydarzenia",
    eventDate: "Data wydarzenia",
    selectCategory: "Wybierz kategorię",
    academic: "Akademickie",
    sports: "Sportowe",
    social: "Społeczne",
    addEvent: "Dodaj wydarzenie",
    addReminder: "Dodaj przypomnienie",
    reminderSet: "Przypomnienie ustawione ✅",
    remove: "Usuń",
    recommendations: "Rekomendacje ⭐️",
    showRecommendations: "Pokaż rekomendacje",
    chooseType: "Wybierz typ",
    recommendedForYou: "Polecane dla Ciebie",
    noRecommendations: "Brak rekomendacji.",
    addToEvents: "Dodaj do wydarzeń",
    deleteSuggestion: "Usuń sugestię",
    fillAllFields: "Wypełnij wszystkie pola",
    chooseCategory: "Wybierz kategorię",
    ContactUs: "Kontakt",
    helpResourcesTitle: "Pomoc i zasoby",
    helpResourcesSubtitle: "Wszystko, czego potrzebujesz jako student.",
    campusCompanion: "Aplikacja studencka",

    emergencyText: "W nagłych wypadkach zadzwoń 999 lub 112.",
    campusEmergencyLine: "Linia alarmowa kampusu",

    mentalHealth: "Zdrowie psychiczne",
    academicSupport: "Wsparcie akademickie",
    financialSupport: "Wsparcie finansowe",

    studentCounselling: "Doradztwo studenckie",
    studentCounsellingDesc: "Poufne spotkania z doradcami.",
    bookAppointment: "Umów wizytę",
    openingHours: "Godziny i lokalizacja",

    cantFind: "Nie możesz znaleźć tego, czego szukasz?",
    contactSupport: "Skontaktuj się z pomocą"
  },

  hr: {
    welcomeBack: "Dobrodošli natrag",
    enterDetails: "Unesite svoje podatke",
    login: "Prijava",
    signup: "Registracija",
    createAccount: "Izradi račun",
    createStudentAccount: "Izradi studentski račun",
    forgotPassword: "Zaboravili ste lozinku?",
    studentEmail: "Studentski email",
    password: "Lozinka",
    firstName: "Ime",
    lastName: "Prezime",
    email: "Email",
    selectCourse: "Odaberite kolegij",
    student: "Student",
    staff: "Osoblje",
    dontHaveAccount: "Nemate račun?",
    alreadyHaveAccount: "Već imate račun?",
    home: "Početna",
    timetable: "Raspored",
    grades: "Ocjene",
    events: "Događaji",
    canteenMenu: "Meni kantine",
    libraryServices: "Knjižnica",
    logout: "Odjava",
    menu: "Izbornik ▾",
    lunchMenu: "Meni za ručak",
    mainCourse: "Glavno jelo",
    vegetarianOption: "Vegetarijanska opcija",
    dessert: "Desert",
    sides: "Prilozi",
    drinks: "Pića",
    loading: "Učitavanje…",
    menu: "Izbornik ▾",
    checkBooks: "Provjeri dostupnost knjiga",
    enterBook: "Unesite naslov knjige...",
    search: "Pretraži",
    borrowedBooks: "Vaše posuđene knjige",
    loadLoans: "Učitaj posudbe",
    reserveRoom: "Rezerviraj sobu",
    date: "Datum:",
    time: "Vrijeme:",
    reserve: "Rezerviraj",
    yourReservations: "Vaše rezervacije",
    studentTimetable: "Studentski raspored",
    day: "Dan",
    time: "Vrijeme",
    subject: "Predmet",
    teacher: "Profesor",
    room: "Učionica",
    loadingData: "Učitavanje podataka...",
    personalInfo: "Osobni podaci",
    name: "Ime",
    course: "Kolegij",
    userType: "Vrsta korisnika",
    changeName: "Promijeni ime",
    viewWeeklyClasses: "Pogledajte svoje tjedne sate",
    viewTimetable: "Pogledaj raspored",
    checkProgress: "Provjeri svoj napredak i povratne informacije",
    viewGrades: "Pogledaj ocjene",
    upcomingEvents: "Nadolazeći događaji i vijesti s kampusa",
    viewEvents: "Pogledaj događaje",
    checkLibraryServices: "Provjeri knjižnične usluge",
    viewTodaysDeals: "Pogledaj današnje ponude",
    overallGPA: "Ukupni prosjek",
    saveChanges: "Spremi promjene",
    addGrade: "Dodaj ocjenu",
    eventsTitle: "Događaji",
    upcomingEvents: "Nadolazeći događaji",
    eventName: "Naziv događaja",
    eventDate: "Datum događaja",
    selectCategory: "Odaberite kategoriju",
    academic: "Akademski",
    sports: "Sportski",
    social: "Društveni",
    addEvent: "Dodaj događaj",
    addReminder: "Dodaj podsjetnik",
    reminderSet: "Podsjetnik postavljen ✅",
    remove: "Ukloni",
    recommendations: "Preporuke ⭐️",
    showRecommendations: "Prikaži preporuke",
    chooseType: "Odaberite tip",
    recommendedForYou: "Preporučeno za vas",
    noRecommendations: "Još nema preporuka.",
    addToEvents: "Dodaj u događaje",
    deleteSuggestion: "Obriši prijedlog",
    fillAllFields: "Ispunite sva polja",
    chooseCategory: "Odaberite kategoriju",
    ContactUs: "Kontakt",
    helpResourcesTitle: "Pomoć i resursi",
    helpResourcesSubtitle: "Sve što trebate kao student na jednom mjestu.",
    campusCompanion: "Studentska aplikacija",

    emergencyText: "U hitnom slučaju nazovite 999 ili 112.",
    campusEmergencyLine: "Hitna linija kampusa",

    mentalHealth: "Mentalno zdravlje",
    academicSupport: "Akademska podrška",
    financialSupport: "Financijska podrška",

    studentCounselling: "Studentsko savjetovanje",
    studentCounsellingDesc: "Povjerljivi razgovori sa savjetnicima.",
    bookAppointment: "Rezerviraj termin",
    openingHours: "Radno vrijeme i lokacija",

    cantFind: "Ne možete pronaći što tražite?",
    contactSupport: "Kontaktirajte podršku"
  }
};

function changeLanguage(language) {
  localStorage.setItem("siteLanguage", language);
  applyLanguage();
}

function applyLanguage() {
  const language = localStorage.getItem("siteLanguage") || "en";
  const selectedTranslations = translations[language] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (selectedTranslations[key]) {
      element.textContent = selectedTranslations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");

    if (selectedTranslations[key]) {
      element.placeholder = selectedTranslations[key];
    }
  });

  document.querySelectorAll("option[data-i18n]").forEach(option => {
    const key = option.getAttribute("data-i18n");

    if (selectedTranslations[key]) {
      option.textContent = selectedTranslations[key];
    }
  });

  const languageSelect = document.getElementById("languageSelect");

  if (languageSelect) {
    languageSelect.value = language;
  }
}function applyLanguage() {
  const language = localStorage.getItem("siteLanguage") || "en";
  const selectedTranslations = translations[language] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (selectedTranslations[key]) {
      element.textContent = selectedTranslations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");

    if (selectedTranslations[key]) {
      element.placeholder = selectedTranslations[key];
    }
  });

  document.querySelectorAll("option[data-i18n]").forEach(option => {
    const key = option.getAttribute("data-i18n");

    if (selectedTranslations[key]) {
      option.textContent = selectedTranslations[key];
    }
  });

  const languageSelect = document.getElementById("languageSelect");

  if (languageSelect) {
    languageSelect.value = language;
  }
}

  function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) loginForm.classList.toggle("hidden");
    if (signupForm) signupForm.classList.toggle("hidden");
  }

  function togglePassword() {
    const input = document.getElementById("loginPassword");

    if (!input) return;

    input.type = input.type === "password" ? "text" : "password";
  }

async function loadUserInfo() {
  const loginSection = document.querySelector(".auth-page");
  const dashboardSection = document.getElementById("dashboard");

  const { data } = await supabase.auth.getSession();
  const session = data?.session;

  if (!session) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userCourse");

    if (loginSection) loginSection.style.display = "flex";
    if (dashboardSection) dashboardSection.style.display = "none";
    return;
  }

  const user = session.user;

  const name = localStorage.getItem("userName") || user.email || "Guest";
  const role = localStorage.getItem("userRole") || user.user_metadata?.role || "Student";
  const course = localStorage.getItem("userCourse") || user.user_metadata?.course || "Computer Science";

  const userNameElem = document.getElementById("user-name");
  const userRoleElem = document.getElementById("user-role");
  const userCourseElem = document.getElementById("user-course");

  if (userNameElem) userNameElem.textContent = name;
  if (userRoleElem) userRoleElem.textContent = role.charAt(0).toUpperCase() + role.slice(1);
  if (userCourseElem) userCourseElem.textContent = course;

  if (loginSection) loginSection.style.display = "none";
  if (dashboardSection) dashboardSection.style.display = "grid";
}

  async function signupStudent() {
    const email = document.getElementById("signupEmail")?.value.trim();
    const password = document.getElementById("signupPassword")?.value.trim();
    const course = document.getElementById("signupCourse")?.value.trim();

    if (!email || !password || !course) {
      alert("Please fill in all fields");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
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

    alert("Signup successful! Please check your email, then log in.");
    toggleForms();
  }

  async function loginStudent() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();
    const role = document.getElementById("role")?.value || "student";
    const course = document.getElementById("courseSelect")?.value || "";

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (!course) {
      alert("Please select your course");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    const user = data.user;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", user.email);
    localStorage.setItem("userRole", user.user_metadata.role || role);
    localStorage.setItem("userCourse", user.user_metadata.course || course);

    alert("Login successful!");

    loadUserInfo();

    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function forgotPassword() {
  const email = document.getElementById("loginEmail")?.value.trim();

  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset-password.html"
  });

  if (error) {
    alert("Password reset failed: " + error.message);
    return;
  }

  alert("Password reset email sent. Please check your inbox.");
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

  function calculateGPA(grades) {
    const gpaElem = document.getElementById("gpa-value");
    if (!gpaElem) return;

    if (!grades || !grades.length) {
      gpaElem.textContent = "0.00";
      return;
    }

    let total = 0;

    grades.forEach(row => {
      total += row.grade / 25;
    });

    gpaElem.textContent = (total / grades.length).toFixed(2);
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

  async function addGrade() {
    const student = prompt("Student name:");
    const course = prompt("Course name:");
    const grade = prompt("Grade 0–100:");

    if (!student || !course || !grade) return;

    const { error } = await supabase
      .from("grades")
      .insert({
        student_name: student,
        course_id: course,
        grade: parseInt(grade),
        feedback: ""
      });

    if (error) {
      console.error(error);
      alert("Error adding grade");
      return;
    }

    alert("Grade added");
    loadGradesPage();
  }

  async function saveGrades() {
    const role = (localStorage.getItem("userRole") || "").toLowerCase();

    if (role !== "staff") {
      alert("Students cannot edit");
      return;
    }

    const gradeInputs = document.querySelectorAll(".grade-input");
    const feedbackInputs = document.querySelectorAll(".feedback-input");

    for (let i = 0; i < gradeInputs.length; i++) {
      const studentName = gradeInputs[i].dataset.studentName;
      const courseId = gradeInputs[i].dataset.courseId;
      const gradeValue = parseInt(gradeInputs[i].value, 10);
      const feedbackValue = feedbackInputs[i].value;

      const { error } = await supabase
        .from("grades")
        .update({
          grade: gradeValue,
          feedback: feedbackValue
        })
        .eq("student_name", studentName)
        .eq("course_id", courseId);

      if (error) {
        alert("Error saving: " + error.message);
        return;
      }
    }

    alert("Changes saved");
    loadGradesPage();
  }

  async function searchBooks() {
    const query = document.getElementById("bookSearch")?.value;
    const resultsList = document.getElementById("bookResults");

    if (!resultsList) return;

    resultsList.innerHTML = "Searching...";

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .ilike("title", `%${query}%`);

    resultsList.innerHTML = "";

    if (error) {
      resultsList.innerHTML = "<li>Error searching books</li>";
      return;
    }

    data.forEach(book => {
      const li = document.createElement("li");
      li.textContent = `${book.title} - ${book.is_available ? "Available" : "Out on Loan"}`;
      resultsList.appendChild(li);
    });
  }

  async function loadLoans() {
    const loanList = document.getElementById("loanList");
    if (!loanList) return;

    const { data, error } = await supabase
      .from("loans")
      .select("id, due_date, book_title");

    loanList.innerHTML = "";

    if (error) {
      loanList.innerHTML = "<li>Error loading loans</li>";
      return;
    }

    if (!data || data.length === 0) {
      loanList.innerHTML = "<li>No loans found</li>";
      return;
    }

    data.forEach(loan => {
      const li = document.createElement("li");
      li.textContent = `${loan.book_title} | Due: ${loan.due_date}`;
      loanList.appendChild(li);
    });
  }

  async function loadReservations() {
    const reservationList = document.getElementById("reservationList");
    if (!reservationList) return;

    const { data, error } = await supabase
      .from("reservations")
      .select("id, reservation_date, reservation_time")
      .order("reservation_date", { ascending: true });

    reservationList.innerHTML = "";

    if (error) {
      reservationList.innerHTML = "<li>Error loading reservations</li>";
      return;
    }

    if (!data || data.length === 0) {
      reservationList.innerHTML = "<li>No reservations yet</li>";
      return;
    }

    data.forEach(res => {
      const li = document.createElement("li");
      li.textContent = `${res.reservation_date} at ${res.reservation_time} `;

      const btn = document.createElement("button");
      btn.textContent = "Cancel";
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
    } else {
      alert("Reservation cancelled");
      loadReservations();
    }
  }

  async function reserveRoom() {
    const date = document.getElementById("roomDate")?.value;
    const time = document.getElementById("roomTime")?.value;
    const status = document.getElementById("reservationStatus");

    if (!date || !time) {
      if (status) status.textContent = "Please select both date and time.";
      return;
    }

    const { error } = await supabase
      .from("reservations")
      .insert([{ reservation_date: date, reservation_time: time }]);

    if (error) {
      if (status) status.textContent = "Error: " + error.message;
    } else {
      if (status) status.textContent = "Reservation successful!";
      loadReservations();
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
  applyLanguage();
  loadUserInfo();

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  if (currentPage.includes("grades")) {
    loadGradesPage();
  }

  if (currentPage.includes("timetable")) {
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

  window.toggleForms = toggleForms;
  window.togglePassword = togglePassword;
  window.logout = logout;
  window.changeName = changeName;
  window.signupStudent = signupStudent;
  window.loginStudent = loginStudent;
  window.calculateGPA = calculateGPA;
  window.searchBooks = searchBooks;
  window.loadLoans = loadLoans;
  window.saveGrades = saveGrades;
  window.addGrade = addGrade;
  window.reserveRoom = reserveRoom;
  window.forgotPassword = forgotPassword;
  window.changeLanguage = changeLanguage;
}
