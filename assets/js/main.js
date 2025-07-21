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
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Set up the carousel functionality
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            const tileWidth = 320; // The width of one tile + its margin
            let autoScrollActive = true;

            // --- Animation function using requestAnimationFrame ---
            const autoScroll = () => {
                // Stop the animation if the user has interacted
                if (!autoScrollActive) return;

                // If at the end, loop back to the beginning
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    carousel.scrollLeft = 0;
                } else {
                    carousel.scrollLeft += 0.5; // Adjust for scroll speed
                }

                // Request the next frame to continue the animation
                requestAnimationFrame(autoScroll);
            };

            // Function to stop auto-scrolling on user interaction
            const stopAutoScroll = () => {
                autoScrollActive = false;
            };

            // --- Event Listeners ---
            prevButton.addEventListener('click', () => {
                stopAutoScroll();
                carousel.scrollLeft -= tileWidth;
            });

            nextButton.addEventListener('click', () => {
                stopAutoScroll();
                carousel.scrollLeft += tileWidth;
            });

            // Stop auto-scrolling if the user manually interacts
            carousel.addEventListener('wheel', stopAutoScroll, { once: true });
            carousel.addEventListener('touchstart', stopAutoScroll, { once: true });

            // Start the animation
            requestAnimationFrame(autoScroll);
        }
    }).catch(error => console.error('Error loading header or footer:', error));
});

