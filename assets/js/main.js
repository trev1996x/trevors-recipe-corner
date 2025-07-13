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

    // Corrected paths starting from the root (/)
    loadHTML('/assets/_header.html', 'header-placeholder');
    loadHTML('/assets/_footer.html', 'footer-placeholder');
});