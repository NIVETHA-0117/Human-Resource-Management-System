/* =========================================================
   nav.js
   Dayflow HRMS Navigation
========================================================= */


const PAGE_DETAILS = {

    dashboard: {
        title: "Dashboard",
        subtitle: "Overview of your Dayflow workspace."
    },

    profile: {
        title: "My Profile",
        subtitle: "View and manage your personal information."
    },

    attendance: {
        title: "Attendance",
        subtitle: "Track attendance and working hours."
    },

    leave: {
        title: "Leave Requests",
        subtitle: "Manage your leave requests."
    },

    employees: {
        title: "Employees",
        subtitle: "Manage your organization's employees."
    },

    payroll: {
        title: "Payroll",
        subtitle: "Manage employee salary information."
    },

    reports: {
        title: "Reports",
        subtitle: "View HR analytics and reports."
    }

};


/* =========================================================
   LOAD PAGE
========================================================= */

function loadPage(page) {

    if (!requireLogin()) {

        return;

    }


    const session =
        getCurrentSession();


    /*
       Employee-only pages
    */

    const employeePages = [
        "profile",
        "leave"
    ];


    /*
       Admin-only pages
    */

    const adminPages = [
        "employees",
        "reports",
        "payroll"
    ];


    if (
        adminPages.includes(page) &&
        session.role !== "Admin"
    ) {

        showAccessDenied();

        return;

    }


    if (
        employeePages.includes(page) &&
        session.role !== "Employee"
    ) {

        showAccessDenied();

        return;

    }


    updateActiveNavigation(page);

    updatePageHeader(page);


    const content =
        document.getElementById("contentArea");


    if (!content) {

        return;

    }


    switch (page) {

        case "dashboard":

            if (
                typeof renderDashboard ===
                "function"
            ) {

                renderDashboard();

            } else {

                renderBasicDashboard();

            }

            break;


        case "profile":

            if (
                typeof renderProfile ===
                "function"
            ) {

                renderProfile();

            } else {

                renderProfileFallback();

            }

            break;


        case "attendance":

            if (
                typeof renderAttendance ===
                "function"
            ) {

                renderAttendance();

            } else {

                renderAttendanceFallback();

            }

            break;


        case "leave":

            if (
                typeof renderLeave ===
                "function"
            ) {

                renderLeave();

            } else {

                renderLeaveFallback();

            }

            break;


        case "employees":

            if (
                typeof renderEmployees ===
                "function"
            ) {

                renderEmployees();

            } else {

                renderEmployeesFallback();

            }

            break;


        case "payroll":

            if (
                typeof renderPayroll ===
                "function"
            ) {

                renderPayroll();

            } else {

                renderPayrollFallback();

            }

            break;


        case "reports":

            if (
                typeof renderReports ===
                "function"
            ) {

                renderReports();

            } else {

                renderReportsFallback();

            }

            break;


        default:

            renderBasicDashboard();

    }

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation(page) {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.classList.remove("active");


        if (
            item.dataset.page === page
        ) {

            item.classList.add("active");

        }

    });

}


/* =========================================================
   PAGE HEADER
========================================================= */

function updatePageHeader(page) {

    const details =
        PAGE_DETAILS[page];


    if (!details) {

        return;

    }


    const title =
        document.getElementById("pageTitle");


    const subtitle =
        document.getElementById("pageSubtitle");


    if (title) {

        title.textContent =
            details.title;

    }


    if (subtitle) {

        subtitle.textContent =
            details.subtitle;

    }

}


/* =========================================================
   SIDEBAR
========================================================= */

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");


    sidebar.classList.toggle("open");

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const sidebar =
            document.getElementById("sidebar");


        const menuButton =
            document.querySelector(".mobile-menu-btn");


        if (
            sidebar &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    }
);


/* =========================================================
   FALLBACK DASHBOARD
========================================================= */

