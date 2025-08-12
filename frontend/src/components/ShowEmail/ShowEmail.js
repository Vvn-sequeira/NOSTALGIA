import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardEm from "./CardEm";
import "./ShowEmail.css";
import axios from "axios";
function ShowEmail() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getEmail", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setEmails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  let handleDelete = async(id)=> {
     if(!window.confirm("Delete this Email?")) return ;

     try {
      await axios.delete(`http://localhost:8000/api/deleteEmail/${id}`, {
        withCredentials: true
      }).catch( (err)=> {
         console.error(err);
         window.confirm("Some err occured : ",err);
      })

      setEmails( prev=> prev.filter(email => email._id != id));
     } catch (error) {
      
     }
  }

  let redirect = ()=> {
     window.location.href = '/GetEmail'
  }
  return (
    <>
      <Container>
      <div className="Show-box">
            <div className="show-heading">
              <h3>Hey here's your Email's : </h3>
            </div>
            {(!emails || emails.length === 0)&&  <div style={{color : "red"}}> No email to Schedule <br></br>Schedule your Email First ! <br></br> <p onClick={redirect}  style={{color: "white" , marginTop: "5px" , fontSize: "13px" , textDecoration: "underline" , cursor: "pointer" }}>Schedule your Now ..</p> </div>}
        {emails.map((email) => (
      
            <div className="em-card">
              <CardEm
                TO={email.To}
                H1={email.Subject}
                P={`${new Date(email.Date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  year: "numeric"
                }).replace(/,/g, "")} | ${email.sent ? "Sent" : "waiting"}`} 
                ondelete={()=> {handleDelete(email._id)}}
              >
              </CardEm>
            </div>
      
        ))}
            </div>
      </Container>
    </>
  );
}

export default ShowEmail;
