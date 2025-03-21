## Overview
This project is a full-stack web application for listing and exploring premium properties with two user types: **Customers** and **Admins**. Customers can view properties, add them to favorites, and explore listings. Admins can perform CRUD operations (Create, Read, Update, Delete) on properties through a secure dashboard, with changes reflected in real-time.
## Live Demo

## **Credentials**

For testing purposes, you can use the following credentials:

### Customer:
- Username: `customer`
- Password: `password`

### Admin:
- Username: `admin`
- Password: `password`
---
## Tech Stack

### Frontend
- **React.js**: Used for building the user interface.
- **React-Bootstrap**: Provides responsive styling components.
- **Framer Motion**: Adds animations to enhance user experience.
- **React-Router-DOM**: Handles routing between pages.

### Backend
- **Flask (Python)**: Serves as the backend API framework.
- **Flask-CORS**: Enables cross-origin requests between frontend and backend.
- **Flask-Login**: Handles user authentication and session management.
- **Flask-Bcrypt**: Used for hashing passwords securely.

### Data Storage
- **SQLite**: Relational database for storing property and user data.

### Deployment
- **Backend**: Hosted on Render
- **Frontend**: Hosted on Netlify

## Features

### Customer Features
1. View property listings with detailed information.
2. Search properties by name or location.
3. Filter properties by price range using a slider.
4. Add properties to favorites for easy access later.

### Admin Features
1. Access a secure dashboard to manage properties.
2. Add new properties via an elegant form.
3. Edit existing property details.
4. Delete properties from the system.
5. Real-time updates: Changes made by admin are immediately visible to users after refreshing.

### Authentication
1. Login functionality for both customers and admins.
2. Signup functionality to create new accounts.

### **Authentication**
1. Login functionality for both customers and admins.
2. Signup functionality to create new accounts.

---



---
## **Live Link**
https://property-listing-frontend.netlify.app/

## **Installation Instructions**

Follow these steps to set up the project locally:

### Prerequisites
Ensure you have the following installed:
1. Node.js (for running the frontend)
2. Python (for running the backend)
3. npm or yarn (for managing frontend dependencies)

---

### Backend Setup

1. Clone the repository:
git clone https://github.com/avii2/PropertyListingSite.git
cd PropertyListingSite/backend

2. Create a virtual environment:
python3 -m venv venv
source venv/bin/activate # On Windows use venv\Scripts\activate

3. Install backend dependencies:
pip install flask flask-cors flask-login flask-bcrypt

4. Run the backend server:
python app.py

5. Verify that the backend is running at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the property-listing-app directory:
cd ./property-listing-app

2. Install frontend dependencies:
npm install

3. Start the frontend server:

4. Open your browser and navigate to `http://localhost:3000`.

---

## **Application Flow**

### Landing Page:
The landing page serves as the entry point to the application, allowing users to:
1. Explore as a customer (redirects to customer login).
2. Join as a dealer/admin (redirects to admin login).

### Customer Flow:
1. After logging in, customers are redirected to the property listing page.
2. Customers can search for properties by name or location.
3. They can filter properties by price range using a slider.
4. Clicking "View Details" opens a modal with detailed information about the property.
5. Customers can add properties to their favorites for future reference.

### Admin Flow:
1. After logging in, admins are redirected to their dashboard.
2. The dashboard displays stats like total properties, total users, etc.
3. Admins can add new properties through an elegant form that collects all necessary details (e.g., name, price, location).
4. Admins can edit or delete existing properties directly from the dashboard.

---


## **API Endpoints**

### Backend API Routes

## API Endpoints

### Properties

#### Get All Properties
- **Endpoint**: `/api/properties`
- **Method**: GET
- **Description**: Fetches all properties. If a property's image_url is missing or contains "random", a fallback image URL is used.

#### Get Specific Property
- **Endpoint**: `/api/properties/<int:id>`
- **Method**: GET
- **Description**: Fetches details of a specific property by ID. If the property's image_url is missing or contains "random", a fallback image URL is used.

#### Create New Property
- **Endpoint**: `/api/properties`
- **Method**: POST
- **Description**: Creates a new property. Requires fields: name, price, location, bedrooms, bathrooms. Uses a fallback image URL if image_url is not provided.

#### Update Property
- **Endpoint**: `/api/properties/<int:id>`
- **Method**: PUT
- **Description**: Updates an existing property by ID. Updates fields: name, price, location, bedrooms, bathrooms, image_url. Uses a fallback image URL if image_url is not provided.

#### Delete Property
- **Endpoint**: `/api/properties/<int:id>`
- **Method**: DELETE
- **Description**: Deletes a property by ID. Returns a 404 error if the property is not found.

### Notes
- The API uses SQLite as the database.
- CORS is enabled for cross-origin requests.
- A fallback image URL is used when property images are missing or invalid.
- The server runs on port 5001 and is accessible from any IP address (0.0.0.0).


#### Authentication:
1. `POST /api/login`: Log in as customer or admin.
2. `POST /api/logout`: Log out from the session.

#### Favorites:
1. `POST /api/favorites`: Add a property to favorites (Customer only).

---



## **Future Improvements**

1. Integrate a database (e.g., SQLite or MongoDB) for better scalability and data management.
2. Add user authentication with JWT tokens for enhanced security.
3. Implement pagination for large datasets in property listings.
4. Enhance mobile responsiveness further.

---

## **Contact**

For any queries or issues, feel free to reach out at [anilkumarbarupal.01@gmail.com](mailto:anilkumarbarupal.01@gmail.com).

--- 
