let userEmail = "";
let pwd = "";
let url = "";

let admin = document.querySelector('.admin');
let patient = document.querySelector('.patient');

admin.onclick = function () {
    admin.classList.toggle('active');
    patient.classList.remove('active');
    userEmail = "doctainadmin2023@gmail.com";
    pwd = "admin123";
    url = "/admin";//url to admin ----------1
}

patient.onclick = function () {
    patient.classList.toggle('active');
    admin.classList.remove('active');
    userEmail = "doctainpatient@gmail.com";
    pwd = "user123";
    url = '/home'
    if(localStorage.getItem('updatedEmail')) {
      pwd = localStorage.getItem('updatedPassword');
      userEmail = localStorage.getItem('updatedEmail');
      url = "#";//url to new user-------------------3
    }
    console.log(userEmail);
}

function checkLogin(inputEmail, inputPwd) {
    if (inputEmail === userEmail && inputPwd === pwd) {
      return true;
    } else {
      return false;
    }
}

function redirectToPage(newUrl) {
    window.location.href = newUrl;
    return false;
}

const loginForm = document.getElementById("loginform");
const errorContainer = document.getElementById('errorContainer');
const errorLink = 'file:///D:/Users/sasan/Documents/UCSC/web%20designing/Dasun_Web/New folder/login.html';// hosted link to login.html or link to login.html directory-------------------4

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const inputEmail = document.getElementById("email").value;
  const inputPwd = document.getElementById("password").value;
  console.log(inputEmail);
  console.log(inputPwd);


  let errorMessage = '';
  if (!(admin.classList.contains('active') || patient.classList.contains('active'))) {
    errorMessage += 'Select Admin or Patient';
  }
  else if (!inputEmail.trim()) {
    errorMessage += 'Email is required';
  }
  else if (!inputPwd.trim()) {
    errorMessage += 'Password is required';
  }

  //If any field is empty, show the error message and send it to the error link
  if (errorMessage) {
    errorContainer.textContent = errorMessage;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', errorLink);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(errorMessage);
  }
  //if all fields filled check if email and password match and log patient in
  else if (checkLogin(inputEmail, inputPwd)) {
    errorContainer.textContent = '';
    console.log("Login successful!");
    redirectToPage(url);
  }
  //if email password mismatch display error
  else {
    errorContainer.textContent = 'Incorrect Email or passowrd';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', errorLink);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(errorMessage);
  console.log("Incorrect Email or passowrd");
  }
  
  loginForm.reset();
});



