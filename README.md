# Movies

- What
- How
- ?

## Todo

- []
- []
- []
- []
- []

## Timeplan

- Wednesday 16/12
  --- 09:00 – Quick sync
  --- 13:00 – Continue working

# Movie App (React Router + TMDB)

A responsive multi-page React application built with **React Router** and the **TMDB (The Movie Database) API**.  
The app fetches a list of popular movies, lets users open a movie detail page, and navigate further via genres and production companies.

## Features

- **Home page**: Fetches and displays popular movies from TMDB
- **Movie details page**: Dynamic route (`/movies/:id`) with movie information, backdrop/poster images and rating
- **Genre page**: Dynamic route (`/genres/:genreId`) showing movies within a selected genre
- **Company page**: Dynamic route (`/companies/:companyId`) showing movies from a selected production company
- **Not Found (404)**: Fallback route for invalid paths and invalid movie IDs
- **Loading & error states** for API requests
- **Accessible UI** (alt text on images, focusable links/buttons, readable contrast)

## Tech Stack

- React + Vite
- React Router
- Tailwind CSS
- TMDB API

## Routes

- `/` — Home (popular movies slider)
- `/movies/:id` — Movie details
- `/genres/:genreId` — Movies by genre
- `/companies/:companyId` — Movies by production company
- `*` — Not Found

## API Endpoints Used

- Popular movies: `GET /movie/popular`
- Movie details: `GET /movie/{movie_id}`
- Genre list: `GET /genre/movie/list`
- Discover by genre: `GET /discover/movie?with_genres={genreId}`
- Company details: `GET /company/{companyId}`
- Discover by company: `GET /discover/movie?with_companies={companyId}`

Images are rendered using TMDB’s image base URL and size presets, for example:

- Posters: `https://image.tmdb.org/t/p/w342{poster_path}`
- Backdrops: `https://image.tmdb.org/t/p/w1280{backdrop_path}` (responsive sizes used in the app)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
