import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillChatLeftDotsFill, BsFillPersonFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../css/NavigationBar.css";

function NavigationBarInfo() {
  return (
    <Navbar>
      <Container>
        <Nav className="button">
          <Link to="/home" className="unclick">
            <AiFillHome />
          </Link>
          <Link to="/chat" className="unclick">
            <BsFillChatLeftDotsFill />
          </Link>
          <Link to="/post" className="unclick">
            <BiMessageSquareAdd />
          </Link>
          <Link to="/info" className="click">
            <BsFillPersonFill />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBarInfo;
