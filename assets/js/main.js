// /assets/js/main.js

document.addEventListener("DOMContentLoaded", function() {

    // Function to fetch and insert HTML content
    const loadHTML = (filePath, elementId) => {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for: ' + filePath);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            });
    };

    // Function to set the active navigation link
    const setActiveLink = () => {
        const navLinks = document.querySelectorAll('.site-header nav a');
        const currentPageUrl = window.location.pathname;

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Check if the link's path matches the current page's URL
            if (linkPath === currentPageUrl) {
                link.classList.add('active-link');
            }
        });
    };

    // --- All page setup logic runs here ---
    // First, load the header and footer.
    Promise.all([
        loadHTML('/assets/_header.html', 'header-placeholder'),
        loadHTML('/assets/_footer.html', 'footer-placeholder')
    ]).then(() => {
        // After the header is loaded, run the functions to make it interactive.
        setActiveLink();

        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.main-nav');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }).catch(error => console.error('Error loading header or footer:', error));
});

