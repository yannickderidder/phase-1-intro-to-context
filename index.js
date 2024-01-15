// Your code here

function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(time, 10),
      date: date,
    });

    return employee;
  }
  function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(time, 10),
      date: date,
    });

    return employee;
  }
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => totalPay + allWagesFor(employee), 0);
  }
