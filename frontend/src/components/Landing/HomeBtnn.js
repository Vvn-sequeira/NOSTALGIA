import React from "react";
import "./AnimatedList.css"
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
const  HomeBtnn = ()=>{
     

    return(
        <>
           <Container className="page-center">
            <Row className="Row">
                <Col className="Col" >
                <div className="home-btn-body">
                    <div className="home-btn-heading">
                           <Link to={"GetEmail"} style={{textDecoration : "none"}}><h3>Email</h3></Link>
                        <div className="home-btn-small">
                            <small> WRITE IT YOURSELF</small>
                        </div>
                    </div>
                </div>
                </Col>
                <Col>
                <div className="home-btn-body">
                    <div className="home-btn-heading">
                    <Link to={"/WriteDairy"} style={{textDecoration : "none"}}><h3>Diary</h3></Link>
                        <div className="home-btn-small">
                            <small>Good Old Days </small>
                        </div>
                    </div>
                </div>
                </Col>
                <Col>
                <div style={{cursor: "pointer"}} className="home-btn-body">
                    <div className="home-btn-heading">
                    <Link to={"/Ai"} style={{textDecoration : "none" , textAlign : "center"}}><h3> Use AI</h3></Link>
                        <div className="home-btn-small" style={{textAlign : "center"}}>
                            <small>Use our AI </small>
                        </div>
                    </div>
                </div>
                </Col>
                <Col>
                <div style={{cursor: "pointer"}} className="home-btn-body">
                    <div className="home-btn-heading" style={{textAlign : "center"}} >
                    <Link to={"/amisafe"} style={{textDecoration : "none"}}><h3>Am I Safe ?</h3></Link>
                        <div className="home-btn-small" style={{textAlign : "center"}}>
                            <small>Are you really Safe ?  </small>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
           </Container>
        </>
    )
}

export default HomeBtnn;