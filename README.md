# 🎬 Movie Recommendation App
This is a modern web application built with React 19 and Tailwind CSS that allows users to search for movies, view trending titles, and access detailed information using data from the TMDB API and Appwrite backend.

# ✨ Features
Search for movies using keywords via TMDB.

View trending movies stored and managed using Appwrite.

Responsive UI designed with Tailwind CSS for both desktop and mobile users.

Loading states for better UX during data fetch.

Clean component structure for easy maintenance and scalability.

# 🛠️ Tech Stack
React 19

Tailwind CSS

TMDB API – Movie data

Appwrite – Backend and database

Vite – Development server and bundler

# 📦 Prerequisites
Before running the app, ensure you have the following:

Node.js (v16 or later)

npm or yarn

# 📁 Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/movie-recommendation-app.git
cd movie-recommendation-app
# 2. Install dependencies
bash
Copy
Edit
npm install
or
yarn
# 3. Configure environment variables
Create a .env.local file in the root directory and add the following:

VITE_TMDB_API_KEY=your_tmdb_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
# 4. Start the development server

npm run dev
or
yarn dev
Open http://localhost:5173 in your browser to view the app.

#🚀 Usage
On the homepage, you'll see a list of trending movies fetched from Appwrite.

Use the search bar to find any movie via the TMDB API.

Click on any movie card to view more information.

# 🖼️ Screenshots

Home Page	Search
