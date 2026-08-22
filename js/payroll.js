function renderPayroll() {

  if (!currentUser) return;

  const container =
    document.getElementById(
      "payrollContent"
    );

  if (currentUser.role !== "admin") {

    const s =
      currentUser.salary || {
        base: 0,
        allowances: 0,
        deductions: 0
      };

    const net =
      Number(s.base) +
      Number(s.allowances) -
      Number(s.deductions);

    container.innerHTML = `

      <div class="panel">

        <h2>My Salary</h2>

        <div class="kv">
          <span>Base Salary</span>
          <b>₹${Number(s.base).toLocaleString()}</b>
        </div>

        <div class="kv">
          <span>Allowances</span>
          <b>₹${Number(s.allowances).toLocaleString()}</b>
        </div>

        <div class="kv">
          <span>Deductions</span>
          <b>₹${Number(s.deductions).toLocaleString()}</b>
        </div>

        <div class="kv">
          <span><b>Net Salary</b></span>
          <b>₹${net.toLocaleString()}</b>
        </div>

      </div>
    `;

    return;
  }


  const employees =
    users.filter(
      u => u.role === "employee"
    );

  container.innerHTML = `

    <div class="panel">

      <h2>Employee Payroll</h2>

      <table>

        <thead>

          <tr>
            <th>Employee</th>
            <th>Base</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net</th>
            <th>Save</th>
          </tr>

        </thead>

        <tbody>

          ${employees.map(function (u) {

            const s = u.salary;

            const net =
              Number(s.base) +
              Number(s.allowances) -
              Number(s.deductions);

            return `

              <tr>

                <td>
                  ${u.name}
                </td>

                <td>
                  <input
                    class="salary-input"
                    id="base_${u.empId}"
                    type="number"
                    value="${s.base}">
                </td>

                <td>
                  <input
                    class="salary-input"
                    id="allow_${u.empId}"
                    type="number"
                    value="${s.allowances}">
                </td>

                <td>
                  <input
                    class="salary-input"
                    id="deduct_${u.empId}"
                    type="number"
                    value="${s.deductions}">
                </td>

                <td>
                  ₹${net.toLocaleString()}
                </td>

                <td>

                  <button
                    class="btn btn-sm btn-primary"
                    onclick="saveSalary('${u.empId}')">
                    Save
                  </button>

                </td>

              </tr>

            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;
}


function saveSalary(empId) {

  const u =
    users.find(
      x => x.empId === empId
    );

  if (!u) return;

  u.salary.base =
    Number(
      document.getElementById(
        "base_" + empId
      ).value
    ) || 0;

  u.salary.allowances =
    Number(
      document.getElementById(
        "allow_" + empId
      ).value
    ) || 0;

  u.salary.deductions =
    Number(
      document.getElementById(
        "deduct_" + empId
      ).value
    ) || 0;

  saveData();

  renderPayroll();

  alert(
    "Salary updated successfully."
  );
}