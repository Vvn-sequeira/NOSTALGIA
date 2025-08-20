import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import CardEm from "./CardDiary";
import "../ShowEmail/ShowEmail.css";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
function ShowDiary() {
  const [diary, setdiary] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/getDiary`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setdiary(res.data);
      })
      .catch((err) => {
        alert(err)
        return ;
      });
  }, []);


  let handleDelete = async(id)=> {
     if(!window.confirm("Delete this Email?")) return ;

     try {
      await axios.delete(`${apiUrl}/api/deleteDiary/${id}`, {
        withCredentials: true
      }).catch( (err)=> {
         console.error(err);
         window.confirm("Some err occured : ",err);
      })

      setdiary( prev=> prev.filter(email => email._id != id));

     } catch (error) {
      alert(error)
      return
     }
  }

  let redirect = ()=> {
     window.location.href = '/WriteDairy'
  }

  return (
    <>
      <Container>
      <div className="Show-box">
            <div className="show-heading">
              <h3>Hye here's your Diary: </h3>
            </div>
            {(!diary || diary.length === 0)&&  <div style={{color : "red"}}> No diary has been Written<br></br> Start Writing Diary  <br></br> <p onClick={redirect}  style={{color: "white" , marginTop: "5px" , fontSize: "13px" , textDecoration: "underline" , cursor: "pointer" }}>Write your Diary Now ..</p> </div>}
        {diary.map((email) => (
      
            <div className="em-card">
              <CardEm
                TO={email.heading}
                H1={email.text}
                P={`${new Date(email.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  year: "numeric"
                }).replace(/,/g, "")}`} 
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

export default ShowDiary;
