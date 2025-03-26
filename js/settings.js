// Global configuration settings for the project
const API_URL = "https://api.artic.edu/api/v1/"; // Base URL for Art Institute API
const RESULTS_LIMIT = 12; // Default limit for API results per page
const LOADING_MESSAGE = "Loading data..."; // Message shown while fetching data
const ERROR_MESSAGE = "Oops, something went wrong!"; // Message shown on fetch error
const DEFAULT_ENDPOINTS = ["artworks", "artists", "exhibitions"]; // API endpoints for navigation
const ENABLE_BREADCRUMB = true; // Toggle breadcrumb visibility (true = show, false = hide)
// ITEMS_PER_PAGE and GRID_COLUMNS define the grid layout. 
// Example: ITEMS_PER_PAGE=12 and GRID_COLUMNS=4 means 3 rows of 4 items each.
const ITEMS_PER_PAGE = 12; // Number of items to display per page
const GRID_COLUMNS = 4; // Number of columns in the grid (ITEMS_PER_PAGE / GRID_COLUMNS = rows)
const PAGINATION_RANGE = 5; // Number of visible page numbers in pagination

