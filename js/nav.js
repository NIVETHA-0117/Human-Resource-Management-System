function nav(view){
  document.querySelectorAll(".view[id^='sub-']").forEach(v=>v.classList.remove("active"));
  document.getElementById("sub-"+view).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(l=>l.classList.toggle("active", l.dataset.view===view));
  const renderers = {dash:renderDashboard, profile:renderProfile, employees:renderEmployees,
    attendance:renderAttendance, leave:renderLeave, payroll:renderPayroll, reports:renderReports};
  if(renderers[view]) renderers[view]();
}

function statusPill(status){
  const map = {Pending:"pill-pending", Approved:"pill-approved", Rejected:"pill-rejected",
    Present:"pill-present", Absent:"pill-absent", "Half-day":"pill-half"};
  return `<span class="pill ${map[status]||'pill-pending'}">${status}</span>`;
}