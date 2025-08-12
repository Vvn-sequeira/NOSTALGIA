import React from "react"
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import Toottip from "./Toottip";
import "./Footer.css"
import ThreeD from "./ThreeDcard";

function Footer(){
 return(
    <div className="Footer">
       <Container>
         <Row>
            <Col className="mt-4">
          <ThreeD></ThreeD>
            </Col>
          
         </Row>
       </Container>
    </div>
 )
};

export default Footer;