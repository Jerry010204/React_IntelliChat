import NavigationBar from "./component/NavigationBar";
import Home from "./pages/tsx/Home";
import Chat from "./pages/tsx/Chat";
import Info from "./pages/tsx/PersonalInfo";
import Post from "./pages/tsx/Post";
import Login from "./pages/tsx/Login";

import { Route, Routes } from "react-router-dom";

function WholePage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/post" element={<Post />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
}

export default WholePage;
