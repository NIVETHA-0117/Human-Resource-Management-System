/* =========================================================
   dashboard.js — 3.2 Dashboard (Employee & Admin/HR views)
   ========================================================= */

function renderDashboard(){
  const isAdmin = currentUser.role==="admin";
  document.getElementById("dashGreeting").textContent = "Welcome back, "+currentUser.name.split(" ")[0];
  document.getElementById("dashSub").textContent = isAdmin
    ? "Here's what's happening across the org today."
    : "Here's your day at a glance.";

  const cardsEl = document.getElementById("dashCards");
  cardsEl.innerHTML = "";
  const activity = document.getElementById("dashActivity");

  if(isAdmin){
    const pendingLeave = leaveRequests.filter(l=>l.status==="Pending").length;
    const todayIso = new Date().toISOString().slice(0,10);
    const presentToday = attendance.filter(a=>a.date===todayIso && a.status==="Present").length;

    const cards = [
      {n:users.length, l:"Total employees", v:"employees"},
      {n:pendingLeave, l:"Pending leave approvals", v:"leave"},
      {n:presentToday, l:"Present today", v:"attendance"},
      {n:users.filter(u=>u.role==="employee").length, l:"Active staff", v:"employees"},
    ];
    cards.forEach(c=>cardsEl.appendChild(makeCard(c)));

    activity.innerHTML = leaveRequests.slice(-4).reverse().map(l=>{
      const u = users.find(x=>x.empId===l.empId);
      return `<div class="kv"><span>${u?u.name:l.empId} requested ${l.type} leave</span>${statusPill(l.status)}</div>`;
    }).join("") || `<div class="empty">No recent activity.</div>`;

  } else {
    const myLeave = leaveRequests.filter(l=>l.empId===currentUser.empId);
    const pending = myLeave.filter(l=>l.status==="Pending").length;
    const myAtt = attendance.filter(a=>a.empId===currentUser.empId);
    const presentCount = myAtt.filter(a=>a.status==="Present").length;

    const cards = [
      {n:"Profile", l:"View & edit details", v:"profile"},
      {n:presentCount+"/7", l:"Days present this week", v:"attendance"},
      {n:pending, l:"Pending leave requests", v:"leave"},
      {n:"View", l:"Payroll & payslip", v:"payroll"},
    ];
    cards.forEach(c=>cardsEl.appendChild(makeCard(c)));

    activity.innerHTML = myLeave.slice(-4).reverse().map(l=>
      `<div class="kv"><span>${l.type} leave (${l.start} → ${l.end})</span>${statusPill(l.status)}</div>`
    ).join("") || `<div class="empty">No recent activity. Apply for leave to see it here.</div>`;
  }
}