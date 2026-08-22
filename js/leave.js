function submitLeave(){
  const type = document.getElementById("lv_type").value;
  const start = document.getElementById("lv_start").value;
  const end = document.getElementById("lv_end").value;
  leaveRequests.push({id:leaveIdSeq++, empId:currentUser.empId, type, start, end, status:"Pending"});
}

function actOnLeave(id, decision){ // "Approved" or "Rejected"
  const l = leaveRequests.find(x=>x.id===id);
  l.status = decision;
}