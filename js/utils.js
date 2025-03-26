// Utility functions for the project

function createCard(data) {
    const title = data.title || "Untitled";
    const subtitle = data.subtitle || "";
    const imageUrl = data.imageUrl || "";

    // Escape special characters safely for title and subtitle
    const escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
    const escapedSubtitle = subtitle.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ');
    let cardHTML = `
        <div class="card h-100">
            ${imageUrl ? `<img src="${imageUrl}" class="card-img-top" alt="${escapedTitle}" onclick="showArtworkModal('${imageUrl.replace('/full/843,/0/default.jpg', '/full/1686,/0/default.jpg')}', '${escapedTitle}', '${escapedSubtitle}')">` : ""}
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                ${subtitle ? `<p class="card-text">${subtitle}</p>` : ""}
            </div>
        </div>
    `;
    return cardHTML;
}

// Create a grid of cards
function createGrid(items) {
    let gridHTML = '<div class="row g-3">';
    items.forEach(item => {
        gridHTML += `
            <div class="col-${12 / GRID_COLUMNS}">
                ${createCard(item)}
            </div>
        `;
    });
    gridHTML += '</div>';
    return gridHTML;
}

// Create pagination
function createPagination(currentPage, totalPages) {
    let paginationHTML = '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';

    // First button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadPage(1)">First</a>
        </li>
    `;

    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadPage(${currentPage - 1})">Prev</a>
        </li>
    `;

    // Page numbers
    const startPage = Math.max(1, currentPage - Math.floor(PAGINATION_RANGE / 2));
    const endPage = Math.min(startPage + PAGINATION_RANGE - 1, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="loadPage(${i})">${i}</a>
            </li>
        `;
    }

    // Next button
    paginationHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onclick="loadPage(${currentPage + 1})">Next</a>
        </li>
    `;

    paginationHTML += '</ul></nav>';
    return paginationHTML;
}

// Convert date string to locale date format
function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });
}

function setActiveLink(linkElement) {
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    if (linkElement) linkElement.classList.add("active");
}

// Show the artwork modal with large image
function showArtworkModal(imageUrl, title, subtitle) {
    console.log(`Clicked image - URL: ${imageUrl}, Title: ${title}, Subtitle: ${subtitle}`);
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalLoading = document.getElementById("modalLoading");

    // Reset modal state
    modalImage.style.display = "none";
    modalLoading.style.display = "block";
    modalImage.src = ""; // Clear previous image

    // Set title and subtitle
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;

    // Load large image with fallback
    modalImage.onload = () => {
        modalLoading.style.display = "none";
        modalImage.style.display = "block";
    };
    modalImage.onerror = () => {
        // On error (e.g., 403), try full/full instead
        modalImage.src = imageUrl.replace('/full/1686,/0/default.jpg', '/full/full/0/default.jpg');
        modalImage.onerror = () => {
            modalLoading.style.display = "none";
            modalImage.style.display = "none";
            modalTitle.textContent = "Error loading image";
        };
    };
    modalImage.src = imageUrl;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("artworkModal"));
    modal.show();
}