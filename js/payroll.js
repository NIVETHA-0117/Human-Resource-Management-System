function renderPayroll(){
  if(currentUser.role !== "admin"){
    const s = currentUser.salary;
    // show read-only net = base + allowances - deductions
  } else {
    // admin can edit any employee's base/allowances/deductions
  }
}