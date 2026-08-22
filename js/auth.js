function handleSignup(){
  const name = document.getElementById("su_name").value.trim();
  const empId = document.getElementById("su_empid").value.trim();
  const email = document.getElementById("su_email").value.trim().toLowerCase();
  const pass = document.getElementById("su_pass").value;

  if(!name || !empId || !email || !pass) return showError("Fill in every field.");
  if(pass.length < 8 || !/[0-9]/.test(pass)) return showError("Password needs 8+ chars and a number.");
  if(users.some(u=>u.email===email)) return showError("Account already exists.");

  users.push({empId, name, email, password:pass, role:"employee", salary:{base:0,allowances:0,deductions:0}});
}

function handleSignin(){
  const email = document.getElementById("si_email").value.trim().toLowerCase();
  const pass = document.getElementById("si_pass").value;
  const user = users.find(u=>u.email===email && u.password===pass);
  if(!user) return showError("Incorrect email or password.");
  currentUser = user;
  enterApp(); // shows dashboard
}