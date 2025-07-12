"use client"

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ContactUs() {
  console.log(API_URL)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with your actual API endpoint
      const response = await axios.post(`${API_URL}/contactUs/add`, formData);

      if (response.status === 200) {
        setModalContent({
          title: "✅ Success",
          body: "Your message has been sent successfully!",
        });
        setModalShow(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }
    } catch (error) {
      console.error(error);
      setModalContent({
        title: "❌ Error",
        body:
          error?.response?.data?.error ||
          "Something went wrong. Please try again later.",
      });
      setModalShow(true);
    }
  };

  return (
    <Container id="contact" className="my-5">
      <h2 className="text-center text-black mb-4">Contact Us</h2>
      <Row className="g-4">
        {/* Contact Form */}
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Get in Touch</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="px-4">
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col md={6}>
          <Card className="p-4 shadow-sm bg-light">
            <Card.Body>
              <h4 className="mb-3">Contact Information</h4>
              <p className="mb-2">
                📧 <strong>Email:</strong> testingpurposeuseonly@gmail.com
              </p>
              <p className="mb-2">
                📍 <strong>Address:</strong>
                127.0.0.1 Developer Lane
                Localhost City, 8080
              </p>
              <p className="mt-4">
                We’ll get back to you within 24 hours. Thank you for reaching out!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
