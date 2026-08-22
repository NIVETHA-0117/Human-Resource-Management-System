function checkInOut(empId){
  const today = new Date().toISOString().slice(0,10);
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  let rec = attendance.find(a=>a.empId===empId && a.date===today);
  if(!rec) attendance.push({empId, date:today, status:"Present", checkIn:now, checkOut:"-"});
  else if(rec.checkOut==="-") rec.checkOut = now;
}