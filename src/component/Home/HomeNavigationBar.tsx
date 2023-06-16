import { IoMdNotificationsOutline } from "react-icons/io";

import AppIcon from "../../assets/AppLogo.png";
import { BsSortUp } from "react-icons/bs";

import "./css/topNavigationBar.css";

export default function HomeNavigationBar() {
  return (
    <div className="topbar">
      <div>
        <img className="userIcon" src={AppIcon} alt="" />
        <div className="appName">ChatAI</div>
        <BsSortUp className="ring" />
      </div>
    </div>
  );
}
