from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'database.db'
FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Allows access to columns by name
    return conn

@app.route('/api/properties', methods=['GET'])
def get_properties():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM properties").fetchall()
    conn.close()
    properties = [dict(row) for row in rows]
    for property in properties:
        if not property.get('image_url') or 'random' in property.get('image_url', ''):
            property['image_url'] = FALLBACK_IMAGE
    return jsonify(properties)

@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM properties WHERE id = ?", (id,)).fetchone()
    conn.close()

    if row is None:
        return jsonify({'error': 'Property not found'}), 404

    property = dict(row)
    if not property.get('image_url') or 'random' in property.get('image_url', ''):
        property['image_url'] = FALLBACK_IMAGE
    
    return jsonify(property)

@app.route('/api/properties', methods=['POST'])
def create_property():
    new_property = request.json
    required_fields = ('name', 'price', 'location', 'bedrooms', 'bathrooms')
    
    if not all(field in new_property for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    image_url = new_property.get('image_url', FALLBACK_IMAGE)
    
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO properties (name, price, location, bedrooms, bathrooms, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        (new_property['name'], new_property['price'], new_property['location'], new_property['bedrooms'], new_property['bathrooms'], image_url)
    )
    conn.commit()
    
    new_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()

    new_property['id'] = new_id
    new_property['image_url'] = image_url
    
    return jsonify(new_property), 201

@app.route('/api/properties/<int:id>', methods=['PUT'])
def update_property(id):
    data = request.json
    
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM properties WHERE id = ?", (id,)).fetchone()

    if row is None:
        conn.close()
        return jsonify({'error': 'Property not found'}), 404

    updated_values = {
        'name': data.get('name', row['name']),
        'price': data.get('price', row['price']),
        'location': data.get('location', row['location']),
        'bedrooms': data.get('bedrooms', row['bedrooms']),
        'bathrooms': data.get('bathrooms', row['bathrooms']),
        'image_url': data.get('image_url', FALLBACK_IMAGE if not data.get('image_url') else data['image_url'])
    }

    conn.execute(
        """UPDATE properties SET name=?, price=?, location=?, bedrooms=?, bathrooms=?, image_url=? WHERE id=?""",
        (updated_values['name'], updated_values['price'], updated_values['location'], updated_values['bedrooms'],
         updated_values['bathrooms'], updated_values['image_url'], id)
    )
    
    conn.commit()
    conn.close()

    updated_values['id'] = id
    return jsonify(updated_values)

@app.route('/api/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    conn = get_db_connection()
    
    result = conn.execute("DELETE FROM properties WHERE id=?", (id,))
    
    if result.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Property not found'}), 404
    
    conn.commit()
    conn.close()
    
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, port=5001, host="0.0.0.0")
