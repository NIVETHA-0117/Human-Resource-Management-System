let users = [
  {empId:"EMP-0001", name:"Meera Admin", email:"admin@dayflow.com", password:"Admin1234", role:"admin",
   department:"Human Resources", title:"HR Manager", phone:"9840012345", address:"Chennai, IN",
   joined:"2021-03-01", salary:{base:70000, allowances:8000, deductions:4000}},
  {empId:"EMP-1042", name:"Asha Rao", email:"asha@dayflow.com", password:"Asha1234", role:"employee",
   department:"Engineering", title:"Frontend Developer", phone:"9876543210", address:"T. Nagar, Chennai",
   joined:"2023-06-12", salary:{base:52000, allowances:6000, deductions:3200}},
];

let attendance = [];      // {empId, date, status, checkIn, checkOut}
let leaveRequests = [];   // {id, empId, type, start, end, remarks, status, comment}
let leaveIdSeq = 1;
let currentUser = null;