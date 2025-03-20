import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Modal, Navbar } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaExclamationTriangle, FaMoon, FaSun } from "react-icons/fa";
import AddPropertyForm from "../AddPropertyForm/AddPropertyForm";
import "./AdminDashboard.css";

const AdminDashboard = ({ darkMode, toggleDarkMode }) => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Fetch properties from API
  const fetchProperties = () => {
    fetch("https://propertylistingsitebackend.onrender.com/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/"; // Redirect to landing page
  };

  // Open delete confirmation modal
  const openDeleteModal = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  // Handle Delete Property
  const confirmDeleteProperty = () => {
    if (!propertyToDelete) return;
    
    fetch(`https://propertylistingsitebackend.onrender.com/api/properties/${propertyToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete property");
        }
        setProperties(properties.filter((p) => p.id !== propertyToDelete.id));
        setShowDeleteModal(false);
        setSuccessMessage(`Property "${propertyToDelete.name}" has been deleted successfully!`);
        setShowSuccessModal(true);
        setPropertyToDelete(null);
      })
      .catch(() => {
        setShowDeleteModal(false);
        setSuccessMessage("Failed to delete property. Please try again.");
        setShowSuccessModal(true);
      });
  };

  // Open Add Property Form
  const handleAddProperty = () => {
    setEditingPropertyId(null);
    setShowForm(true);
  };

  // Open Edit Property Form
  const handleEditProperty = (id) => {
    setEditingPropertyId(id);
    setShowForm(true);
  };

  // Close Add/Edit Form
  const handleCloseForm = (success, message) => {
    setShowForm(false);
    setEditingPropertyId(null);
    
    if (success) {
      setSuccessMessage(message || "Operation completed successfully!");
      setShowSuccessModal(true);
      fetchProperties();
    }
  };

  return (
    <div className={`admin-dashboard ${darkMode ? "dark-theme" : ""}`}>
      {/* Responsive Navbar */}
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        className="shadow-sm py-3"
      >
        <Container fluid>
          <Navbar.Brand
            href="/"
            className="fw-bold d-none d-md-block"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
            }}
          >
            Premium Properties
          </Navbar.Brand>
          
          {/* For mobile: Show Admin Dashboard text centered */}
          <div className="text-center w-100 d-md-none">
            <h5 className="mb-0">Admin Dashboard</h5>
          </div>
          
          {/* For desktop: Show Admin Dashboard text between brand and buttons */}
          <div className="d-none d-md-block mx-auto">
            <h5 className="mb-0">Admin Dashboard</h5>
          </div>
          
          {/* For desktop: Show buttons in a row */}
          <div className="d-none d-md-flex align-items-center">
            <Button
              variant={darkMode ? "light" : "dark"}
              className="me-2"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </div>
        </Container>
      </Navbar>
      
      {/* For mobile: Show buttons in a separate row */}
      <div className="d-md-none bg-light py-2 px-3 shadow-sm d-flex justify-content-between">
        <Button
          variant={darkMode ? "light" : "dark"}
          size="sm"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
          className="d-flex align-items-center"
        >
          <FaSignOutAlt className="me-1" /> Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main-content">
        <Container fluid className="py-4">
          {/* Add/Edit Property Form */}
          {showForm && (
            <AddPropertyForm
              darkMode={darkMode}
              editingPropertyId={editingPropertyId}
              onClose={handleCloseForm}
            />
          )}

          {/* Properties Table */}
          {!showForm && (
            <>
              

              {/* Properties Table */}
              <Row className="mt-4">
                <Col>
                  <Card className="shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white flex-wrap">
                      <h4 className="mb-0 me-2">Property Management</h4>
                      {/* Add Property Button */}
                      <Button 
                        variant="light" 
                        size="sm" 
                        onClick={handleAddProperty}
                        className="d-flex align-items-center gap-2 mt-2 mt-sm-0"
                      >
                        <FaPlus /> Add Property
                      </Button>
                    </Card.Header>
                    <Card.Body className="p-2 p-sm-3">
                      {loading ? (
                        // Loading Spinner
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-3">Loading properties...</p>
                        </div>
                      ) : (
                        <>
                          {properties.length === 0 ? (
                            // No Properties Found Message
                            <div className="text-center py-5">
                              <h5>No properties found</h5>
                              <p className="text-muted">Click "Add Property" to create your first property listing.</p>
                            </div>
                          ) : (
                            // Properties Table with Responsive Design
                            <div className="table-responsive">
                              <Table hover className="align-middle">
                                <thead className="table-light">
                                  <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th className="d-none d-md-table-cell">Location</th>
                                    <th>Price</th>
                                    <th className="text-center">Actions</th>
                                  </tr>
                                </thead>

                                {/* Table Rows */}
                                <tbody>
                                  {properties.map((property) => (
                                    <tr key={property.id}>
                                      {/* Property Details */}
                                      <td>{property.id}</td>
                                      <td><strong>{property.name}</strong></td>
                                      <td className="d-none d-md-table-cell">{property.location}</td>
                                      <td>${property.price}/mo</td>

                                      {/* Action Buttons */}
                                      <td>
                                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                                          {/* Edit Button */}
                                          <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            onClick={() => handleEditProperty(property.id)}
                                            className="d-flex align-items-center gap-1"
                                          >
                                            <FaEdit /> <span className="d-none d-sm-inline">Edit</span>
                                          </Button>

                                          {/* Delete Button */}
                                          <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            onClick={() => openDeleteModal(property)}
                                            className="d-flex align-items-center gap-1"
                                          >
                                            <FaTrash /> <span className="d-none d-sm-inline">Delete</span>
                                          </Button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>

        {/* Delete Confirmation Modal */}
        <Modal 
          show={showDeleteModal} 
          onHide={() => setShowDeleteModal(false)} 
          centered 
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>
              <FaExclamationTriangle className="me-2" />
              Confirm Deletion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <p className="mb-0">
              Are you sure you want to delete property <strong>{propertyToDelete?.name}</strong>?
            </p>
            <p className="text-danger mt-3 mb-0">
              <strong>Warning:</strong> This action cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteProperty}>
              Delete Property
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Modal */}
        <Modal 
          show={showSuccessModal} 
          onHide={() => setShowSuccessModal(false)} 
          centered
        >
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <p className="mb-0">{successMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
