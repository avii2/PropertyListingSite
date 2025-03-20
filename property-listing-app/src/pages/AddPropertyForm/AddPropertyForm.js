import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const AddPropertyForm = ({ darkMode, editingPropertyId, onClose }) => {
  const [property, setProperty] = useState({
    name: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingProperty, setLoadingProperty] = useState(!!editingPropertyId);

  // Fetch property details if editing
  useEffect(() => {
    if (editingPropertyId) {
      setLoadingProperty(true);
      axios.get(`http://localhost:5001/api/properties/${editingPropertyId}`)
        .then((response) => {
          setProperty(response.data);
        })
        .catch(() => {
          setError("Failed to load property details.");
        })
        .finally(() => {
          setLoadingProperty(false);
        });
    }
  }, [editingPropertyId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: name === "price" || name === "bedrooms" || name === "bathrooms" ? Number(value) : value
    });
  };

  // Handle form submission (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiUrl = editingPropertyId 
      ? `http://localhost:5001/api/properties/${editingPropertyId}` 
      : `http://localhost:5001/api/properties`;

    const method = editingPropertyId ? "PUT" : "POST";

    axios({
      method,
      url: apiUrl,
      data: property,
    })
      .then(() => {
        const message = editingPropertyId 
          ? `Property "${property.name}" has been updated successfully!` 
          : `Property "${property.name}" has been added successfully!`;
        onClose(true, message); // Pass true to indicate successful submission
      })
      .catch(() => {
        setError("Failed to submit property. Please try again.");
        setLoading(false);
      });
  };

  // Handle close button
  const handleCloseForm = () => {
    onClose(false); // Pass false to indicate form was just closed, not submitted
  };

  if (loadingProperty) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading property details...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className={`shadow ${darkMode ? "bg-dark text-light" : ""}`}>
            <Card.Header className={`d-flex justify-content-between align-items-center ${darkMode ? "bg-dark text-light" : "bg-primary text-white"}`}>
              <h3 className="mb-0">{editingPropertyId ? "Edit Property" : "Add New Property"}</h3>
              <Button 
                variant={darkMode ? "outline-light" : "light"} 
                onClick={handleCloseForm}
                size="sm"
              >
                Close
              </Button>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <div className="alert alert-danger text-center mb-4">{error}</div>
              )}
              <Form onSubmit={handleSubmit}>
                {/* Property Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Property Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={property.name}
                    onChange={handleChange}
                    placeholder="Enter property name"
                    className={darkMode ? "bg-dark text-light border-secondary" : ""}
                    required
                  />
                </Form.Group>

                {/* Price and Location */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price ($/month)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={property.price}
                        onChange={handleChange}
                        placeholder="Enter monthly price"
                        className={darkMode ? "bg-dark text-light border-secondary" : ""}
                        min="1"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={property.location}
                        onChange={handleChange}
                        placeholder="Enter property location"
                        className={darkMode ? "bg-dark text-light border-secondary" : ""}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Bedrooms and Bathrooms */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bedrooms</Form.Label>
                      <Form.Control
                        type="number"
                        name="bedrooms"
                        value={property.bedrooms}
                        onChange={handleChange}
                        placeholder="Number of bedrooms"
                        className={darkMode ? "bg-dark text-light border-secondary" : ""}
                        min="0"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bathrooms</Form.Label>
                      <Form.Control
                        type="number"
                        name="bathrooms"
                        value={property.bathrooms}
                        onChange={handleChange}
                        placeholder="Number of bathrooms"
                        className={darkMode ? "bg-dark text-light border-secondary" : ""}
                        min="0"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Image URL */}
                <Form.Group className="mb-4">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="image_url"
                    value={property.image_url}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    className={darkMode ? "bg-dark text-light border-secondary" : ""}
                  />
                  <Form.Text className={darkMode ? "text-light" : "text-muted"}>
                    Provide a direct URL to an image of the property.
                  </Form.Text>
                </Form.Group>

                {/* Submit Button */}
                <Button 
                  variant={darkMode ? "outline-light" : "primary"} 
                  type="submit" 
                  disabled={loading} 
                  className="w-100 py-2 mt-3"
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      {editingPropertyId ? "Updating Property..." : "Adding Property..."}
                    </>
                  ) : (
                    editingPropertyId ? "Update Property" : "Add Property"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPropertyForm;
