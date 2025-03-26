document.addEventListener("DOMContentLoaded", function () {
    // Check if breadcrumb is enabled in settings
    if (ENABLE_BREADCRUMB) {
        const breadcrumbArea = document.getElementById("breadcrumb-area");

        // Function to update breadcrumb based on section and page
        function updateBreadcrumb(section, page = null) {
            // Create breadcrumb structure based on section and page
            let breadcrumbHTML = `
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="loadContent('content/home.html')">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${section}${page ? ` > Page ${page}` : ""}</li>
                    </ol>
                </nav>
            `;
            breadcrumbArea.innerHTML = breadcrumbHTML;
        }

        // Initial breadcrumb (default to Home)
        updateBreadcrumb("Home");

        // Expose function globally
        window.updateBreadcrumb = updateBreadcrumb;
    }
});