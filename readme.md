# Property Listing Site

## Overview
This project is a full-stack web application for listing and exploring premium properties with two user types: **Customers** and **Admins**.

- **Customers** can view properties, search listings, filter by price, and add properties to favorites.
- **Admins** can perform CRUD operations (**Create, Read, Update, Delete**) on properties through a secure dashboard.

The platform is designed to provide a smooth property browsing experience for users and an efficient management system for admins.

---

## Working Demonstration
https://www.youtube.com/watch?v=2PN9gWRpjoI

---

## Live Site Link
https://property-listing-frontend.netlify.app/

---

## Credentials

For testing purposes, you can use the following credentials:

### Customer
- **Username:** `customer`
- **Password:** `password`

### Admin
- **Username:** `admin`
- **Password:** `password`

---

## Tech Stack

### Frontend
- **React.js**

### Backend
- **Python**
- **FastAPI**

### Data Storage
- **SQLite** – Relational database for storing property and user data.

### Deployment
- **Backend** – Hosted on Render
- **Frontend** – Hosted on Netlify

---

## Features

### Customer Features
1. View property listings with detailed information.
2. Search properties by name or location.
3. Filter properties by price range using a slider.
4. Add properties to favorites for easy access later.

### Admin Features
1. Access a secure dashboard to manage properties.
2. Add new properties through a form.
3. Edit existing property details.
4. Delete properties from the system.
5. View updates reflected in real time after refresh.

### Authentication Features
1. Login functionality for both customers and admins.
2. Signup functionality to create new accounts.

---

## Installation Instructions

Follow these steps to set up the project locally.

### Prerequisites
Make sure the following are installed:

1. **Node.js** and **npm**
2. **Python 3**
3. **pip**

---

## Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/avii2/PropertyListingSite.git
cd PropertyListingSite/backend
Create a virtual environment:

python3 -m venv venv
source venv/bin/activate

For Windows:

venv\Scripts\activate

Install backend dependencies:

pip install fastapi uvicorn sqlalchemy

Run the backend server:

uvicorn main:app --reload

Verify that the backend is running at:

http://localhost:8000

If your FastAPI entry file is not main.py, update the command accordingly.

Frontend Setup

Navigate to the frontend directory:

cd ../property-listing-app

Install frontend dependencies:

npm install

Start the frontend server:

npm start

Open your browser and visit:

http://localhost:3000
Application Flow
Landing Page

The landing page serves as the entry point to the application, allowing users to:

Explore as a customer.

Join as a dealer/admin.

Customer Flow

After logging in, customers are redirected to the property listing page.

Customers can search for properties by name or location.

Customers can filter properties by price range using a slider.

Clicking View Details opens a modal with complete property information.

Customers can add properties to their favorites for future reference.

Admin Flow

After logging in, admins are redirected to the dashboard.

The dashboard displays useful stats such as total properties and total users.

Admins can add new properties by filling out the required details.

Admins can edit or delete existing properties directly from the dashboard.

API Endpoints
Properties
Get All Properties

Endpoint: /api/properties

Method: GET

Description: Fetches all properties. If a property's image_url is missing or invalid, a fallback image URL is used.

Get Specific Property

Endpoint: /api/properties/{id}

Method: GET

Description: Fetches details of a specific property by ID.

Create New Property

Endpoint: /api/properties

Method: POST

Description: Creates a new property with fields such as name, price, location, bedrooms, bathrooms, and image URL.

Update Property

Endpoint: /api/properties/{id}

Method: PUT

Description: Updates an existing property by ID.

Delete Property

Endpoint: /api/properties/{id}

Method: DELETE

Description: Deletes a property by ID. Returns a 404 error if the property is not found.

Authentication
Login

Endpoint: /api/login

Method: POST

Description: Logs in as customer or admin.

Logout

Endpoint: /api/logout

Method: POST

Description: Logs out the current user.

Favorites
Add to Favorites

Endpoint: /api/favorites

Method: POST

Description: Adds a property to favorites for customers.

Notes

The backend uses SQLite as the database.

CORS is enabled for cross-origin requests.

A fallback image URL is used when property images are missing or invalid.

The FastAPI backend typically runs on port 8000 during local development.

Future Improvements

Migrate to PostgreSQL for better scalability.

Add JWT-based authentication for enhanced security.

Implement pagination for large property datasets.

Improve mobile responsiveness further.

Add image upload support for admin-managed property listings.

Contact

For any queries or issues, feel free to reach out at:

Email: anilkumarbarupal.01@gmail.com