function renderBasicDashboard() {

    const session =
        getCurrentSession();


    const content =
        document.getElementById("contentArea");


    const admin =
        session.role === "Admin";


    content.innerHTML = `

        <div class="welcome-banner">

            <div>

                <span class="welcome-label">
                    ${admin ? "ADMIN / HR" : "EMPLOYEE"}
                </span>

                <h2>
                    Welcome back, ${escapeHTML(session.name)}!
                </h2>

                <p>
                    Here's what's happening in your
                    Dayflow workspace today.
                </p>

            </div>

            <div class="welcome-icon">

                <i class="fa-solid fa-sun"></i>

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-users"></i>
                </div>

                <div>

                    <span class="stat-label">
                        ${admin ? "Total Employees" : "Employee ID"}
                    </span>

                    <strong>
                        ${
                            admin
                            ? getUsers().filter(
                                u => u.role === "Employee"
                              ).length
                            : session.empId
                        }
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-regular fa-calendar-check"></i>
                </div>

                <div>

                    <span class="stat-label">
                        Attendance
                    </span>

                    <strong>
                        ${
                            admin
                            ? getAttendance().length
                            : "View"
                        }
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>

                <div>

                    <span class="stat-label">
                        Leave Requests
                    </span>

                    <strong>
                        ${getLeaveRequests().length}
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                </div>

                <div>

                    <span class="stat-label">
                        Payroll
                    </span>

                    <strong>
                        View
                    </strong>

                </div>

            </div>

        </div>


        <div class="section-card">

            <div class="section-header">

                <div>

                    <h3>Quick Access</h3>

                    <p>
                        Frequently used Dayflow features.
                    </p>

                </div>

            </div>


            <div class="quick-actions">

                ${
                    admin
                    ? `
                        <button
                            onclick="loadPage('employees')"
                            class="quick-action"
                        >
                            <i class="fa-solid fa-users"></i>
                            <span>Employees</span>
                        </button>

                        <button
                            onclick="loadPage('attendance')"
                            class="quick-action"
                        >
                            <i class="fa-regular fa-calendar-check"></i>
                            <span>Attendance</span>
                        </button>

                        <button
                            onclick="loadPage('leave')"
                            class="quick-action"
                        >
                            <i class="fa-solid fa-file-circle-check"></i>
                            <span>Leave Approvals</span>
                        </button>

                        <button
                            onclick="loadPage('reports')"
                            class="quick-action"
                        >
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Reports</span>
                        </button>
                    `
                    :
                    `
                        <button
                            onclick="loadPage('profile')"
                            class="quick-action"
                        >
                            <i class="fa-regular fa-user"></i>
                            <span>My Profile</span>
                        </button>

                        <button
                            onclick="loadPage('attendance')"
                            class="quick-action"
                        >
                            <i class="fa-regular fa-clock"></i>
                            <span>Attendance</span>
                        </button>

                        <button
                            onclick="loadPage('leave')"
                            class="quick-action"
                        >
                            <i class="fa-regular fa-calendar-days"></i>
                            <span>Apply Leave</span>
                        </button>
                    `
                }

            </div>

        </div>

    `;

}


/* =========================================================
   FALLBACK PAGES
========================================================= */

