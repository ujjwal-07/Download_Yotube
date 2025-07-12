"use client";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2">
          <img
          className="rounded-full h-10 w-10"
            src="/Logo.png" // ✅ Place your logo file inside /public/images/
            alt="LDU Downloader Logo"
            
          />
          <span>LDU Downloader</span>
        </Navbar.Brand>

        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible nav items */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="#HowToUse">
              How It Works
            </Nav.Link>

            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="#AboutUs">
                About
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="#contact">
                Contact
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="#Faqs">
                FAQ
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* YouTube URL Input */}
      
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
