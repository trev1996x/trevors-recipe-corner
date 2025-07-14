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
        loadHTML('assets/_header.html', 'header-placeholder'),
        loadHTML('assets/_footer.html', 'footer-placeholder')
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