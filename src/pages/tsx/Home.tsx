import HomeBox from "../../component/Home/HomeBox";
import NavigationBarHome from "../../component/NavigationBar/tsx/NavigationBarHome";
import "../css/Home.css";
import "../../component/Home/css/HomeBox.css";

export default function Home() {
  return (
    <div className="main">
      <HomeBox />
      <NavigationBarHome />
    </div>
  );
}
