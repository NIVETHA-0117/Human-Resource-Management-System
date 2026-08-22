function renderProfile() {

  if (!currentUser) return;

  const u = currentUser;

  const initials =
    u.name
      .split(" ")
      .map(w => w[0])
      .slice(0, 2)
      .join("");

  document.getElementById("pf_avatar")
    .textContent = initials;

  document.getElementById("pf_name")
    .textContent = u.name;

  document.getElementById("pf_role")
    .textContent =
      u.role === "admin"
        ? "HR / Admin"
        : u.title;

  document.getElementById("pf_empid")
    .textContent = u.empId;

  document.getElementById("pf_email")
    .textContent = u.email;

  document.getElementById("pf_phone_view")
    .textContent = u.phone || "—";

  document.getElementById("pf_addr_view")
    .textContent = u.address || "—";

  document.getElementById("pf_dept")
    .textContent =
      u.department || "—";

  document.getElementById("pf_title")
    .textContent =
      u.title || "—";

  document.getElementById("pf_joined")
    .textContent =
      u.joined || "—";

  document.getElementById("pf_phone_edit")
    .value = u.phone || "";

  document.getElementById("pf_addr_edit")
    .value = u.address || "";

  document.getElementById("pf_editPanel")
    .classList.add("hidden");
}


function toggleEditProfile() {

  document.getElementById("pf_editPanel")
    .classList.toggle("hidden");
}


function saveProfile() {

  currentUser.phone =
    document
      .getElementById("pf_phone_edit")
      .value.trim();

  currentUser.address =
    document
      .getElementById("pf_addr_edit")
      .value.trim();

  const index =
    users.findIndex(
      u =>
        u.empId === currentUser.empId
    );

  if (index !== -1) {

    users[index] = currentUser;

  }

  saveData();

  renderProfile();

  alert("Profile updated successfully.");
}