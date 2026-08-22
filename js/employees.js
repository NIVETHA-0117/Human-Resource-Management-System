function renderEmployees() {

  if (!currentUser ||
      currentUser.role !== "admin") {

    return;

  }

  const table =
    document.getElementById(
      "employeesTable"
    );

  const employees =
    users.filter(
      u => u.role === "employee"
    );

  table.innerHTML =
    employees.map(function (u) {

      return `
        <tr>

          <td>${u.name}</td>

          <td>${u.empId}</td>

          <td>${u.email}</td>

          <td>${u.department || "—"}</td>

          <td>
            ${u.role}
          </td>

          <td>
            <button
              class="btn btn-sm btn-outline"
              onclick="adminEditEmployee('${u.empId}')">
              Edit
            </button>
          </td>

        </tr>
      `;

    }).join("");
}


function adminEditEmployee(empId) {

  const u =
    users.find(
      x => x.empId === empId
    );

  if (!u) return;

  const dept =
    prompt(
      "Department:",
      u.department || ""
    );

  if (dept !== null) {

    u.department = dept;

  }

  const title =
    prompt(
      "Job title:",
      u.title || ""
    );

  if (title !== null) {

    u.title = title;

  }

  const phone =
    prompt(
      "Phone:",
      u.phone || ""
    );

  if (phone !== null) {

    u.phone = phone;

  }

  saveData();

  renderEmployees();
}