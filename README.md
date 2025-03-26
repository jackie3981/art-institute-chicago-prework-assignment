# Art Institute of Chicago Prework Assignment

## Overview
This project is an educational showcase of the Art Institute of Chicago's collection, built as a prework assignment. It uses the public API from `https://api.artic.edu/api/v1/` to display data from three endpoints: `artworks`, `artists`, and `exhibitions`.

This is a simplified version of the Art Institute's offerings. For the full experience, visit [www.artic.edu](https://www.artic.edu).

## Features
- Home Page: A welcome message introducing the project and linking to the official site.
- Artworks: Displays a grid of artwork cards with titles, artists, and images. Clicking an image opens a modal with a larger view (1686px resolution).
- Artists: Shows a list of artists with their names and key details.
- Exhibitions: Presents exhibition titles and descriptions in a card layout.
- Navigation: A navbar allows seamless switching between sections, issuing new API requests for each endpoint.
- Styling: Uses Bootstrap for layout and custom CSS (`styles.css`) for readable fonts, contrasting colors, and hover effects.

## Project Structure
- `index.html`: Main HTML file for the site.
- `css/styles.css`: Custom styles for layout, typography, and visual effects.
- `js/`: JavaScript files handling API calls and UI:
  - `app.js`: Core logic for navigation and content loading.
  - `utils.js`: Helper functions for grid and pagination rendering.
  - `artworks.js`: Formats and displays artwork data with modal support.
  - `artists.js`: Formats artist data.
  - `exhibitions.js`: Formats exhibition data.
  - `settings.js`: API configuration and constants.
  - `breadcrumb.js`: Breadcrumb navigation (can turn it off, is optional).
- `content/home.html`: Static content for the home page.

## How to Run
1. **Clone the Repository**:
   - Use `git clone https://github.com/jackie3981/art-institute-chicago-prework-assignment.git` in your terminal, or download the ZIP from GitHub.
2. **Open the Project**:
   - Navigate to the project folder and open `index.html` in a web browser.
   - For best results, use a local server (e.g., VS Code's Live Server extension) to avoid CORS issues with file-based loading, or if you have node installed, you can use `npx serve` too
3. **Explore**:
   - Click "Home", "Artworks", "Artists", or "Exhibitions" in the navbar to view the content.
   - In "Artworks", click an image to see it in the modal (large view).
     
Note: Opening `index.html` directly by double-clicking may fail due to CORS restrictions in some browsers, preventing the "Home" page from loading. To ensure full functionality, use a local server as described above (e.g., Live Server or `npx serve`).

## Technical Details
- API: Data is fetched from `https://api.artic.edu/api/v1/` with endpoints:
  - `/artworks?page=X&limit=12`
  - `/artists?page=X&limit=12`
  - `/exhibitions?page=X&limit=12`
- Optimization: 
  - `artworks` uses a buffer to preload 24 items initially.
  - `artists` and `exhibitions` preload pages 2-3 for faster navigation.
- Dependencies: Bootstrap 5.3.0 for layout and modal functionality (loaded via CDN).
- Accessibility Note: An occasional console warning about `aria-hidden` on the modal may appear when using keyboard navigation. This does not affect functionality.

## Purpose
This project meets the prework assignment requirements:
- Structure: Public GitHub repo, HTML, CSS, JS, and README.
- Content: Displays 3 API endpoints with navigation and fresh GET requests.
- Functionality: Runs smoothly, readable code, thoughtful styling, no critical errors.

For feedback or the full Art Institute experience, visit [www.artic.edu](https://www.artic.edu).

## Author
- Yoicel Rodriguez (GitHub: [jackie3981](https://github.com/jackie3981))
