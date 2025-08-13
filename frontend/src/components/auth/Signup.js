import axios from "axios";
import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styled from 'styled-components';
import { Link } from "react-router-dom";
let Signup = function(){
  let [formdata , setformData] = useState(
    {
       username: "",
       email : "", 
       password : ""
    }
  )

  let onchange = (e)=> {
     setformData( (prev)=> ({...prev , [e.target.name]: e.target.value
     }))
  }

  let onsubmit = async(e)=> {
     e.preventDefault();
    try {
      await axios.post("https://nostalgia-cijq.onrender.com/signup" , formdata , {
        withCredentials: true
       }) 
       console.log("the data has been sent to the backend ") 
  
       setformData( 
        {
          username: "",
          email : "", 
          password : ""
        }
       )

      window.location.href = "/";

    } catch (error) {
      const errmsg = error.response?.data?.message || "User alredy exist"
      alert(errmsg);
      setformData( 
        {
          username: "",
          email : "", 
          password : ""
        }
       )
      return ;
    }
  } 
     return(
     
        <>
         <StyledWrapper>
        <Container className="centerdiv">
       
      <form className="form" onSubmit={onsubmit}>
      <span className="input-span">
          <label htmlFor="email" className="label">Username</label>
          <input type="text" name="username" id="username" placeholder="eg: @vivi1234" onChange={onchange} value={formdata.username} required/></span>
        <span className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" name="email" id="email" placeholder="Eg : vivi@xx.com"  onChange={onchange} value={formdata.email} required /></span>
        <span className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password"  onChange={onchange}  required value={formdata.password}/></span>
        <span className="span"><a href="#">Dont't Forget your Pawword</a></span>
        <input className="submit" type="submit" defaultValue="Log in"  />
        <span className="span">are you already a Member? <Link to={"/Login"}>Login</Link></span>
      </form>
  
        </Container>
        </StyledWrapper>
        </>

     )
}
const StyledWrapper = styled.div`
  --bg-light: #efefef;
  --bg-dark: #707070;
  --clr: #58bc82;
  --clr-alpha: rgba(11, 168, 53, 0.28);

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    justify-content: center;
  }

  .form .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form input[type="email"],
  .form input[type="text"],
  .form input[type="password"] {
    border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
  }

  .form input[type="email"]:focus,
  .form input[type="password"]:focus {
    outline: 2px solid var(--clr);
  }

  .label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
  }

  .form .submit {
    padding: 1rem 0.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-light);
    color: var(--clr);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .form .submit:hover {
    background-color: white;
    border: 2px solid var(--clr);
    color: var(--bg-dark);
  }

  .span {
    text-decoration: none;
    color: var(--bg-dark);
  }

  .span a {
    color: var(--clr);
  }

  .centerdiv {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

export default Signup;