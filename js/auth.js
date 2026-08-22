/* =========================================================
   auth.js — Login, Signup, Authentication
   ========================================================= */

function showAuth(type) {
  document.querySelectorAll(".auth-wrap").forEach(v => {
    v.classList.remove("active");
  });

  if (type === "signin") {
    document.getElementById("view-signin").classList.add("active");
  } else {
    document.getElementById("view-signup").classList.add("active");
  }

  // Clear previous error messages
  document.querySelectorAll(".err, .ok").forEach(el => {
    el.style.display = "none";
    el.textContent = "";
  });
}


function showError(message) {
  let errorBox;

  // Display error according to the currently visible authentication page
  if (document.getElementById("view-signin").classList.contains("active")) {
    errorBox = document.getElementById("signinErr");
  } else {
    errorBox = document.getElementById("signupErr");
  }

  errorBox.textContent = message;
  errorBox.style.display = "block";
}


function showSuccess(message) {
  const box = document.getElementById("signupOk");

  box.textContent = message;
  box.style.display = "block";
}


function handleSignup() {

  const name = document.getElementById("su_name").value.trim();
  const empId = document.getElementById("su_empid").value.trim();
  const role = document.getElementById("su_role").value;
  const email = document.getElementById("su_email").value.trim().toLowerCase();
  const pass = document.getElementById("su_pass").value;

  // Validate empty fields
  if (!name || !empId || !email || !pass) {
    return showError("Fill in every field.");
  }

  // Validate password
  if (pass.length < 8 || !/[0-9]/.test(pass)) {
    return showError("Password needs 8+ chars and a number.");
  }

  // Check duplicate email
  if (users.some(u => u.email === email)) {
    return showError("Account already exists.");
  }

  // Check duplicate employee ID
  if (users.some(u => u.empId === empId)) {
    return showError("Employee ID already exists.");
  }

  // Create new user
  const newUser = {
    empId: empId,
    name: name,
    email: email,
    password: pass,
    role: role,
    department: "General",
    title: role === "admin" ? "HR / Admin" : "Employee",
    phone: "",
    address: "",
    joined: new Date().toISOString().slice(0, 10),
    salary: {
      base: 0,
      allowances: 0,
      deductions: 0
    }
  };

  users.push(newUser);

  // Show success message
  showSuccess("Account created successfully. Please sign in.");

  // Clear signup fields
  document.getElementById("su_name").value = "";
  document.getElementById("su_empid").value = "";
  document.getElementById("su_email").value = "";
  document.getElementById("su_pass").value = "";

  // Go to sign-in after a short delay
  setTimeout(() => {
    showAuth("signin");

    document.getElementById("si_email").value = email;
  }, 800);
}


function handleSignin() {

  const email = document.getElementById("si_email").value.trim().toLowerCase();
  const pass = document.getElementById("si_pass").value;

  if (!email || !pass) {
    return showError("Enter email and password.");
  }

  const user = users.find(
    u => u.email === email && u.password === pass
  );

  if (!user) {
    return showError("Incorrect email or password.");
  }

  currentUser = user;

  enterApp();
}


function enterApp() {

  // Hide signup and signin pages
  document.querySelectorAll(".auth-wrap").forEach(v => {
    v.classList.remove("active");
  });

  // Show application
  document.getElementById("view-app").classList.add("active");

  // Show correct navigation
  document.getElementById("navEmployee").style.display =
    currentUser.role === "employee" ? "block" : "none";

  document.getElementById("navAdmin").style.display =
    currentUser.role === "admin" ? "block" : "none";

  // Display logged-in user
  document.getElementById("whoName").textContent = currentUser.name;

  document.getElementById("whoRole").textContent =
    currentUser.role === "admin" ? "HR / Admin" : "Employee";

  // Open dashboard
  nav("dash");
}


function logout() {

  currentUser = null;

  // Hide application
  document.getElementById("view-app").classList.remove("active");

  // Show sign-in page
  showAuth("signin");

  // Clear login fields
  document.getElementById("si_email").value = "";
  document.getElementById("si_pass").value = "";
}