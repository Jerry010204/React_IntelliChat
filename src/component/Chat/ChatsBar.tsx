import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./css/SideBar.css";
import Sidebar from "./SideBar";

interface item {
  id: number;
  text: string;
  url: string;
}

export default function ChatsBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [input, setInput] = useState<string>("");
  const [chats, setChats] = useState<item[]>([
    { id: 1, text: "qeustion1", url: "1" },
  ]);

  const handleClick = () => {
    const newChat: item = {
      id: Date.now(),
      text: input,
      url: String(Date.now()),
    };
    setChats([...chats, newChat]);
  };

  const handleToggle = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };
  return (
    <Sidebar />
    // <>
    //   <div className="chatsBar" style={{ zIndex: 0 }}>
    //     <FaIcons.FaBars className="threeBar" onClick={showSidebar} />
    //   </div>

    //   <nav className="sidebar1">
    // {/* <li>
    //   <ul className={sidebar ? "sidebarActive" : "sidebar"}>chat1</ul>
    //   <ul className={sidebar ? "sidebarActive" : "sidebar"}>chat1</ul>
    // </li>
    // <input
    //   type="text"
    //   placeholder="Add more chats"
    //   onChange={(e) => setInput(e.currentTarget.value)}
    //   style={{ zIndex: 1 }}
    // />
    // <button onClick={handleClick}>add New Chat</button>
    // <ul>
    //   {chats.map((chat) => (
    //     <li>
    //       <a href={chat.url}> {chat.text}</a>

    //       <button
    //         key={chat.id}
    //         onClick={() => handleToggle(chat.id)}
    //         style={{ height: "20px", width: "50px" }}
    //       ></button>
    //     </li>
    //   ))}
    // </ul> */}
    // </nav>
    // </>
  );
}
