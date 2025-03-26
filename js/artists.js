// Handling artists endpoint data

// Formats raw API data for artists into card-compatible structure
function formatArtistsData(data) {
    return data.data.map(item => ({
        title: item.title || "Unknown Artist",
        subtitle: `${formatDate(item.birth_date)} - ${formatDate(item.death_date)}`
    }));
}

// Make function globally
window.formatArtistsData = formatArtistsData;