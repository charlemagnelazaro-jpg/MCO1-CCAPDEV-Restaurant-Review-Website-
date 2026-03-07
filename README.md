# Restaurant Review Website

## Overview

This is a full-stack web application designed for users to explore restaurants, leave reviews, and interact with other users' feedback. The application provides a seamless experience for finding dining options and sharing culinary experiences around the DLSU Campus in Manila. It is built using the MERN stack (MongoDB, Express.js, React, Node.js) and integrates Cloudinary for handling media uploads.

## Features

- **Restaurant Exploration**: Browse through a variety of restaurants and view their details.
- **User Authentication**: Secure user registration and login system with encrypted passwords and session management.
- **User Profiles**: Fully customizable user profiles supporting profile photo uploads, bio, and location details.
- **Review System**: Users can write reviews for restaurants and share their dining experiences.
- **Upvote Mechanics**: An interactive system allowing users to upvote helpful reviews from others.
- **Responsive Interface**: A modern, mobile-friendly frontend built with React, Vite, TailwindCSS, and Shadcn UI.
- **Media Uploads**: Cloud-based image storage for profile photos and content using Cloudinary.

## Prerequisites

Before running the project locally, ensure you have the following installed:
- Node.js
- MongoDB (running locally or a cloud instance)
- A Cloudinary account (for image uploads)

## How to Run It

1. **Clone the repository** (if you haven't already).

2. **Set up environment variables**
   Create a `.env` file in the root directory of the project and provide the necessary configuration values:

   ```env
   MONGODB_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   PORT=3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Install Dependencies**
   You will need to install the Node modules for both the client and the server.

   For the client:
   ```bash
   cd client
   npm install
   ```

   For the server:
   ```bash
   cd server
   npm install
   ```

4. **Run the Development Servers**
   To start the application, you need to run both the client and server concurrently in two separate terminal windows.

   **Terminal 1 (Start the Client):**
   ```bash
   cd client
   npm run dev
   ```

   **Terminal 2 (Start the Server):**
   ```bash
   cd server
   npm run dev
   ```

5. **Access the Application**
   Once both servers are running successfully, open your browser and navigate to the local development URL provided by the Vite client (typically `http://localhost:5173`).
