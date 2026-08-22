function renderAttendance() {

  if (!currentUser) return;

  const actions =
    document.getElementById(
      "attendanceActions"
    );

  if (currentUser.role === "employee") {

    actions.innerHTML = `
      <h2>Today's Attendance</h2>

      <p>
        Record your check-in and check-out.
      </p>

      <button
        class="btn btn-primary"
        onclick="checkInOut('${currentUser.empId}')">
        Check In / Check Out
      </button>
    `;

  } else {

    actions.innerHTML = `
      <h2>Attendance Overview</h2>
      <p>View attendance records for all employees.</p>
    `;

  }

  const table =
    document.getElementById(
      "attendanceTable"
    );

  table.innerHTML =
    attendance
      .slice()
      .reverse()
      .map(function (a) {

        const u =
          users.find(
            x => x.empId === a.empId
          );

        return `
          <tr>

            <td>
              ${u ? u.name : a.empId}
            </td>

            <td>${a.date}</td>

            <td>
              ${statusPill(a.status)}
            </td>

            <td>${a.checkIn || "-"}</td>

            <td>${a.checkOut || "-"}</td>

          </tr>
        `;

      }).join("") ||
    `
      <tr>
        <td colspan="5" class="empty">
          No attendance records yet.
        </td>
      </tr>
    `;
}


function checkInOut(empId) {

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const now =
    new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

  let rec =
    attendance.find(
      a =>
        a.empId === empId &&
        a.date === today
    );

  if (!rec) {

    attendance.push({

      empId: empId,

      date: today,

      status: "Present",

      checkIn: now,

      checkOut: "-"

    });

    alert("Check-in recorded.");

  } else if (
    rec.checkOut === "-"
  ) {

    rec.checkOut = now;

    alert("Check-out recorded.");

  } else {

    alert(
      "You have already checked in and out today."
    );

  }

  saveData();

  renderAttendance();

  renderDashboard();
}