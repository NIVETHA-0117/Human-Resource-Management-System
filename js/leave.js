function renderLeave() {

  if (!currentUser) return;

  const form =
    document.getElementById("leaveForm");

  if (currentUser.role === "admin") {

    form.style.display = "none";

  } else {

    form.style.display = "block";

  }

  let records;

  if (currentUser.role === "admin") {

    records = leaveRequests;

  } else {

    records =
      leaveRequests.filter(
        l =>
          l.empId === currentUser.empId
      );

  }

  const table =
    document.getElementById(
      "leaveTable"
    );

  table.innerHTML =
    records
      .slice()
      .reverse()
      .map(function (l) {

        const u =
          users.find(
            x => x.empId === l.empId
          );

        let action = "—";

        if (
          currentUser.role === "admin" &&
          l.status === "Pending"
        ) {

          action = `
            <div class="small-btn-row">

              <button
                class="btn btn-sm btn-outline"
                onclick="actOnLeave(${l.id}, 'Approved')">
                Approve
              </button>

              <button
                class="btn btn-sm btn-danger"
                onclick="actOnLeave(${l.id}, 'Rejected')">
                Reject
              </button>

            </div>
          `;

        }

        return `
          <tr>

            <td>
              ${u ? u.name : l.empId}
            </td>

            <td>${l.type}</td>

            <td>${l.start}</td>

            <td>${l.end}</td>

            <td>
              ${statusPill(l.status)}
            </td>

            <td>${action}</td>

          </tr>
        `;

      }).join("") ||
    `
      <tr>
        <td colspan="6" class="empty">
          No leave requests.
        </td>
      </tr>
    `;
}


function submitLeave() {

  const type =
    document.getElementById("lv_type")
      .value;

  const start =
    document.getElementById("lv_start")
      .value;

  const end =
    document.getElementById("lv_end")
      .value;

  const remarks =
    document.getElementById("lv_remarks")
      .value.trim();

  if (!start || !end) {

    alert(
      "Please select start and end dates."
    );

    return;
  }

  if (end < start) {

    alert(
      "End date cannot be before start date."
    );

    return;
  }

  leaveRequests.push({

    id: leaveIdSeq++,

    empId: currentUser.empId,

    type: type,

    start: start,

    end: end,

    remarks: remarks,

    status: "Pending",

    comment: ""

  });

  saveData();

  document.getElementById("lv_start")
    .value = "";

  document.getElementById("lv_end")
    .value = "";

  document.getElementById("lv_remarks")
    .value = "";

  renderLeave();

  renderDashboard();

  alert(
    "Leave request submitted successfully."
  );
}


function actOnLeave(id, decision) {

  if (
    !currentUser ||
    currentUser.role !== "admin"
  ) {

    return;

  }

  const l =
    leaveRequests.find(
      x => x.id === id
    );

  if (!l) return;

  l.status = decision;

  saveData();

  renderLeave();

  renderDashboard();

  alert(
    "Leave request " +
    decision.toLowerCase() +
    "."
  );
}