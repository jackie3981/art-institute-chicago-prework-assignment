document.addEventListener("DOMContentLoaded", function () {
    // Store pages in memory and temporary buffer
    let cachedPages = {};
    let tempBuffer = []; // Temporary array for 24 valid items
    let currentEndpoint = "home";
    let currentPage = 1; // Display page for the user
    let currentApiPage = 1; // API page tracker
    let totalPages = 1; // Placeholder, not shown to user

    // Load API content for an endpoint and page
    async function loadApiContent(endpoint, pageNumber, linkElement) {
        const contentArea = document.getElementById("content-area");
        contentArea.innerHTML = `<p class="loading">${LOADING_MESSAGE}</p>`;
        currentEndpoint = endpoint;
        currentPage = pageNumber;

        const navLink = document.querySelector(`.nav-link[onclick*="loadApiContent('${endpoint}'"]`) || linkElement;
        setActiveLink(navLink);

        if (endpoint === "artworks") {
            // Existing artworks logic with buffer
            if (pageNumber === 1 && tempBuffer.length === 0) {
                await preloadInitialBuffer(endpoint);
            }
            let itemsToDisplay = [];
            if (tempBuffer.length >= ITEMS_PER_PAGE) {
                itemsToDisplay = tempBuffer.splice(0, ITEMS_PER_PAGE);
            } else {
                const fetchResult = await fetchPage(endpoint, currentApiPage++);
                itemsToDisplay = fetchResult.filter(item => item.image_id);
                tempBuffer = tempBuffer.concat(itemsToDisplay.slice(ITEMS_PER_PAGE));
                itemsToDisplay = itemsToDisplay.slice(0, ITEMS_PER_PAGE);
                if (itemsToDisplay.length < ITEMS_PER_PAGE) {
                    const needed = ITEMS_PER_PAGE - itemsToDisplay.length;
                    itemsToDisplay = itemsToDisplay.concat(tempBuffer.splice(0, needed));
                }
                while (itemsToDisplay.length < ITEMS_PER_PAGE) {
                    const extraFetch = await fetchPage(endpoint, currentApiPage++);
                    const extraItems = extraFetch.filter(item => item.image_id);
                    tempBuffer = tempBuffer.concat(extraItems);
                    itemsToDisplay = itemsToDisplay.concat(tempBuffer.splice(0, ITEMS_PER_PAGE - itemsToDisplay.length));
                }
            }
            displayContent({ data: itemsToDisplay }, endpoint, pageNumber);
            if (tempBuffer.length < 12) {
                preloadBuffer(endpoint);
            }
        } else {
            // Simplified logic for artists and exhibitions with limit=12 for page 1
            const limit = pageNumber === 1 ? 12 : RESULTS_LIMIT;
            const fetchResult = await fetchPage(endpoint, pageNumber, limit);
            const itemsToDisplay = fetchResult.slice(0, ITEMS_PER_PAGE);
            displayContent({ data: itemsToDisplay }, endpoint, pageNumber);
            if (pageNumber === 1) {
                for (let i = 2; i <= 3; i++) {
                    preloadPage(endpoint, i);
                }
            }
        }
    }

    // Fetch initial 24 items
    async function preloadInitialBuffer(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}?page=1&limit=24`);
        const data = await response.json();
        currentApiPage = 3; // Next page after 1-2
        tempBuffer = data.data.filter(item => item.image_id); // Fill buffer with valid items
        totalPages = Math.ceil(data.pagination.total / ITEMS_PER_PAGE); // Update total pages
    }

    // Fetch a single page
    async function fetchPage(endpoint, page, limit = RESULTS_LIMIT) {
        const response = await fetch(`${API_URL}${endpoint}?page=${page}&limit=${limit}`);
        return (await response.json()).data;
    }

    // Refill buffer in background
    function preloadBuffer(endpoint) {
        fetchPage(endpoint, currentApiPage++).then(data => {
            const validItems = data.filter(item => item.image_id);
            tempBuffer = tempBuffer.concat(validItems);
            if (tempBuffer.length < 12) preloadBuffer(endpoint); // Keep filling if still below 12
        }).catch(error => console.error("Error refilling buffer:", error));
    }

    function preloadPage(endpoint, page) {
        fetchPage(endpoint, page).then(data => {
            cachedPages[`${endpoint}-${page}`] = data;
        }).catch(error => console.error(`Error preloading ${endpoint} page ${page}:`, error));
    }

    // Display content
    function displayContent(data, endpoint, pageNumber) {
        const contentArea = document.getElementById("content-area");
        let items;
        if (endpoint === "artworks") {
            items = formatArtworksData(data);
        } else if (endpoint === "artists") {
            items = formatArtistsData(data);
        } else if (endpoint === "exhibitions") {
            items = formatExhibitionsData(data);
        }
        contentArea.innerHTML = createGrid(items) + createPagination(pageNumber, totalPages);
        if (ENABLE_BREADCRUMB && window.updateBreadcrumb) {
            window.updateBreadcrumb(endpoint.charAt(0).toUpperCase() + endpoint.slice(1), pageNumber);
        }
    }

    // Load static content (for Home)
    function loadContent(page, linkElement) {
        const contentArea = document.getElementById("content-area");
        contentArea.innerHTML = `<p class="loading">${LOADING_MESSAGE}</p>`;
        currentEndpoint = "home";
        setActiveLink(linkElement);

        fetch(page)
            .then(response => {
                if (!response.ok) throw new Error("Content not found");
                return response.text();
            })
            .then(data => {
                contentArea.innerHTML = data;
                if (ENABLE_BREADCRUMB && window.updateBreadcrumb) {
                    window.updateBreadcrumb("Home");
                }
            })
            .catch(error => {
                contentArea.innerHTML = `<p class="error">${ERROR_MESSAGE}</p>`;
                console.error("Error loading content:", error);
            });
    }

    // Load a specific page
    function loadPage(pageNumber) {
        loadApiContent(currentEndpoint, pageNumber);
    }

    // Initial load (Home)
    loadContent('content/home.html');

    // Make function globally
    window.loadContent = loadContent;
    window.loadApiContent = loadApiContent;
    window.loadPage = loadPage;
});