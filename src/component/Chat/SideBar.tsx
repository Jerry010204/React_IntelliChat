import { Link } from "react-router-dom";
import "../../assets/chatGPT.jpg";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";

interface item {
  id: number;
  text: string;
  deleted: boolean;
}
function Sidebar() {
  const [input, setInput] = useState<string>("");
  const [chats, setChats] = useState<item[]>([
    { id: 1, text: "qeustion1", deleted: false },
  ]);

  const handleToggle = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const addChat = () => console.log("123");

  return (
    <div>
      <div className="topnavbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars className="FaBars" onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose
                style={{ color: "#dddee4" }}
                onClick={showSidebar}
              />
            </Link>
          </li>
          <li className="nav-text">
            <Link to="#" className="menu-bars">
              <BsFillChatFill />
              <span>更多對話框</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="#" className="menu-bars">
              <BsFillChatFill />
              <span>即將推出</span>
            </Link>
          </li>

          <li className="add-text">
            <Link to="#" className="menu-bars" onClick={addChat}>
              <BiMessageSquareAdd style={{ fontSize: "150%" }} />
              <span>Add</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Add more chats"
    //     onChange={(e) => setInput(e.currentTarget.value)}
    //   />
    //   <button onClick={handleClick}>add New Chat</button>

    //   <ul>
    //     {chats.map((chat) => (
    //       <li>
    //         <button
    //           key={chat.id}
    //           onClick={() => handleToggle(chat.id)}
    //           style={{ height: "20px", width: "50px" }}
    //         >
    //           {chat.text}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default Sidebar;
