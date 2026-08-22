/* =========================================================
   data.js
   Dayflow HRMS - Application Data
========================================================= */

const DEFAULT_USERS = [

    {
        id: "ADM001",
        empId: "ADM001",
        name: "Dayflow Administrator",
        email: "admin@dayflow.com",
        password: "Admin@123",
        role: "Admin",
        department: "Human Resources",
        designation: "HR Administrator",
        phone: "+91 9876543210",
        salary: 75000,
        status: "Active"
    },

    {
        id: "EMP001",
        empId: "EMP001",
        name: "Demo Employee",
        email: "employee@dayflow.com",
        password: "Employee@123",
        role: "Employee",
        department: "Information Technology",
        designation: "Software Developer",
        phone: "+91 9876543211",
        salary: 45000,
        status: "Active"
    }

];


/* =========================================================
   DATABASE HELPERS
========================================================= */

function initializeData() {

    if (!localStorage.getItem("dayflow_users")) {

        localStorage.setItem(
            "dayflow_users",
            JSON.stringify(DEFAULT_USERS)
        );

    }

    if (!localStorage.getItem("dayflow_attendance")) {

        localStorage.setItem(
            "dayflow_attendance",
            JSON.stringify([])
        );

    }

    if (!localStorage.getItem("dayflow_leave")) {

        localStorage.setItem(
            "dayflow_leave",
            JSON.stringify([])
        );

    }

    if (!localStorage.getItem("dayflow_payroll")) {

        localStorage.setItem(
            "dayflow_payroll",
            JSON.stringify([])
        );

    }

}


/* =========================================================
   USERS
========================================================= */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem("dayflow_users")
        ) || [];

    } catch (error) {

        console.error("Unable to load users:", error);

        return [];

    }

}


function saveUsers(users) {

    localStorage.setItem(
        "dayflow_users",
        JSON.stringify(users)
    );

}


/* =========================================================
   ATTENDANCE
========================================================= */

function getAttendance() {

    try {

        return JSON.parse(
            localStorage.getItem("dayflow_attendance")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveAttendance(records) {

    localStorage.setItem(
        "dayflow_attendance",
        JSON.stringify(records)
    );

}


/* =========================================================
   LEAVE
========================================================= */

function getLeaveRequests() {

    try {

        return JSON.parse(
            localStorage.getItem("dayflow_leave")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveLeaveRequests(records) {

    localStorage.setItem(
        "dayflow_leave",
        JSON.stringify(records)
    );

}


/* =========================================================
   PAYROLL
========================================================= */

function getPayroll() {

    try {

        return JSON.parse(
            localStorage.getItem("dayflow_payroll")
        ) || [];

    } catch (error) {

        return [];

    }

}


function savePayroll(records) {

    localStorage.setItem(
        "dayflow_payroll",
        JSON.stringify(records)
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

initializeData();