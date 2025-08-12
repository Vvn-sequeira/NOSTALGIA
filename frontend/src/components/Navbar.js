import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import { Await, Link } from "react-router-dom";
import { SmallNav } from "./smallNav";
import "./Navbar.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CCloseButton,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
import axios from "axios";
function Navbar() {
  let [selected, setSelected] = useState(100);

  let activeNav = (index) => {
    setSelected(index);
  };

  let logout = async()=> {
    try {
      await axios.post("http://localhost:8000/api/logout" , {} , {
        withCredentials : true
      })
      console.log("succesfully Loged out ")
      window.location.href = "/SignUp"
      alert("succesfully Logged out ")
    } catch (error) {
      const errmsg = error.response?.data?.message || "Log in first To Log Out" 
      alert(errmsg)
      return; 
     }
  }


  return (
    <>
      <div className="navBar">
        <Container>
          <ul className=" ListItems">
            <li
              onClick={() => activeNav(0)}
              className={selected == 0 ? "active" : "nonactive"}
            >
              {" "}
              <Link className="navLinks" to={"/"}>
                Home
              </Link>
            </li>
            <li
              onClick={() => activeNav(3)}
              className={selected == 3 ? "active" : "nonactive"}
            >
              {" "}
              <Link className="navLinks" to={"/GetEmail"}>
                Email Scheduler
              </Link>
            </li>
            <li
              onClick={() => activeNav(4)}
              className={selected == 4 ? "active" : "nonactive"}
            >
              {" "}
              <Link className="navLinks" to={"/WriteDairy"}>
                Personal dairy
              </Link>
            </li>
            <li>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">My Data</CDropdownToggle>
                <CDropdownMenu style={{ backgroundColor: "Whitesmoke" }}>
                  <CDropdownItem href="/ShowEmail">
                    {" "}
                  My Emails
                  </CDropdownItem>
                  <CDropdownItem href="/ShowDiary"> My Diary </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#" style={{ opacity: "0.4" }}>
                    Dev: Vivian Marcel Sequeira
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </li>
            {/* <li>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Info</CDropdownToggle>
                <CDropdownMenu style={{ backgroundColor: "Whitesmoke" }}>
                  <CDropdownItem href="/ShowEmail">
                    {" "}
                   Contact US
                  </CDropdownItem>
                  <CDropdownItem href="/ShowDiary"> About Us </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#" style={{ opacity: "0.4" }}>
                    Dev: Vivian Marcel Sequeira
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </li> */}
            <li>
              {" "}
              <Link
                className=" Login-btn"
                to={"/SignUp"}
                style={{ color: "white" }}
              >
                SignUp
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className=" Login-btn"
                to={"/Login"}
                style={{ color: "white" , backgroundColor : "blue" }}
               
              >
                Login
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className=" Login-btn"
                to={"#"}
                style={{ color: "white" , backgroundColor: "red" }}
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </Container>
      </div>
      <div className="smallNav">
        <SmallNav></SmallNav>
      </div>
    </>
  );
}

export default Navbar;
