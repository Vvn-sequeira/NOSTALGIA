import React, { useState } from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import axios from 'axios'


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
} from '@coreui/react'

const apiUrl = process.env.REACT_APP_API_URL;
const isDebug = process.env.REACT_APP_DEBUG === "true";

export const SmallNav = () => {
  const [visible, setVisible] = useState(false)

  
  let logout = async()=> {
    try {
      await axios.post(`${apiUrl}/api/logout` , {} , {
        withCredentials : true,
        headers: {
          "Content-Type": "application/json"
        },
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
    <CNavbar className=""  style={{backgroundColor : "#19bdaa" , color: "black"}} >
      <CContainer fluid >
        <CNavbarBrand  style={{color : "black" , fontWeight: "700"}} >Flowmate</CNavbarBrand>
        <CNavbarToggler
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
          style={{backgroundColor: "transparent" , border: "none" , boxShadow: "none"  }}
        />
        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader style={{backgroundColor : "#19bdaa" , color: "black" }}>
            <COffcanvasTitle style={{ color: "black" , fontWeight: "700"}} >Flowmate</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)}   style={{backgroundColor: "transparent" , border: "none" , boxShadow: "none"  }} />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="/"style={{color : "black"}}  >
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/GetEmail" style={{color: "black"}}  >
                  Schedule your Email
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/Settodo" style={{color: "black"}}  >
                  Todo List
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/Ai" style={{color: "black"}}  >
                Smart Pal
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/amisafe" style={{color: "black"}}  >
                 Am I safe ?
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/WriteDairy"  style={{color: "black"}}  >
                  Write Diary
                </CNavLink>
              </CNavItem>
          
              {/* <CNavItem>
                <CNavLink href="#" >
                  About Us 
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" acive>
                  Contact Us 
                </CNavLink>
              </CNavItem> */}
              <CNavItem style={{backgroundColor:"blue"}}>
                <CNavLink href="SignUp"  style={{color: "#19bdaa" , fontWeight: "700" }}>
                 SignUp
                </CNavLink>
              </CNavItem>
              <CNavItem style={{backgroundColor:"blue"}}>
                <CNavLink href="Login"  style={{color: "blue" , fontWeight: "700" }}>
                 Login
                </CNavLink>
              </CNavItem>
              <CNavItem style={{backgroundColor:"blue"}}>
                <CNavLink href="#"  onClick={logout}  style={{color: "red" , fontWeight: "700" } }>
                 Logout
                </CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">My data</CDropdownToggle>
                <CDropdownMenu style={{backgroundColor: "Whitesmoke"}}>
                  <CDropdownItem href="/ShowEmail"> My Email's </CDropdownItem>
                  <CDropdownItem href="/ShowDiary"> My Diary </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#" style={{opacity: "0.4"}}>Dev: Vivian Marcel Sequeira</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
          
            </CNavbarNav>
     
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  )
}
