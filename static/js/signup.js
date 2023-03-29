// //Signup
// let updatedUserEmail = '';
// let updatedPwd = '';

// const signupForm = document.getElementById('signupform');
// const signupErrorContainer = document.getElementById('signupErrorContainer');
// const signupErrorLink = 'file:///D:/IIT 2nd Year/SDGP/NEW Doctain Login/signup.html'; // hosted link to signup.html or link to signup.html directory -------------------5

// signupForm.addEventListener('submit', function(event) {
//   // Prevent the form from submitting normally
//   event.preventDefault();

//   // Get the form fields
//   const name = document.getElementById('newname').value;
//   const email = document.getElementById('newemail').value;
//   const contactno = document.getElementById('newcontactno').value;
//   const country = document.getElementById('country').value;
//   const birthdate = document.getElementById('birthdate').value;
//   const gender = document.querySelector('input[name="gender"]:checked');
//   const username = document.getElementById('newusername').value;
//   const password = document.getElementById('newpassword').value;

//   // Check if any field is empty
//   let errorMessage = '';
//   if (!name.trim()) {
//     errorMessage += 'Name is required';
//   }
//   else if (!email.trim()) {
//     errorMessage += 'Email is required';
//   }
//   else if (!contactno.trim()) {
//     errorMessage += 'Contact number is required';
//   }
//   else if (country=="") {
//     errorMessage += 'Select country';
//   }
//   else if (!birthdate) {
//     errorMessage += 'Select birthday';
//   }
//   else if (gender == null) {
//     errorMessage += 'Choose gender';
//   }
//   else if (!username.trim()) {
//     errorMessage += 'username is required';
//   }
//   else if (!password.trim()) {
//     errorMessage += 'Password is required';
//   }

//   console.log(errorMessage);

//   // If any field is empty, show the error message and send it to the error link
//   if (errorMessage) {
//     signupErrorContainer.textContent = errorMessage;
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', signupErrorLink);
//     xhr.setRequestHeader('Content-Type', 'text/plain');
//     xhr.send(errorMessage);
//   } else {
//     signupErrorContainer.textContent = 'Signup Successful!!';
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', signupErrorLink);
//     xhr.setRequestHeader('Content-Type', 'text/plain');
//     xhr.send(errorMessage);
//     updateVariable(password,email);
//   }
//   signupForm.reset();
// });

// function updateVariable(updatedPwd, updatedUserEmail) {
//   localStorage.setItem('updatedEmail', updatedUserEmail);
//   localStorage.setItem('updatedPassword', updatedPwd);
//   const inputEmail = document.getElementById('email');
//   const inputPwd = document.getElementById('password');
//   inputEmail.value = updatedUserEmail;
//   inputPwd.value = updatedPwd;
// }