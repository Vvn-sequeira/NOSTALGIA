import React from "react"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
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