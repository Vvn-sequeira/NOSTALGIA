import React, { useState } from "react";
import "./Dairy.css";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import GreenBtn from "../GreenBtn";
import DatePicker from "../DatePicker";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../Forms/DateTime.css";
import axios from "axios";


function WriteDairy() {
  let maxDate = new Date();
  let todaysDate = new Date();
  const formatted = todaysDate.toLocaleString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [date, setDate] = useState(() => formatted);

  const [formData , setFormData] = useState(
    {
      date : null ,
      heading : "",
      text : ""
    }
  )

  let OnchangeDate = async (e) => {
    let UTC = new Date(e.value).toISOString();
    setFormData( (prev) => ( { ...prev, date: UTC }));
  };

  let OnSubmit = async (e)=> {
    e.preventDefault();
    try {
      await axios.post("https://nostalgia-cijq.onrender.com/MyDiary" , formData , {
        withCredentials: true
      });
      console.log("Res sent to the backend ")      
    } catch (error) {
       const errmsg = error.response?.data?.message || "hey somthing went wrong Contact Developer"
       alert(errmsg)
       return ; 
    }
  }




  return (
    <>
      <Container>
        <Form className="write-dairy-form" onSubmit={OnSubmit}>
          <h6 className="write-dairy-Date">
            Today's Date : {date ? date.toLocaleString() : "Loading..."}
          </h6>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "#14b8a6" }}>Date </Form.Label>
            <div className="icon-tweaks">
              <DateTimePickerComponent
                placeholder="Please Select Date & Time"
                max={maxDate}
                format={"yyyy-MM-dd HH:mm"}
                value={formData.Date}
                onChange={OnchangeDate}
                
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "#14b8a6" }}>Heading </Form.Label>
            <Form.Control
              className="write-dairy-input"
              type="Text"
              placeholder=" Heading "
              onChange={(e)=> {
                setFormData( (prev)=>({...prev , heading: e.target.value}))
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ color: "#14b8a6" }}>
              Example textarea
            </Form.Label>
            <Form.Control
              className="write-dairy-input"
              as="textarea"
              rows={12}
              placeholder="How was Your Day Today ? "
              onChange={(e)=> {
                setFormData( (prev)=>({...prev , text: e.target.value}))
              }}
            />
          </Form.Group>

          <GreenBtn  ></GreenBtn>
        </Form>
      </Container>
    </>
  );
}

export default WriteDairy;
