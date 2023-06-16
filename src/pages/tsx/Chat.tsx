import NavigationBarChat from "../../component/NavigationBar/tsx/NavigationBarChat";
import GPTicon from "../../assets/chatGPT3.5.jpg";
import ChatBox from "../../component/Chat/ChatBox";
import "../css/Chat.css";
import Sidebar from "../../component/Chat/SideBar";
import ChatsBar from "../../component/Chat/ChatsBar";
export default function Chat() {
  return (
    <div
      style={{
        backgroundColor: " #282c34 ",
        position: "absolute",
        top: "0%",
        bottom: "0%",
        width: "100%",
        overflow: "auto",
      }}
    >
      <ChatsBar />
      <img
        src={GPTicon}
        alt=""
        style={{
          position: "fixed",
          top: "1.5%",
          left: "35%",
          width: "32px",
          height: "32px",
          borderRadius: "7px",
        }}
      />
      <p
        style={{
          position: "fixed",
          top: "2%",
          left: "46%",
          color: "#dddee4",
          fontWeight: "bold",
        }}
      >
        ChatGPT-3.5
      </p>
      <ChatBox />
      <NavigationBarChat />
    </div>
  );
}
