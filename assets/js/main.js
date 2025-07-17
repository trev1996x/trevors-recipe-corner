// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAINk6KXEIpRc-xkGJtseTLGb5LfMQfnNU",
  authDomain: "trevors-recipe-app.firebaseapp.com",
  projectId: "trevors-recipe-app",
  storageBucket: "trevors-recipe-app.firebasestorage.app",
  messagingSenderId: "287120956802",
  appId: "1:287120956802:web:b4089373b9181a1828439b",
  measurementId: "G-Z7PW9J7ZVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// /assets/js/main.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadHTML = (filePath, elementId) => {
        return fetch(filePath) // Return the fetch promise
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
    };

    // Function to set the active navigation link
    const setActiveLink = () => {
        const navLinks = document.querySelectorAll('.site-header nav a');
        const currentPageUrl = window.location.pathname;

        navLinks.forEach(link => {
            // Check if the link's href matches the current page's URL
            if (link.getAttribute('href') === currentPageUrl) {
                link.classList.add('active-link');
            }
        });
    };

    // Load header and footer, then set up menu
    Promise.all([
        loadHTML('/assets/_header.html', 'header-placeholder'),
        loadHTML('/assets/_footer.html', 'footer-placeholder')
    ]).then(() => {
        // --- NEW --- Hamburger Menu Logic
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.main-nav');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        // --- END NEW ---
    });
});


// Check if we are on the login page
if (document.getElementById('login-form')) {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login successful, redirect to a new admin page
                window.location.href = '/admin.html';
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });
}