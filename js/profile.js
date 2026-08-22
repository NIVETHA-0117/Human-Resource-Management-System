/* =========================================================
   profile.js — 3.3 Employee Profile Management (View / Edit)
   ========================================================= */

function renderProfile(){
  const u = currentUser;
  document.getElementById("pf_avatar").textContent = u.name.split(" ").map(w=>w[0]).slice(0,2).join("");
  document.getElementById("pf_name").textContent = u.name;
  document.getElementById("pf_role").textContent = u.role==="admin" ? "HR / Admin" : u.title;
  document.getElementById("pf_empid").textContent = u.empId;
  document.getElementById("pf_email").textContent = u.email;
  document.getElementById("pf_phone_view").textContent = u.phone || "—";
  document.getElementById("pf_addr_view").textContent = u.address || "—";
  document.getElementById("pf_dept").textContent = u.department || "—";
  document.getElementById("pf_title").textContent = u.title || "—";
  document.getElementById("pf_joined").textContent = u.joined || "—";
  document.getElementById("pf_phone_edit").value = u.phone || "";
  document.getElementById("pf_addr_edit").value = u.address || "";
  document.getElementById("pf_editPanel").style.display = "none";
}

function toggleEditProfile(){
  const p = document.getElementById("pf_editPanel");
  p.style.display = p.style.display==="none" ? "block" : "none";
}

function saveProfile(){
  // Employees can only edit limited fields (phone, address)
  currentUser.phone = document.getElementById("pf_phone_edit").value.trim();
  currentUser.address = document.getElementById("pf_addr_edit").value.trim();
  renderProfile();
}