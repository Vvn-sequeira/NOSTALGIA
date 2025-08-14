import { useState } from "react";
import "../Forms/DateTime.css";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import GreenBtn from "../GreenBtn";

const apiUrl = process.env.REACT_APP_API_URL;
const isDebug = process.env.REACT_APP_DEBUG === "true";
function EmailForm() {

  let minDate = new Date();

  let [FormData, setFormData] = useState({
    To: "",
    Subject: "",
    Text: "",
    URL: "",
    Date: "",
  });

  let clearState = () => {
    setFormData({
      To: " ",
      Subject: " ",
      Text: " ",
      URL: "",
      Date: " ",
    });
  };

  let OnchangeDate = async (e) => {
    let UTC = new Date(e.value).toISOString();
    setFormData((prev) => ({ ...prev, Date: UTC }));
  };

  let Changesubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`${apiUrl}/GetEmail`, FormData ,{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      console.log("res sent ", res);
      clearState();
      alert("Email has been Scheduled , you can view it in 'My data' ")
    } catch (error) {
      console.log("Caught error:", error);
      const errmsg = error.response?.data?.message || "Some error occurred. Try again or report it to the developer.";
      alert(errmsg);
     clearState()
      return;
    }
   
  };



  return (
    <Container className="pt-2 mt-2 mb-5 pb-5 box ">
      <Form onSubmit={Changesubmit}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>To Email address ⭕ </Form.Label>
              <Form.Control
                className="input"
                type="email"
                placeholder="ToEmail@example.com"
                required
                value={FormData.To}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, To: e.target.value }))
                }
              />
            </Form.Group>
          </Col>
          <Col className="mb-3 Datetime">
            <Form.Group>
              <Form.Label>Date&Time ⭕</Form.Label>
              <div className="icon-tweaks">
                <DateTimePickerComponent
                  placeholder="Please Select Date & Time"
                  min={minDate}
                  format={"yyyy-MM-dd HH:mm"}
                  value={FormData.Date}
                  change={OnchangeDate}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Subject ⭕ </Form.Label>
          <Form.Control
            className="input"
            size="lg"
            type="text"
            placeholder="eg:-  Greetings From Vivian@2006"
            required
            value={FormData.Subject}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Subject: e.target.value }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text: ( please use HTML tags ) ⭕</Form.Label>
          <Form.Control
            className="input"
            as="textarea"
            rows={10}
            placeholder="eg:- <h1> This is the heading  </h1> <br> "
            required
            value={FormData.Text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, Text: e.target.value }))
            }
          />
        </Form.Group>

        <Row className="mb-3 ">
          <Col>{/*  */}</Col>
        </Row>
        <Row>
          <Col   className="mb-3">
            <Form.Control
              className="input"
              size="md"
              type="text"
              placeholder="URL / ( NOTE : to share PDF please send a LINK of that by storing it in Google cloude)"
              value={FormData.URL}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, URL: e.target.value }))
              }
        
            />
          </Col>
         
        </Row>

        <br></br>
        <Row>
          <Col xs={12} md={6} >
            <GreenBtn >
            </GreenBtn>
          </Col>
          <Col xs={"auto"} md={"auto"} className="mt-3">
            <button class="Btn" onClick={clearState}>
              <div class="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div class="text" onClick={clearState} >Clear</div>
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default EmailForm;