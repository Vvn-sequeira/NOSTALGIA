import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from "axios";
let Login = function(){

 let [form , setForm] = useState(
  {
     email : "",
     password : ""
  }
 )

 let onchange = (e)=> {
    setForm( (prev)=> ({...prev , [e.target.name] : e.target.value}))
 }

  let onsubmit = async()=> {
    try {
     await axios.post("https://nostalgia-cijq.onrender.com/login" , form , {
       withCredentials : true 
     }) 
     alert("Login was Succesfull");
     console.log("user Logged in ");
    } catch (error) {
      const errmsg = error.response?.data?.message || "Some error occurred. Try again or report it to the developer.";
      alert(errmsg);
      return;
    }


 }
     return(
        
        <>
         <StyledWrapper>
        <Container className="centerdiv">
       
      <form className="form" onSubmit={onsubmit}>
      <span className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" name="email" value={form.email} onChange={onchange} id="email" placeholder="enter your Email"/></span>
        <span className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" name="password" value={form.password} onChange={onchange} id="password" placeholder="Enter your password"/></span>
        <span className="span"><a href="#">Dont't Forget your Pawword</a></span>
        <input className="submit" type="submit" defaultValue="Log in" />
        <span className="span">Don't you have an acc ?  <Link to={"/SignUp"}>SignUp</Link></span>
      </form>
  
        </Container>
        </StyledWrapper>
        </>

     )
}
const StyledWrapper = styled.div`
  .form {
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-alpha:rgba(11, 168, 53, 0.28);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    justify-content: center ;
    align-items : center ;

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
    background-color:  #efefef;
    color: var(--clr);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .form .submit:hover {
    background-color: white ;
    border : 2px solid var(--clr);
    color: var(--bg-dark);
  }

  .span {
    text-decoration: none;
    color: var(--bg-dark);
  }

  .span a {
    color: var(--clr);
  }
  
  .centerdiv{
   display: flex;
   justify-content : center ;
   align-items : center ;
   margin-top  : 5% ;
   margin-bottom : 5% ; 
  }
  `;


export default Login;