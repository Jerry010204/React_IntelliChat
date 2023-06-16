import { AiFillLike } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import "./css/PostBox.css";
import { useState, useEffect } from "react";
import "./css/PostTopBar.css";
import { AiOutlineHistory } from "react-icons/ai";
import Model from "./Model";
import NotFound from "../../assets/noDataFound.png";

interface Post {
  id: number;
  question: string;
  answer: string;
}

export default function PostBox() {
  const [onClick, setState] = useState(0);
  const [userData, setUserData] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [onClickContent, setOnClickContent] = useState<Post>();

  useEffect(() => {
    fetch("http://localhost:8080/chats/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setOnClickContent(data[0]);
      });
  }, []);

  function handleClick(
    index: number,
    question: string,
    answer: string,
    id: number
  ) {
    setState(index);
    setOnClickContent({ question: question, answer: answer, id: id });
  }
  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "38px",
          top: "0%",
          background: " #efeff4    ",
          display: "block",
          zIndex: "1",
        }}
      >
        <AiOutlineHistory
          style={{
            position: "absolute",
            top: "19%",
            left: "1.8%",
            fontSize: "140%",
          }}
        />
        <p
          style={{
            position: "absolute",
            left: "9%",
            top: "10%",
            fontSize: "18px",

            fontWeight: "600",
          }}
        >
          我的聊天記錄
        </p>
        <button className="postButton" onClick={() => setIsOpen(true)}>
          發佈
        </button>
      </div>
      <div style={{ height: "38px" }}></div>

      {userData.length == 0 ? (
        <div style={{ fontWeight: "600" }}>
          <img
            src={NotFound}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "70%",
              marginTop: "50%",
              height: "80%",
              display: "block",
            }}
          />
          <p style={{ color: "grey", textAlign: "center" }}>
            暫無記錄，你可以先嘗試與ChatGPT聊天！
          </p>
        </div>
      ) : (
        userData.map((post, index) => (
          <div
            className={onClick === index ? "ClickHomeBox" : "UnclickHomeBox"}
            key={index}
            onClick={() =>
              handleClick(index, post.question, post.answer, post.id)
            }
          >
            <div className="title">{post.question}</div>
            <div className="answer">{post.answer}</div>
          </div>
        ))
      )}
      <Model
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onClickContent={{
          question: onClickContent?.question,
          answer: onClickContent?.answer,
          chat_id: onClickContent?.id,
        }}
      ></Model>
    </div>
  );
}
