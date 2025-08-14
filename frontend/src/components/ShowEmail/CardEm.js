import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardEm({TO , H1 , P , ondelete}) {
  return (
    <>
      <Card>
        <Card.Header style={{fontWeight: "600" , fontSize: "0.9rem" , }}>to : {TO}</Card.Header>
        <Card.Body>
          <Card.Title style={{fontSize: "0.9rem " , fontWeight: "700" , textAlign: "left"}}>{H1.toUpperCase()}</Card.Title>
          <Card.Text style={{opacity: "0.6" , fontSize: "0.8rem "}}>
            Scheduled on :  {P}
          </Card.Text>
          <Button onClick={ondelete} variant="danger" style={{marginLeft: "0"}}>Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardEm;
     