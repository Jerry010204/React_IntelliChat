import AppLogo from "../../assets/AppLogo.png";
import { BsFillChatDotsFill, BsFileEarmarkPost } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaHotjar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import NavigationBarInfo from "../../component/NavigationBar/tsx/NavigationBarInfo";

import "../css/PersonalInfo.css";
import { useState, useEffect } from "react";

interface UserData {
  username: string;
  asked: string;
  viewed: string;
  liked: string;
}
export default function Info() {
  const directToPost = () => {
    window.location.pathname = "/post";
  };

  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [imageUrl, setImageUrl] = useState<String>("");
  const [chatNum, setChatNum] = useState<number>(0);
  const [viewNum, setViewNum] = useState<number>(0);
  const [likeNum, setLikeNum] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:8080/chats/me/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChatNum(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/views/me/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setViewNum(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/likes/me/count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeNum(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.name);
        setEmail(data.email);
        setImageUrl(data.imageUrl);
      });
  }, []);

  return (
    <div style={{}}>
      <img
        src={imageUrl == undefined ? AppLogo : imageUrl}
        alt=""
        style={{
          position: "absolute",
          top: "6%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50px",
        }}
      />
      <p
        style={{
          position: "absolute",
          top: "9%",
          left: "42%",
          fontSize: "200%",
          fontWeight: "bold",
          width: "50%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "inline-block",
          textOverflow: "ellipsis",
        }}
      >
        {username}
      </p>

      <p
        style={{
          position: "absolute",
          top: "15%",
          left: "42%",
          fontSize: "80%",
          color: "grey",
          width: "50%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {email}
      </p>
      <hr style={{ marginTop: "180px" }} />

      <UserData
        chated={chatNum.toString()}
        read={viewNum.toString()}
        liked={likeNum.toString()}
        size="30px"
        marginTop="0px"
        bottom="0px"
      />
      <UserData
        chated="已問"
        read="最近瀏覽"
        liked="已點讚"
        size="15px"
        marginTop="0px"
        bottom="13px"
      />
      {/* first box */}
      <a href="/chat">
        <div className="block">
          <p className="nestedBlockHeader">聊天</p>
          <div className="nestedBlock">
            <p className="nestedBlockContent">與ChatGPT-3.5聊天...</p>
            <BsFillChatDotsFill className="blockLogo" />
          </div>
        </div>
      </a>

      {/* second box */}

      <div className="block2and3">
        <p className="nestedBlockHeader">
          熱門話題 <FaHotjar className="hotTopic" />
        </p>
        <div className="nestedBlock2">
          <p className="nestedBlockContent2">如何透過ChatGPT賺錢？</p>
          <Button className="ask" disabled>
            <p style={{ fontSize: "1%", textAlign: "start" }}>問ChatGPT</p>
          </Button>
          <Button className="ignore" variant="secondary" disabled>
            <p style={{ fontSize: "1%", textAlign: "start" }}>略過</p>
          </Button>
        </div>
      </div>

      {/* third box */}

      <div onClick={directToPost} className="block2and3">
        <p className="nestedBlockHeader">
          分享你的問題...
          <BsFileEarmarkPost className="shareButton" />
        </p>
        <div className="nestedBlock3">
          <BiMessageSquareAdd
            onClick={directToPost}
            style={{
              position: "absolute",
              left: "45%",
              top: "28%",
              fontSize: "210%",
              color: "grey",
            }}
          />
        </div>
        <div className="nestedNestedBlock34"></div>
      </div>
      <div className="lastBlock">
        <p className="nestedBlockHeader">免費ChatGPT-4即將推出，敬請期待！</p>
      </div>
      <NavigationBarInfo />
    </div>
  );
}

interface Props {
  chated: string;
  read: string;
  liked: string;
  size: string;
  marginTop: string;
  bottom: string;
}

function UserData({ chated, read, liked, size, marginTop, bottom }: Props) {
  return (
    <ul
      style={{
        listStyle: "none",
        position: "relative",
        bottom: bottom,
        display: "flex",
        justifyContent: "space-around",
        fontSize: size,
        fontWeight: "bold",
        marginTop: marginTop,
      }}
    >
      <li style={{ display: "inline-block", marginRight: "1rem" }}>
        <a>{chated}</a>
      </li>
      <li style={{ display: "inline-block", marginRight: "1rem" }}>
        <a>{read}</a>
      </li>
      <li style={{ display: "inline-block", marginRight: "1rem" }}>
        <a>{liked}</a>
      </li>
    </ul>
  );
}
