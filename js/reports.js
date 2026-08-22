function renderReports() {

  if (
    !currentUser ||
    currentUser.role !== "admin"
  ) {

    return;

  }

  const summary =
    users
      .filter(
        u => u.role === "employee"
      )
      .map(function (u) {

        const records =
          attendance.filter(
            a =>
              a.empId === u.empId
          );

        const present =
          records.filter(
            r =>
              r.status === "Present"
          ).length;

        const absent =
          records.filter(
            r =>
              r.status === "Absent"
          ).length;

        return `
          <div class="kv">

            <span>
              ${u.name}
            </span>

            <span>
              ${present} present ·
              ${absent} absent
            </span>

          </div>
        `;

      })
      .join("");

  document.getElementById(
    "report_att"
  ).innerHTML =
    summary ||
    `<div class="empty">
      No attendance data.
    </div>`;


  document.getElementById(
    "report_emp"
  ).innerHTML =
    users
      .filter(
        u => u.role === "employee"
      )
      .map(function (u) {

        return `
          <option value="${u.empId}">
            ${u.name}
          </option>
        `;

      })
      .join("");
}


function generateSlip() {

  const empId =
    document.getElementById(
      "report_emp"
    ).value;

  const u =
    users.find(
      x => x.empId === empId
    );

  if (!u) {

    alert("Select an employee.");

    return;
  }

  const s = u.salary;

  const net =
    Number(s.base) +
    Number(s.allowances) -
    Number(s.deductions);

  document.getElementById(
    "report_slip"
  ).innerHTML = `

    <div class="slip">

      <h2>Salary Slip</h2>

      <div class="kv">
        <span>Employee</span>
        <span>
          ${u.name} (${u.empId})
        </span>
      </div>

      <div class="kv">
        <span>Base Pay</span>
        <span>
          ₹${Number(s.base).toLocaleString()}
        </span>
      </div>

      <div class="kv">
        <span>Allowances</span>
        <span>
          ₹${Number(s.allowances).toLocaleString()}
        </span>
      </div>

      <div class="kv">
        <span>Deductions</span>
        <span>
          -₹${Number(s.deductions).toLocaleString()}
        </span>
      </div>

      <div class="kv">
        <b>Net Pay</b>
        <b>
          ₹${net.toLocaleString()}
        </b>
      </div>

    </div>
  `;
}