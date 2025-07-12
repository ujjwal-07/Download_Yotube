"use client"; 

import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export default function HowItWorks() {
  const steps = [
    {
      title: "Step 1: Enter URL",
      text: "Paste the YouTube link you want to download.",
      img: "/step-1.png",
    },
    {
      title: "Step 2: Choose Format",
      text: "Select the format (MP4, MP3, etc.) for your download.",
      img: "/step-2.png",
    },
    {
      title: "Step 3: Download Media",
      text: "Click download and we’ll process your media instantly.",
      img: "/step-3.png",
    },
  ];

  return (
<Container id="HowToUse" className="my-5">
  <h2 className="text-center mb-4">How It Works</h2>
  <Row className="g-4">
    {steps.map((step, index) => (
      <Col key={index} xs={12} sm={12} md={6} lg={4}>
        <Card
          className="h-100 shadow-sm d-flex flex-column"
          style={{
            width: "100%", // Full width in column
          }}
        >
          <Card.Img
            variant="top"
            src={step.img}
            alt={step.title}
            style={{
              // Taller image
              width: "100%",
              objectFit: "cover",
            }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{step.title}</Card.Title>
            <Card.Text className="mb-4">{step.text}</Card.Text>

            {/* Push button to bottom */}
            <div className="mt-auto text-center">
              <Button variant="primary" disabled>
                Step {index + 1}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>



  );
}
