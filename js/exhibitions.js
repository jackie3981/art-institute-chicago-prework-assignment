// Handling exhibitions endpoint data

// Formats raw API data for exhibitions into card-compatible structure
function formatExhibitionsData(data) {
    return data.data.map(item => ({
        title: item.title || "Untitled Exhibition",
        subtitle: `${formatDate(item.aic_start_at)} - ${formatDate(item.aic_end_at)}`
    }));
}

// Make function globally
window.formatExhibitionsData = formatExhibitionsData;