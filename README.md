  # Geo Attendance

  Geo Attendance is a role-based attendance tracking application built with React, TypeScript, Vite, and Firebase. It lets admins
  manage users, geofence settings, and attendance records, while employees can sign in, view their status, and mark attendance based
  on location.

  ## Features

  - Email/password authentication with Firebase Auth
  - Role-based access for admin and employee users
  - Geofence-based attendance tracking
  - Admin dashboard for managing users and attendance
  - Employee dashboard with live location and attendance status
  - Firestore-backed user and attendance data
  - Responsive UI built with React and Tailwind CSS
  - Leaflet map integration for location and geofence views

  ## Tech Stack

  - React 19
  - TypeScript
  - Vite
  - Firebase Auth
  - Cloud Firestore
  - React Router
  - Leaflet / React Leaflet
  - Tailwind CSS

  ## Project Structure

  text
  src/
    components/    shared UI components and layout
    pages/         login, signup, admin, and employee pages
    styles/        global and page-specific styles
    firebase.ts    Firebase initialization
    main.tsx       app entry point

  ## Prerequisites

  - Node.js 18 or later
  - npm
  - A Firebase project with:
      - Authentication enabled
      - Firestore enabled

  ## Setup

  1. Clone the repository:

  git clone https://github.com/YOUR_USERNAME/geo-attendance.git
  cd geo-attendance

  2. Install dependencies:

  npm install

  3. Make sure Firebase configuration in src/firebase.ts matches your Firebase project.
  4. Start the development server:

  npm run dev

  5. Build for production:

  npm run build

  6. Preview the production build locally:

  npm run preview

  ## Firebase Configuration

  This project uses Firebase Auth and Firestore. The current Firebase configuration is defined in src/firebase.ts.

  Make sure the following are correctly set in your Firebase Console:

  - Authentication sign-in method
  - Firestore database
  - Firestore security rules
  - Authorized domains


  ## Available Scripts

  - npm run dev - start the Vite dev server
  - npm run build - type-check and build the app
  - npm run lint - run ESLint
  - npm run preview - preview the production build
