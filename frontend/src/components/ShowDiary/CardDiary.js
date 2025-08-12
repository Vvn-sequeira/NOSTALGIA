import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../ShowEmail/ShowEmail.css"
function CardDiary({TO , H1 , P , ondelete}) {
  return (
    <>
      <Card className="small_card">
        <Card.Header style={{fontWeight: "600"}}> {TO.toUpperCase()}</Card.Header>
        <Card.Body>
          <Card.Title style={{opacity: "0.7" , fontSize: "16px"  , textAlign: "left"}}>{H1}</Card.Title>
          <Card.Text style={{opacity: "2" , fontWeight: "600" , color : "#14b8a6" }}>
           {P.toUpperCase()}
          </Card.Text>
          <Button onClick={ondelete} variant="danger" style={{marginLeft: "0"}}>Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardDiary;
