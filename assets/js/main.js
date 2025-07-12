document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadHTML = (filePath, elementId) => {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
    };

    // Load header and footer
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
});