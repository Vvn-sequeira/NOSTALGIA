import React, { use, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AiButton from "./AiButton";
import Button from 'react-bootstrap/Button';
const apiUrl = process.env.REACT_APP_API_URL;
const AiEmail = () => {
  const [formData, setFormData] = useState("");
  const [Aires, setAiRes] = useState("");
  const [copy , copied ] = useState(false);
  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/api/Ai`,
        { prompt: formData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAiRes(res.data);
      console.log("the req has been sent to the backend ");
      alert("the req is sent ");
      setFormData("");
    } catch (error) {
      alert("some err occured try again or else contact the developer");
      console.log("err : ", error);
    }
  };

  const onchange = (e) => {
    setFormData(e.target.value);
  };

  
  const handleCopy = () => {
    if(!Aires){
        alert("nothing to copy !")
        return;
    } 
    navigator.clipboard.writeText(Aires)
      .then(() => {
        copied(true);
        alert("Copied to ClipBoard");
        setTimeout(() => copied(false), 5000);
      })
      .catch((error) => {
        console.log("Failed to copy : ", error);
      });
  };

  const handleClear = ()=> {
    setFormData("");
    setAiRes("");
  }

  return (
    <>
      <Container>
        <Form className="write-dairy-form" onSubmit={OnSubmit}>
          <Row>
            <Col xs={12} md={9}>
              <Form.Group className="mb-3" controlId="formHeading">
                <Form.Label style={{ color: "#14b8a6" }}>
                  Please provide a well-crafted prompt for the AI to follow{" "}
                </Form.Label>
                <Form.Control
                  className="write-dairy-input"
                  type="text"
                  placeholder="Your prompt goes here...."
                  value={formData}
                  onChange={onchange}
                />
              </Form.Group>
            </Col>
            <Col>
              <AiButton></AiButton>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formText">
            <Form.Control
              className="write-dairy-input"
              as="textarea"
              rows={19}
              placeholder="Wait for the reply"
              value={Aires}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </Form.Group>
        </Form>
        <Row style={{marginTop:"-38px" , marginBottom : "38px "}}>
          {/* <Col>
            <CopyBtn toCopy={Aires}></CopyBtn>
          </Col> */}
          <Col lg={2} md={3} xs={6}>
          <Button onClick={handleCopy} variant="outline-primary"> {!copy ? "Copy text" : "Copied"}</Button>
          </Col>
          <Col>
          <Button onClick={handleClear} variant="outline-danger">Clear</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AiEmail;

