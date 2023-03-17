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

function submitForm(e){
    e.preventDefault();

    var userName = getElementVal('userName');
    var emailId = getElementVal('emailId');
    var message = getElementVal('message');

    saveMessages(userName,emailId,message);

    // Display Alert Message
    document.querySelector('.alert').style.display = 'block';

    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Resetting the Contact Form

    document.getElementById('contactForm').reset();
}

const saveMessages = (userName,emailId,message) => {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        userName: userName,
        emailId: emailId,
        message: message,
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
        if(darkmode.classList.contains('bx-moon')){
            darkmode.classList.replace('bx-moon','bx-sun');
            document.body.classList.add('active');
        }else{
            darkmode.classList.replace('bx-sun','bx-moon');
            document.body.classList.remove('active');
        }
    }
    
  // Slider
    function slideBack(){
       alert("Sorry! Feature is not available in this version of youe Browser. Please try again after Updating your Browser.")
    }