function renderProfileFallback() {

    const user = getCurrentUser();

    document.getElementById("contentArea").innerHTML = `

        <div class="section-card">

            <div class="section-header">

                <h3>My Profile</h3>

            </div>

            <div class="profile-grid">

                <div class="profile-avatar-large">
                    ${user.name.charAt(0).toUpperCase()}
                </div>

                <div class="profile-info">

                    <h2>${escapeHTML(user.name)}</h2>

                    <p>${escapeHTML(user.designation)}</p>

                    <div class="profile-details">

                        <div>
                            <span>Email</span>
                            <strong>${escapeHTML(user.email)}</strong>
                        </div>

                        <div>
                            <span>Employee ID</span>
                            <strong>${escapeHTML(user.empId)}</strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>${escapeHTML(user.department)}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>${escapeHTML(user.phone || "Not provided")}</strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

}


function renderAttendanceFallback() {

    const session = getCurrentSession();

    document.getElementById("contentArea").innerHTML = `

        <div class="section-card">

            <div class="section-header">

                <div>
                    <h3>Attendance</h3>
                    <p>Track your daily attendance.</p>
                </div>

                <button class="primary-btn small-btn">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    Check In
                </button>

            </div>

            <div class="empty-state">

                <i class="fa-regular fa-clock"></i>

                <h3>No attendance records yet</h3>

                <p>
                    Attendance records for
                    ${escapeHTML(session.name)}
                    will appear here.
                </p>

            </div>

        </div>

    `;

}


function renderLeaveFallback() {

    document.getElementById("contentArea").innerHTML = `

        <div class="section-card">

            <div class="section-header">

                <div>
                    <h3>Leave Requests</h3>
                    <p>Manage your time-off requests.</p>
                </div>

                <button class="primary-btn small-btn">
                    <i class="fa-solid fa-plus"></i>
                    Apply Leave
                </button>

            </div>

            <div class="empty-state">

                <i class="fa-regular fa-calendar-days"></i>

                <h3>No leave requests</h3>

                <p>
                    Your leave requests will appear here.
                </p>

            </div>

        </div>

    `;

}


function renderEmployeesFallback() {

    if (!requireAdmin()) return;

    const users =
        getUsers().filter(
            user => user.role === "Employee"
        );


    let rows = "";


    users.forEach(function (user) {

        rows += `

            <tr>

                <td>
                    <strong>${escapeHTML(user.empId)}</strong>
                </td>

                <td>
                    ${escapeHTML(user.name)}
                </td>

                <td>
                    ${escapeHTML(user.email)}
                </td>

                <td>
                    ${escapeHTML(user.department)}
                </td>

                <td>
                    <span class="status active">
                        Active
                    </span>
                </td>

            </tr>

        `;

    });


    document.getElementById("contentArea").innerHTML = `

        <div class="section-card">

            <div class="section-header">

                <div>
                    <h3>Employee List</h3>
                    <p>
                        View all registered employees.
                    </p>
                </div>

                <span class="count-badge">
                    ${users.length} Employees
                </span>

            </div>

            <div class="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                            <tr>
                                <td
                                    colspan="5"
                                    class="empty-table"
                                >
                                    No employees found.
                                </td>
                            </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


function renderPayrollFallback() {

    if (!requireAdmin()) return;

    const users =
        getUsers().filter(
            user => user.role === "Employee"
        );


    document.getElementById("contentArea").innerHTML = `

        <div class="section-card">

            <div class="section-header">

                <div>
                    <h3>Payroll Management</h3>
                    <p>
                        View employee salary information.
                    </p>
                </div>

            </div>

            <div class="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Employee ID</th>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Salary</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            users.map(user => `

                                <tr>

                                    <td>${escapeHTML(user.empId)}</td>

                                    <td>${escapeHTML(user.name)}</td>

                                    <td>${escapeHTML(user.department)}</td>

                                    <td>
                                        ₹${Number(user.salary || 0).toLocaleString("en-IN")}
                                    </td>

                                </tr>

                            `).join("")
                        }

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


function renderReportsFallback() {

    if (!requireAdmin()) return;

    const employees =
        getUsers().filter(
            user => user.role === "Employee"
        );


    document.getElementById("contentArea").innerHTML = `

        <div class="dashboard-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-users"></i>
                </div>

                <div>
                    <span class="stat-label">
                        Employees
                    </span>

                    <strong>
                        ${employees.length}
                    </strong>
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-regular fa-calendar-check"></i>
                </div>

                <div>
                    <span class="stat-label">
                        Attendance Records
                    </span>

                    <strong>
                        ${getAttendance().length}
                    </strong>
                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>

                <div>
                    <span class="stat-label">
                        Leave Requests
                    </span>

                    <strong>
                        ${getLeaveRequests().length}
                    </strong>
                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}