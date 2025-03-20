import sqlite3

# Data to insert into the database
data = [
    {"bathrooms": 1, "bedrooms": 2, "id": 1, "image_url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "New York", "name": "Cozy Apartment", "price": 1200},
    {"bathrooms": 4, "bedrooms": 5, "id": 2, "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Los Angeles", "name": "Luxury Villa", "price": 5000},
    {"bathrooms": 2, "bedrooms": 3, "id": 3, "image_url": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Chicago", "name": "Modern Condo", "price": 2000},
    {"bathrooms": 3, "bedrooms": 4, "id": 4, "image_url": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Miami", "name": "Beach House", "price": 3500},
    {"bathrooms": 2, "bedrooms": 3, "id": 5, "image_url": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Austin", "name": "Suburban Home", "price": 1800},
    {"bathrooms": 2, "bedrooms": 2, "id": 6, "image_url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "San Francisco", "name": "Downtown Loft", "price": 2500},
    {"bathrooms": 1, "bedrooms": 2, "id": 7, "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Nashville", "name": "Country Cottage", "price": 1500},
    {"bathrooms": 3, "bedrooms": 4, "id": 8, "image_url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Seattle", "name": "Penthouse Suite", "price": 8000},
    {"bathrooms": 2, "bedrooms": 3, "id": 9, "image_url": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Boston", "name": "Historic Brownstone", "price": 3000},
    {"bathrooms": 1, "bedrooms": 1, "id": 10, "image_url": "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60", "location": "Portland", "name": "Urban Studio", "price": 1000}
]

# Connect to the SQLite database
db_path = 'database.db'
connection = sqlite3.connect(db_path)
cursor = connection.cursor()

# Insert data into the properties table
for property in data:
    cursor.execute(
        """INSERT OR IGNORE INTO properties (id, name, price, location, bedrooms, bathrooms, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (property['id'], property['name'], property['price'], property['location'], property['bedrooms'], property['bathrooms'], property['image_url'])
    )

# Commit the transaction and close the connection
connection.commit()
connection.close()
