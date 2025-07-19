// /assets/js/main.js

document.addEventListener("DOMContentLoaded", function () {

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

        // Set up the carousel functionality
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            const tileWidth = 320; // The width of one tile + its margin
            let autoScrollInterval;

            // Function to start auto-scrolling
            const startAutoScroll = () => {
                autoScrollInterval = setInterval(() => {
                    // If scrolled to the end, loop back to the start
                    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                        carousel.scrollLeft = 0;
                    } else {
                        carousel.scrollLeft += 0.5; // Scroll by 0.5 pixels for a smooth effect
                    }
                }, 50); // Adjust timing for faster/slower scroll
            };

            // Function to stop auto-scrolling
            const stopAutoScroll = () => {
                clearInterval(autoScrollInterval);
            };

            // Click event for the "previous" button
            prevButton.addEventListener('click', () => {
                stopAutoScroll(); // Stop auto-scroll on user interaction
                carousel.scrollLeft -= tileWidth;
            });

            nextButton.addEventListener('click', () => {
                stopAutoScroll(); // Stop auto-scroll on user interaction
                carousel.scrollLeft += tileWidth;
            });

            // Stop auto-scrolling if the user manually scrolls
            carousel.addEventListener('wheel', stopAutoScroll, { once: true });
            carousel.addEventListener('touchstart', stopAutoScroll, { once: true });

            // Start the auto-scroll when the page loads
            startAutoScroll();
        }
    }).catch(error => console.error('Error loading header or footer:', error));
});

