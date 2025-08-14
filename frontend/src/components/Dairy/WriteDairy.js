import React, { useState } from "react";
import "./Dairy.css";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import GreenBtn from "../GreenBtn";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const isDebug = process.env.REACT_APP_DEBUG === "true";
function WriteDairy() {
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
    heading: "",
    text: "",
  });

  const OnchangeDate = (e) => {
    const UTC = new Date(e.value).toISOString();
    setFormData((prev) => ({ ...prev, date: UTC }));
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/MyDiary`, formData, {
        withCredentials: true 
      });
      console.log("Res sent to the backend");
      alert("Stored sucessfuly , Check you ' My Data ' to view your Diary ")
      setFormData(
        {
          date: null,
          heading: "",
          text: "",
        }
      )
    } catch (error) {
      const errmsg =
        error.response?.data?.message ||
        "Hey, something went wrong. Contact the developer.";
      alert(errmsg);
    }
  };

  return (
    <Container>
      <Form className="write-dairy-form" onSubmit={OnSubmit}>
        <h6 className="write-dairy-Date">Today's Date: {date}</h6>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label style={{ color: "#14b8a6" }}>Date</Form.Label>
          <div className="icon-tweaks">
            <DateTimePickerComponent
              placeholder="Please Select Date & Time"
              max={maxDate}
              format={"yyyy-MM-dd HH:mm"}
              value={formData.date}
              onChange={OnchangeDate}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHeading">
          <Form.Label style={{ color: "#14b8a6" }}>Heading</Form.Label>
          <Form.Control
            className="write-dairy-input"
            type="text"
            placeholder="Heading"
            value={formData.heading}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, heading: e.target.value }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formText">
          <Form.Label style={{ color: "#14b8a6" }}>Your Diary</Form.Label>
          <Form.Control
            className="write-dairy-input"
            as="textarea"
            rows={12}
            placeholder="How was your day today?"
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
          />
        </Form.Group>

        <GreenBtn type="submit" />
      </Form>
    </Container>
  );
}

export default WriteDairy;