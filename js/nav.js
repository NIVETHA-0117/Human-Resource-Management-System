/* =========================================================
   navigation.js — Page navigation
   ========================================================= */

function nav(view) {

  // Hide every application view
  document.querySelectorAll(".view").forEach(function(el) {
    el.classList.remove("active");
  });

  // Show the selected view
  const selectedView = document.getElementById("sub-" + view);

  if (selectedView) {
    selectedView.classList.add("active");
  } else {
    console.error("View not found: sub-" + view);
    return;
  }

  // Update active sidebar button
  document.querySelectorAll(".nav-link").forEach(function(link) {
    link.classList.remove("active");

    if (link.dataset.view === view) {
      link.classList.add("active");
    }
  });

  // Render the selected page
  switch (view) {

    case "dash":
      if (typeof renderDashboard === "function") {
        renderDashboard();
      }
      break;

    case "profile":
      if (typeof renderProfile === "function") {
        renderProfile();
      }
      break;

    case "employees":
      if (typeof renderEmployees === "function") {
        renderEmployees();
      }
      break;

    case "attendance":
      if (typeof renderAttendance === "function") {
        renderAttendance();
      }
      break;

    case "leave":
      if (typeof renderLeave === "function") {
        renderLeave();
      }
      break;

    case "payroll":
      if (typeof renderPayroll === "function") {
        renderPayroll();
      }
      break;

    case "reports":
      if (typeof renderReports === "function") {
        renderReports();
      }
      break;

    default:
      console.error("Unknown navigation view:", view);
  }
}


/* =========================================================
   Helper: create dashboard cards
   ========================================================= */

function makeCard(card) {

  const div = document.createElement("div");

  div.className = "qcard";

  div.innerHTML = `
    <div class="n">${card.n}</div>
    <div class="l">${card.l}</div>
  `;

  div.onclick = function() {
    nav(card.v);
  };

  return div;
}


/* =========================================================
   Status pill
   ========================================================= */

function statusPill(status) {

  const map = {
    Pending: "pill-pending",
    Approved: "pill-approved",
    Rejected: "pill-rejected",
    Present: "pill-present",
    Absent: "pill-absent",
    "Half-day": "pill-half",
    Leave: "pill-leave"
  };

  return `
    <span class="pill ${map[status] || "pill-pending"}">
      ${status}
    </span>
  `;
}