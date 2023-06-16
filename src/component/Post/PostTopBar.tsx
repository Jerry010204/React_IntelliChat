import "./css/PostTopBar.css";
import { AiOutlineHistory } from "react-icons/ai";

export default function PostTopBar() {
  return (
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
        我的記錄
      </p>
      <button className="postButton">發佈</button>
    </div>
  );
}
