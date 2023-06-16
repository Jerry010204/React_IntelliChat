import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillChatLeftDotsFill, BsFillPersonFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import gpt from "../assets/chatGPT.jpg";
import "./NavigationBar.css";

function NavigationBar() {
  const [state, setState] = useState("");
  function handleClick({ path }: Props) {
    setState(path);
  }
  return (
    <Navbar>
      <Container>
        <Nav className="button">
          <Link
            to="/home"
            onClick={() => handleClick({ path: "home" })}
            className={state === "home" ? "click" : "unclick"}
          >
            <AiFillHome />
          </Link>
          <Link
            to="/chat"
            onClick={() => handleClick({ path: "chat" })}
            className={state === "chat" ? "click" : "unclick"}
          >
            <img src={gpt} alt="" />
          </Link>
          <Link
            to="/post"
            onClick={() => handleClick({ path: "post" })}
            className={state === "post" ? "click" : "unclick"}
          >
            <BiMessageSquareAdd />
          </Link>
          <Link
            to="/info"
            onClick={() => handleClick({ path: "info" })}
            className={state === "info" ? "click" : "unclick"}
          >
            <BsFillPersonFill />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

interface Props {
  path: string;
}

export default NavigationBar;
