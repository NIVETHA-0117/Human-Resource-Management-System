<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dayflow — HRMS</title>

    <!-- CSS FILE -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <div class="auth-wrap view active" id="view-signup">

        <div class="auth-card">

            <div class="auth-brand">
                <div class="mark">D</div>
                <div>
                    <div class="word">Dayflow</div>
                    <div class="tag">Every workday, perfectly aligned.</div>
                </div>
            </div>

            <div class="err" id="signupErr"></div>
            <div class="ok" id="signupOk"></div>

            <div class="field">
                <label>Full name</label>
                <input id="su_name" placeholder="Jordan Reyes">
            </div>

            <div class="row2">

                <div class="field">
                    <label>Employee ID</label>
                    <input id="su_empid" placeholder="EMP-1042">
                </div>

                <div class="field">
                    <label>Role</label>

                    <select id="su_role">
                        <option value="employee">Employee</option>
                        <option value="admin">HR / Admin</option>
                    </select>
                </div>

            </div>

            <div class="field">
                <label>Email</label>
                <input
                    id="su_email"
                    type="email"
                    placeholder="you@company.com">
            </div>

            <div class="field">
                <label>Password</label>

                <input
                    id="su_pass"
                    type="password"
                    placeholder="Min 8 chars, 1 number">

                <div class="hint">
                    Must be 8+ characters and include at least one number.
                </div>
            </div>

            <button
                class="btn btn-primary"
                onclick="handleSignup()">
                Create account
            </button>

            <div class="auth-switch">
                Already have an account?
                <a onclick="showAuth('signin')">
                    Sign in
                </a>
            </div>

        </div>

    </div>


    <div class="auth-wrap view" id="view-signin">

        <div class="auth-card">

            <div class="auth-brand">
                <div class="mark">D</div>

                <div>
                    <div class="word">Dayflow</div>
                    <div class="tag">
                        Every workday, perfectly aligned.
                    </div>
                </div>
            </div>

            <div class="err" id="signinErr"></div>

            <div class="field">
                <label>Email</label>

                <input
                    id="si_email"
                    type="email"
                    placeholder="you@company.com">
            </div>

            <div class="field">
                <label>Password</label>

                <input
                    id="si_pass"
                    type="password"
                    placeholder="••••••••">
            </div>

            <button
                class="btn btn-primary"
                onclick="handleSignin()">
                Sign in
            </button>

            <div class="auth-switch">
                New here?
                <a onclick="showAuth('signup')">
                    Create an account
                </a>
            </div>

            <div
                class="hint"
                style="text-align:center;margin-top:10px;">

                Demo logins —
                admin@dayflow.com / Admin1234
                ·
                asha@dayflow.com / Asha1234

            </div>

        </div>

    </div>


    <div class="app view" id="view-app">

        <div class="sidebar">

            <div class="brand">
                <div class="mark">D</div>
                <div class="word">Dayflow</div>
            </div>


            <!-- EMPLOYEE NAVIGATION -->
            <div id="navEmployee" style="display:none;">

                <div
                    class="nav-link"
                    data-view="dash"
                    onclick="nav('dash')">
                    🏠 Dashboard
                </div>

                <div
                    class="nav-link"
                    data-view="profile"
                    onclick="nav('profile')">
                    👤 Profile
                </div>

                <div
                    class="nav-link"
                    data-view="attendance"
                    onclick="nav('attendance')">
                    🕒 Attendance
                </div>

                <div
                    class="nav-link"
                    data-view="leave"
                    onclick="nav('leave')">
                    📋 Leave Requests
                </div>

                <div
                    class="nav-link"
                    data-view="payroll"
                    onclick="nav('payroll')">
                    💰 Payroll
                </div>

            </div>


            <!-- ADMIN NAVIGATION -->
            <div id="navAdmin" style="display:none;">

                <div
                    class="nav-link"
                    data-view="dash"
                    onclick="nav('dash')">
                    🏠 Dashboard
                </div>

                <div
                    class="nav-link"
                    data-view="employees"
                    onclick="nav('employees')">
                    👥 Employees
                </div>

                <div
                    class="nav-link"
                    data-view="attendance"
                    onclick="nav('attendance')">
                    🕒 Attendance
                </div>

                <div
                    class="nav-link"
                    data-view="leave"
                    onclick="nav('leave')">
                    📋 Leave Approvals
                </div>

                <div
                    class="nav-link"
                    data-view="payroll"
                    onclick="nav('payroll')">
                    💰 Payroll Control
                </div>

                <div
                    class="nav-link"
                    data-view="reports"
                    onclick="nav('reports')">
                    📊 Reports
                </div>

            </div>


            <div class="spacer"></div>


            <!-- CURRENT USER -->
            <div class="who">
                <b id="whoName">—</b>
                <span id="whoRole">—</span>
            </div>


            <!-- LOGOUT -->
            <div
                class="nav-link"
                onclick="logout()"
                style="margin-top:8px;">

                ↩ Logout

            </div>

        </div>


        <div class="main">


            <div class="view" id="sub-dash">

                <div class="topbar">

                    <div>
                        <h2 id="dashGreeting">
                            Welcome
                        </h2>

                        <div
                            class="sub"
                            id="dashSub">
                        </div>
                    </div>

                </div>


                <div
                    class="cards"
                    id="dashCards">
                </div>


                <div class="panel">

                    <h3>Recent activity</h3>

                    <div id="dashActivity"></div>

                </div>

            </div>


            <div class="view" id="sub-profile">

                <div class="topbar">

                    <div>
                        <h2>My Profile</h2>

                        <div class="sub">
                            View your details and edit contact info
                        </div>
                    </div>

                    <button
                        class="btn btn-outline btn-sm"
                        onclick="toggleEditProfile()">
                        Edit
                    </button>

                </div>


                <div class="grid2">


                    <!-- PROFILE INFORMATION -->
                    <div class="panel">

                        <div class="profile-head">

                            <div
                                class="avatar"
                                id="pf_avatar">
                                ?
                            </div>

                            <div>

                                <h3 id="pf_name">
                                    —
                                </h3>

                                <div
                                    class="sub"
                                    id="pf_role">
                                    —
                                </div>

                            </div>

                        </div>


                        <div class="kv">
                            <span>Employee ID</span>
                            <span id="pf_empid">—</span>
                        </div>

                        <div class="kv">
                            <span>Email</span>
                            <span id="pf_email">—</span>
                        </div>

                        <div class="kv">
                            <span>Phone</span>
                            <span id="pf_phone_view">—</span>
                        </div>

                        <div class="kv">
                            <span>Address</span>
                            <span id="pf_addr_view">—</span>
                        </div>

                    </div>


                    <!-- JOB DETAILS -->
                    <div class="panel">

                        <h3>Job details</h3>

                        <div class="kv">
                            <span>Department</span>
                            <span id="pf_dept">General</span>
                        </div>

                        <div class="kv">
                            <span>Job title</span>
                            <span id="pf_title">Staff</span>
                        </div>

                        <div class="kv">
                            <span>Date joined</span>
                            <span id="pf_joined">—</span>
                        </div>

                        <div class="kv">
                            <span>Salary structure</span>
                            <span id="pf_salary">
                                Read-only — see Payroll
                            </span>
                        </div>

                    </div>

                </div>


                <!-- EDIT PROFILE -->
                <div
                    class="panel"
                    id="pf_editPanel"
                    style="display:none;">

                    <h3>Edit contact details</h3>

                    <div class="row2">

                        <div class="field">
                            <label>Phone</label>
                            <input id="pf_phone_edit">
                        </div>

                        <div class="field">
                            <label>Address</label>
                            <input id="pf_addr_edit">
                        </div>

                    </div>

                    <button
                        class="btn btn-primary btn-sm"
                        style="width:auto;"
                        onclick="saveProfile()">

                        Save changes

                    </button>

                </div>

            </div>


            <div class="view" id="sub-employees">

                <div class="topbar">

                    <div>
                        <h2>Employees</h2>

                        <div class="sub">
                            All registered staff
                        </div>
                    </div>

                </div>


                <div class="panel">

                    <table>

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Emp ID</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th></th>
                            </tr>

                        </thead>

                        <tbody id="employeesTable">
                        </tbody>

                    </table>

                </div>

            </div>


            <div class="view" id="sub-attendance">

                <div class="topbar">

                    <div>

                        <h2 id="att_title">
                            Attendance
                        </h2>

                        <div
                            class="sub"
                            id="att_sub">
                            Daily & weekly record
                        </div>

                    </div>

                    <div id="att_actions"></div>

                </div>


                <div
                    id="att_switcherWrap"
                    style="margin-bottom:14px;display:none;">

                    <select
                        id="employeeSwitcher"
                        onchange="renderAttendance()">
                    </select>

                </div>


                <div class="panel">

                    <h3>This week</h3>

                    <table>

                        <thead>

                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                            </tr>

                        </thead>

                        <tbody id="attendanceTable">
                        </tbody>

                    </table>

                </div>

            </div>


            <div class="view" id="sub-leave">

                <div class="topbar">

                    <div>

                        <h2 id="leave_title">
                            Leave Requests
                        </h2>

                        <div
                            class="sub"
                            id="leave_sub">
                        </div>

                    </div>


                    <button
                        class="btn btn-primary btn-sm"
                        id="applyLeaveBtn"
                        style="width:auto;"
                        onclick="toggleLeaveForm()">

                        + Apply for Leave

                    </button>

                </div>


                <!-- LEAVE FORM -->
                <div
                    class="panel"
                    id="leaveFormPanel"
                    style="display:none;">

                    <h3>New leave request</h3>


                    <div class="row2">

                        <div class="field">

                            <label>Leave type</label>

                            <select id="lv_type">

                                <option>Paid</option>
                                <option>Sick</option>
                                <option>Unpaid</option>

                            </select>

                        </div>


                        <div class="field">

                            <label>Remarks</label>

                            <input
                                id="lv_remarks"
                                placeholder="Reason (optional)">

                        </div>

                    </div>


                    <div class="row2">

                        <div class="field">

                            <label>Start date</label>

                            <input
                                type="date"
                                id="lv_start">

                        </div>


                        <div class="field">

                            <label>End date</label>

                            <input
                                type="date"
                                id="lv_end">

                        </div>

                    </div>


                    <button
                        class="btn btn-primary btn-sm"
                        style="width:auto;"
                        onclick="submitLeave()">

                        Submit request

                    </button>

                </div>


                <!-- LEAVE TABLE -->
                <div class="panel">

                    <h3 id="leave_table_title">
                        My requests
                    </h3>

                    <table>

                        <thead>

                            <tr id="leave_thead">

                                <th>Type</th>
                                <th>Dates</th>
                                <th>Remarks</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody id="leaveTable">
                        </tbody>

                    </table>

                </div>

            </div>


            <div class="view" id="sub-payroll">

                <div class="topbar">

                    <div>

                        <h2 id="pay_title">
                            Payroll
                        </h2>

                        <div
                            class="sub"
                            id="pay_sub">
                        </div>

                    </div>

                </div>


                <div
                    id="pay_employeeOnly"
                    class="panel"
                    style="display:none;">

                    <h3>Salary structure</h3>

                    <div class="kv">
                        <span>Base pay</span>
                        <span id="pay_base">—</span>
                    </div>

                    <div class="kv">
                        <span>Allowances</span>
                        <span id="pay_allow">—</span>
                    </div>

                    <div class="kv">
                        <span>Deductions</span>
                        <span id="pay_deduct">—</span>
                    </div>

                    <div class="kv">
                        <span>
                            <b>Net pay</b>
                        </span>

                        <span id="pay_net">
                            <b>—</b>
                        </span>
                    </div>

                </div>


                <div
                    id="pay_adminOnly"
                    style="display:none;">

                    <div class="panel">

                        <table>

                            <thead>

                                <tr>

                                    <th>Employee</th>
                                    <th>Base</th>
                                    <th>Allowances</th>
                                    <th>Deductions</th>
                                    <th>Net</th>
                                    <th></th>

                                </tr>

                            </thead>

                            <tbody id="payrollTable">
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            <div class="view" id="sub-reports">

                <div class="topbar">

                    <div>

                        <h2>Reports</h2>

                        <div class="sub">
                            Salary slips & attendance summaries
                        </div>

                    </div>

                </div>


                <div class="grid2">


                    <!-- ATTENDANCE REPORT -->
                    <div class="panel">

                        <h3>
                            Attendance summary (this week)
                        </h3>

                        <div id="report_att"></div>

                    </div>


                    <!-- SALARY SLIP -->
                    <div class="panel">

                        <h3>
                            Salary slip generator
                        </h3>

                        <select
                            id="report_emp"
                            style="margin-bottom:10px;">
                        </select>


                        <button
                            class="btn btn-outline btn-sm"
                            onclick="generateSlip()">

                            Generate slip

                        </button>


                        <div
                            id="report_slip"
                            style="margin-top:12px;font-size:13.5px;">

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    
  

    <script src="js/data.js"></script>
    <script src="js/nav.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/dashboard.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/employees.js"></script>
    <script src="js/attendance.js"></script>
    <script src="js/leave.js"></script>
    <script src="js/payroll.js"></script>
    <script src="js/reports.js"></script>

</body>

</html>