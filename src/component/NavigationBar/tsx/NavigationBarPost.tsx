import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillChatLeftDotsFill, BsFillPersonFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "../css/NavigationBar.css";

function NavigationBarPost() {
  const [showElement, setShowElement] = useState(false);

  useState(true);
  return (
    <div>
      <Navbar>
        <Container>
          <Nav className="button">
            <Link to="/home" className="unclick">
              <AiFillHome />
            </Link>
            <Link to="/chat" className="unclick">
              <BsFillChatLeftDotsFill />
            </Link>
            <Link to="/post" className="click">
              <BiMessageSquareAdd />
            </Link>
            <Link to="/info" className="unclick">
              <BsFillPersonFill />
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBarPost;
