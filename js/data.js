let users = JSON.parse(localStorage.getItem("dayflow_users")) || [
  {
    empId: "EMP-0001",
    name: "Meera Admin",
    email: "admin@dayflow.com",
    password: "Admin1234",
    role: "admin",
    department: "Human Resources",
    title: "HR Manager",
    phone: "9840012345",
    address: "Chennai, IN",
    joined: "2021-03-01",
    salary: {
      base: 70000,
      allowances: 8000,
      deductions: 4000
    }
  },

  {
    empId: "EMP-1042",
    name: "Asha Rao",
    email: "asha@dayflow.com",
    password: "Asha1234",
    role: "employee",
    department: "Engineering",
    title: "Frontend Developer",
    phone: "9876543210",
    address: "T. Nagar, Chennai",
    joined: "2023-06-12",
    salary: {
      base: 52000,
      allowances: 6000,
      deductions: 3200
    }
  }
];

let attendance =
  JSON.parse(localStorage.getItem("dayflow_attendance")) || [];

let leaveRequests =
  JSON.parse(localStorage.getItem("dayflow_leave")) || [];

let currentUser = null;

let leaveIdSeq =
  Number(localStorage.getItem("dayflow_leave_id")) || 1;


function saveData() {

  localStorage.setItem(
    "dayflow_users",
    JSON.stringify(users)
  );

  localStorage.setItem(
    "dayflow_attendance",
    JSON.stringify(attendance)
  );

  localStorage.setItem(
    "dayflow_leave",
    JSON.stringify(leaveRequests)
  );

  localStorage.setItem(
    "dayflow_leave_id",
    leaveIdSeq
  );
}


function makeCard(card) {

  const div = document.createElement("div");

  div.className = "qcard";

  div.onclick = function () {
    nav(card.v);
  };

  div.innerHTML = `
    <div class="n">${card.n}</div>
    <div class="l">${card.l}</div>
  `;

  return div;
}


function statusPill(status) {

  const map = {
    Pending: "pill-pending",
    Approved: "pill-approved",
    Rejected: "pill-rejected",
    Present: "pill-present",
    Absent: "pill-absent",
    "Half-day": "pill-half"
  };

  return `
    <span class="pill ${map[status] || "pill-pending"}">
      ${status}
    </span>
  `;
}