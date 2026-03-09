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
