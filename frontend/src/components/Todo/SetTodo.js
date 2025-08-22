import React, { useState } from "react";
// import "./Dairy.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import "./Todo.css"; 
import Button from "react-bootstrap/Button";
import ShowTodo from "./ShowTodo";
const apiUrl = process.env.REACT_APP_API_URL; 

const SetTodo = ()=> {
     
    const maxDate = new Date();
    const formatted = maxDate.toLocaleString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  
    const [date, setDate] = useState(formatted);
    const [formData, setFormData] = useState({
      date: null,
      todo: "",
    });
  


    const OnchangeDate = (e) => {
           try {
            const UTC = new Date(e.value).toISOString();
            setFormData((prev) => ({ ...prev, date: UTC }));
           } catch (error) {
            console.log(error)
           }
    };
  
    const OnSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${apiUrl}/Settodo`, formData, {
          withCredentials: true 
        });
        console.log("Res sent to the backend");
        alert("Stored sucessfuly ")
        setFormData(
          {
            date: null,
            todo: "",
          }
        )
        window.location.reload() 
      } catch (error) {
        const errmsg =
          error.response?.data?.message ||
          "Try Logout and Login.";
        alert(errmsg);
      }
    };
  
    return (

      <Container className="p-3">
         <Form className="write-dairy-form" onSubmit={OnSubmit}>
         <h6 className="write-dairy-Date">Today's Date: {date}</h6>
        <Row className="TodoSet">
            <Col xs={12} lg={6} className="col">
      
            <Form.Group className="mb-3" controlId="formHeading">
            {/* <Form.Label style={{ color: "#14b8a6" }}>Todo ? </Form.Label> */}
            <Form.Control
              className="write-dairy-input"
              type="text"
              placeholder="Todo ? "
              value={formData.heading}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, todo: e.target.value }))
              }
            />
          </Form.Group>
            </Col>
            <Col className="col" >
            <Form.Group className="mb-3" controlId="formDate">
            {/* <Form.Label style={{ color: "#14b8a6" }}>Date</Form.Label> */}
            <div className="icon-tweaks">
              <DateTimePickerComponent
                placeholder="Set Time"
                min={new Date()}  
                max={new Date(new Date().setHours(23, 59, 59, 999))}
                format={"yyyy-MM-dd HH:mm"}
                value={formData.date}
                onChange={OnchangeDate}
              />
            </div>
          </Form.Group>
            </Col >
            <Col className="col">
             <Button type="submit" className="Todo-button">List it Down </Button>
            </Col>
        </Row>
        </Form>
 
         <ShowTodo></ShowTodo>

      </Container>
    );
}

export default SetTodo ;