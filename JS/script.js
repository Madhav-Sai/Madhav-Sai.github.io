const Fulldate = new Date();
var date = Fulldate.getDate();
var month = Fulldate.getMonth()+1;
var year = Fulldate.getFullYear();
var hours = Fulldate.getHours();
var minutes = Fulldate.getMinutes();
if(minutes<10){
    minutes = "0"+minutes;
}
else{
    minutes = minutes;
}
if(month<10){
    month = "0"+month;
}
else{
    month = month;
}
if(hours<10){
    hours = "0"+hours;
}
else{
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

// Referance your Database
var contactFormDB = firebase.database().ref('contactForm');
document.getElementById('contactForm').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var userName = getElementVal('userName');
    var emailId = getElementVal('emailId');
    var message = getElementVal('message');
    

    saveMessages(userName, emailId, message, FinalDate);

    // Display Alert Message
    document.querySelector('.alert').style.display = 'block';

    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Resetting the Contact Form

    document.getElementById('contactForm').reset();
}

const saveMessages = (userName, emailId, message, finalDate) => {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        userName: userName,
        emailId: emailId,
        message: message,
        date : finalDate
    });

};

const getElementVal = (id) => {
    return document.getElementById(id).value;
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

// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
}

// Slider

var counter = 1;
function autoSlider() {
    setInterval(function () {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 5) {
            counter = 4;

            setTimeout(function () {
                counter = 3;
            }, 3000);

            setTimeout(function () {
                counter = 2;
            }, 6000);

            setTimeout(function () {
                counter = 1;
            }, 9000);

        }

    }, 3000);
}

function stopAutoSlider(value) {
    counter = 22;
    if (value == 1) {
        setTimeout(function () {
            counter = 2;
        }, 7000);
    } else if (value == 2) {
        setTimeout(function () {
            counter = 3;
        }, 7000);
    }
    else if (value == 3) {
        setTimeout(function () {
            counter = 4;
        }, 7000);
    }
    else if (value == 4) {
        setTimeout(function () {
            counter = 5;
        }, 7000);
    }
    else if (value == 5) {
        setTimeout(function () {
            counter = 1;
        }, 7000);
    }
}

window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > 550) {
    document.querySelector('.html-bar').style.animation = "htmlbar 3s ease";
    document.querySelector('.css-bar').style.animation = "cssbar 3s ease";
    document.querySelector('.js-bar').style.animation = "jsbar 3s ease";
    document.querySelector('.react-bar').style.animation = "reactbar 3s ease";
  }

}
