/* =========================================================
   reports.js — Analytics & reports dashboard
   (attendance summaries + salary slip generator, admin only)
   ========================================================= */

function renderReports(){
  const summary = users.map(u=>{
    const recs = attendance.filter(a=>a.empId===u.empId);
    const present = recs.filter(r=>r.status==="Present").length;
    const absent = recs.filter(r=>r.status==="Absent").length;
    return `<div class="kv"><span>${u.name}</span><span>${present} present · ${absent} absent</span></div>`;
  }).join("");
  document.getElementById("report_att").innerHTML = summary;
  document.getElementById("report_emp").innerHTML = users.map(u=>`<option value="${u.empId}">${u.name}</option>`).join("");
}

function generateSlip(){
  const empId = document.getElementById("report_emp").value;
  const u = users.find(x=>x.empId===empId);
  const s = u.salary;
  const net = s.base + s.allowances - s.deductions;
  document.getElementById("report_slip").innerHTML = `
    <div class="kv"><span>Employee</span><span>${u.name} (${u.empId})</span></div>
    <div class="kv"><span>Base pay</span><span>₹${s.base.toLocaleString()}</span></div>
    <div class="kv"><span>Allowances</span><span>₹${s.allowances.toLocaleString()}</span></div>
    <div class="kv"><span>Deductions</span><span>-₹${s.deductions.toLocaleString()}</span></div>
    <div class="kv"><span><b>Net pay</b></span><span><b>₹${net.toLocaleString()}</b></span></div>
  `;
}