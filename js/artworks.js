// Handling artworks endpoint data

// Formats raw API data for artworks into card-compatible structure, filtering out items without image
function formatArtworksData(data) {
    return data.data
        .filter(item => item.image_id) // Only include items with an image_id
        .map(item => ({
            title: item.title || "Untitled",
            subtitle: item.artist_display || "",
            imageUrl: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        }));
}

// Make function globally
window.formatArtworksData = formatArtworksData;