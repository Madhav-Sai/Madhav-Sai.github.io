// Initailizing Date
const Fulldate = new Date();
var date = Fulldate.getDate();
var month = Fulldate.getMonth() + 1;
var year = Fulldate.getFullYear();
var hours = Fulldate.getHours();
var minutes = Fulldate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
else {
  minutes = minutes;
}
if (month < 10) {
  month = "0" + month;
}
else {
  month = month;
}
if (hours < 10) {
  hours = "0" + hours;
}
else {
  hours = hours;
}

var FinalDate = date + "/" + month + "/" + year + " " + hours + ":" + minutes;

// Database Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJn-2PL8hl5mU6WuAhG4s8F2YFdznYYQ4",
  authDomain: "contact-form-858c1.firebaseapp.com",
  databaseURL: "https://contact-form-858c1-default-rtdb.firebaseio.com",
  projectId: "contact-form-858c1",
  storageBucket: "contact-form-858c1.appspot.com",
  messagingSenderId: "385698108778",
  appId: "1:385698108778:web:299547909641463677c113"
};


// To Initialize Fire Base
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Retrive Data From Firebase
function RetriveData() {
  let ref = firebase.database().ref("contactForm");
  ref.on("value", gotdata);
}

function gotdata(data) {
  let contact = data.val();
  let keys = Object.keys(contact);

  let keyLength = keys.length;

  for (let i = keyLength - 1; i >= 0; i--) {
    let contactData = keys[i]
    let userName = contact[contactData].userName
    let emailId = contact[contactData].emailId
    let message = contact[contactData].message
    let date = contact[contactData].date
    let Inbox_Section = document.querySelector(".Inbox_Section");

    Inbox_Section.innerHTML += `<div class="MessageList">
          <div class="MessageListContent">
            <h2>${userName}</h2>
            <p class="MessageDetails"><span>${emailId}</span><span>${date}</span></p>
            <p class="MessageText">${message}</p>
          <div/>
    <div/>`;
  }

  
}


// contactDetails.innerHTML += `<div >
// <p><strong>Name: </strong>${userName} <br/>
// <a><strong>Email Id: </strong>${emailId}</a> <br/>
// <a><strong>Message: </strong>${message}</a> <br/>
// </p> <br/>
// <div/>`;


function login() {
  // Get all our input fields
  var EmailInput = document.getElementById("emailInput").value;
  var PasswordInput = document.getElementById("PasswordInput").value;

  // Validate input fields
  if (validate_email(EmailInput) == false || validate_password(PasswordInput) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  preloaderOpen();

  auth.signInWithEmailAndPassword(EmailInput, PasswordInput)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: EmailInput,
        last_login: FinalDate
      }

      // Push to Firebase Database
      database_ref.child('Login/' + user.uid).update(user_data)

      // Done
      // alert('Login Succeeded!!')

      

      // Display Data
      // LoggedInSuccess();

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    var InboxSection = document.getElementById("Inbox_Section");
    var LoginSection = document.getElementById("LoginSection");
    
    document.title = "My Inbox";
    LoginSection.style.display = "none";
    InboxSection.style.display = "block";
    RetriveData();
    preloaderClose();

  }
  else {
    document.title = "Login";
    // LoginSection.style.display = "block";
    // InboxSection.style.display = "none";
  }
});

function logOut() {

  var InboxSection = document.getElementById("Inbox_Section");

  window.location.reload();
  firebase.auth().signOut();
  InboxSection.innerHTML = "";
  preloaderOpen();
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}


// Display Data

// function LoggedInSuccess() {
//   var LoginSection = document.getElementById("LoginSection");
//   var InboxSection = document.getElementById("Inbox_Section");

//   LoginSection.style.display = "none";
//   InboxSection.style.display = "block";
//   // window.location.reload();
//   preloaderOpen();
//   RetriveData();
// }

// Dark Mode Control
// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
  if (darkmode.classList.contains('bx-moon')) {
    darkmode.classList.replace('bx-moon', 'bx-sun');
    document.body.classList.add('activeInbox');
  } else {
    darkmode.classList.replace('bx-sun', 'bx-moon');
    document.body.classList.remove('activeInbox');
  }
}

// Sticky Navbar
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle('active');
}
window.onscroll = () => {
  navbar.classList.remove('active');
}

function preloaderClose() {
  let preloader = document.querySelector('.lds-dual-ring_Container');
  preloader.style.display = "none";
}

function preloaderOpen() {
  let preloader = document.querySelector('.lds-dual-ring_Container');
  var LoginSection = document.getElementById("LoginSection");
  var InboxSection = document.getElementById("Inbox_Section");

  LoginSection.style.display = "none";
  InboxSection.style.display = "none";
  preloader.style.display = "flex";
}
