function showError(message) {

  const box =
    document.getElementById("signinError");

  box.textContent = message;
  box.style.display = "block";
}


function showSignupError(message) {

  const box =
    document.getElementById("signupError");

  box.textContent = message;
  box.style.display = "block";
}


function showSignin() {

  document
    .getElementById("signupCard")
    .classList.add("hidden");

  document
    .getElementById("signinCard")
    .classList.remove("hidden");

  document.getElementById("signinError")
    .style.display = "none";
}


function showSignup() {

  document
    .getElementById("signinCard")
    .classList.add("hidden");

  document
    .getElementById("signupCard")
    .classList.remove("hidden");

  document.getElementById("signupError")
    .style.display = "none";
}


function handleSignin() {

  const email =
    document
      .getElementById("si_email")
      .value
      .trim()
      .toLowerCase();

  const pass =
    document
      .getElementById("si_pass")
      .value;

  if (!email || !pass) {

    showError("Please enter email and password.");

    return;
  }

  const user = users.find(
    u =>
      u.email.toLowerCase() === email &&
      u.password === pass
  );

  if (!user) {

    showError("Incorrect email or password.");

    return;
  }

  currentUser = user;

  document
    .getElementById("authPage")
    .classList.add("hidden");

  document
    .getElementById("appPage")
    .classList.remove("hidden");

  enterApp();
}


function handleSignup() {

  const name =
    document.getElementById("su_name")
      .value.trim();

  const empId =
    document.getElementById("su_empid")
      .value.trim();

  const email =
    document.getElementById("su_email")
      .value.trim()
      .toLowerCase();

  const pass =
    document.getElementById("su_pass")
      .value;

  if (!name || !empId || !email || !pass) {

    showSignupError(
      "Please fill in every field."
    );

    return;
  }

  if (
    pass.length < 8 ||
    !/[0-9]/.test(pass)
  ) {

    showSignupError(
      "Password needs at least 8 characters and one number."
    );

    return;
  }

  if (
    users.some(
      u =>
        u.email.toLowerCase() === email
    )
  ) {

    showSignupError(
      "An account with this email already exists."
    );

    return;
  }

  if (
    users.some(
      u =>
        u.empId.toLowerCase() ===
        empId.toLowerCase()
    )
  ) {

    showSignupError(
      "Employee ID already exists."
    );

    return;
  }

  const newUser = {

    empId: empId,

    name: name,

    email: email,

    password: pass,

    role: "employee",

    department: "Not Assigned",

    title: "Employee",

    phone: "",

    address: "",

    joined:
      new Date()
        .toISOString()
        .slice(0, 10),

    salary: {
      base: 0,
      allowances: 0,
      deductions: 0
    }

  };

  users.push(newUser);

  saveData();

  document.getElementById("signupSuccess")
    .textContent =
      "Account created successfully. You can now sign in.";

  document.getElementById("signupSuccess")
    .style.display = "block";

  document.getElementById("signupError")
    .style.display = "none";

  setTimeout(function () {

    showSignin();

    document.getElementById("si_email")
      .value = email;

  }, 1000);
}


function enterApp() {

  document.getElementById("sideName")
    .textContent = currentUser.name;

  document.getElementById("sideRole")
    .textContent =
      currentUser.role === "admin"
        ? "HR / Admin"
        : "Employee";

  const admin =
    currentUser.role === "admin";

  document.getElementById("employeesNav")
    .style.display =
      admin ? "flex" : "none";

  document.getElementById("reportsNav")
    .style.display =
      admin ? "flex" : "none";

  document.getElementById("todayDate")
    .textContent =
      new Date().toLocaleDateString();

  nav("dash");
}


function logout() {

  currentUser = null;

  document
    .getElementById("appPage")
    .classList.add("hidden");

  document
    .getElementById("authPage")
    .classList.remove("hidden");

  document.getElementById("si_email")
    .value = "";

  document.getElementById("si_pass")
    .value = "";

  showSignin();
}