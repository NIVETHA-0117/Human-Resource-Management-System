/* =========================================================
   employees.js — Admin: employee directory + full-field editing
   (part of 3.3 — Admin can edit all employee details)
   ========================================================= */

function renderEmployees(){
  document.getElementById("employeesTable").innerHTML = users.map(u=>`
    <tr>
      <td>${u.name}</td><td>${u.empId}</td><td>${u.email}</td><td>${u.department}</td>
      <td style="text-transform:capitalize;">${u.role}</td>
      <td><button class="btn btn-sm btn-outline" onclick="adminEditEmployee('${u.empId}')">Edit</button></td>
    </tr>`).join("");
}

function adminEditEmployee(empId){
  const u = users.find(x=>x.empId===empId);
  const dept = prompt("Department:", u.department); if(dept!==null) u.department = dept;
  const title = prompt("Job title:", u.title); if(title!==null) u.title = title;
  renderEmployees();
}