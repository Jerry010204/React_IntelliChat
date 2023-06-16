import { AiFillLike } from "react-icons/ai";
import { AiOutlineRead, AiOutlineClose } from "react-icons/ai";
import "./css/HomeBox.css";
import "./css/HomeModel.css";
import { useNavigate } from "react-router-dom";
import ChatGPT3 from "../../assets/chatGPT3.5.jpg";
import { useState, useEffect, FormEvent } from "react";
import LogoutButton from "../Login/logout";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import AppIcon from "../../assets/AppLogo.png";
import { BsSortUp } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import "./css/topNavigationBar.css";

interface Chat {
  question: string;
  answer: string;
  user: User;
}

interface Post {
  id: number;
  createdAt: string;
  chat: Chat;
}

interface User {
  name: string;
  imageUrl: string;
}
interface PostWithLike {
  id: number;
  date: string;
  chat: Chat;
  like: number;
  index: number;
  icon: string;
}

export default function HomeBox() {
  const [userData, setUserData] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [onClickContent, setOnClickContent] = useState<PostWithLike>({
    id: 0,
    date: "-",
    chat: { question: "", answer: "", user: { name: "-", imageUrl: "-" } },
    like: 0,
    index: 0,
    icon: "-",
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentLike, setCurrentLike] = useState<number>();
  const [currentView, setCurrentView] = useState<number>();
  const [currentUsername, setCurrentUsername] = useState<string>("-");
  const [currentIcon, setCurrentIcon] = useState<String>("");

  const [likeData, setLikeData] = useState<number[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [triggerViews, setTriggerViews] = useState<boolean>(false);

  const [viewData, setViewData] = useState<number[]>([]);
  const [showSortList, setShowSortList] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>("hot");
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentSort == "new") {
      fetch("http://localhost:8080/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    } else {
      fetch("http://localhost:8080/posts?orderBy=LikeAndView", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, [currentSort]);

  useEffect(() => {
    const postIds = userData.map((post) => post.id);
    const likePromises = postIds.map((postId) =>
      fetch(`http://localhost:8080/likes/post/${postId}/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
    );
    Promise.all(likePromises)
      .then((data) => {
        setLikeData(data);
        setCurrentLike(data[currentIndex]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData, liked]);

  useEffect(() => {
    const postIds = userData.map((post) => post.id);
    const likePromises = postIds.map((postId) =>
      fetch(`http://localhost:8080/views/post/${postId}/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
    );
    Promise.all(likePromises)
      .then((data) => {
        setViewData(data);
        setCurrentView(data[currentIndex]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData, triggerViews]);

  function handleClick(
    id: number,
    date: string,
    chat: Chat,
    like: number,
    index: number,
    username: string,
    icon: string
  ) {
    setIsOpen(true);
    setOnClickContent({
      id: id,
      date: date,
      chat: chat,
      like: like,
      index: index,
      icon: icon,
    });
    setCurrentUsername(username);
    setCurrentIndex(index);
    setCurrentLike(likeData[index]);
    fetch(`http://localhost:8080/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ postId: id }),
    }).then(() => {
      setTriggerViews(!triggerViews);
    });
  }

  useEffect(() => {
    if (onClickContent.id !== undefined) {
      fetch(`http://localhost:8080/likes/${onClickContent.id}/isLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data: boolean) => {
          setLiked(data);
        });
    }
  }, [onClickContent]);

  const handleClickModel = (): void => {
    fetch(`http://localhost:8080/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ postId: onClickContent.id }),
    }).then(() => {
      setLiked(!liked);
    });
  };

  useEffect(() => {
    async function validateUser() {
      const response: Promise<Response> = fetch(
        `http://localhost:8080/api/v1/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh-token")}`,
          },
        }
      );
      if ((await response).ok) {
        response
          .then((response) => response.json())
          .then((response) => {
            if (response.accessToken != null) {
              localStorage.setItem("access-token", response.accessToken);
              localStorage.setItem("refresh-token", response.refreshToken);
            }
          });
      }
    }
    validateUser();
  }, []);
  return (
    <div>
      <div className="topbar">
        <img className="userIcon" src={AppIcon} alt="" />
        <div className="appName">ChatAI</div>
        <BiLogOut
          className="logout"
          onClick={() => setShowLogout(!showLogout)}
        />
        <BsSortUp
          className="ring"
          onClick={() => {
            setShowSortList(!showSortList);
          }}
        />
        <div
          style={{
            position: showSortList ? "fixed" : "static",
            top: "48px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: showSortList ? "rgba(0, 0, 0, .5)" : "",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              marginTop: "-3px",
              opacity: showSortList ? 1 : 0,
              height: showSortList ? "85px" : "0px",
              transition: "opacity 300ms, height 300ms",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                paddingTop: "11px",
                color: currentSort == "new" ? "rgb(72,72,72)" : "grey",
                fontSize: "15px",
                display: showSortList ? "" : "none",
                textDecoration: currentSort == "new" ? "underline" : "",
                textUnderlineOffset: "4px",
              }}
              onClick={() => {
                setCurrentSort("new");
                setShowSortList(!showSortList);
              }}
            >
              最新
            </div>
            <hr style={{ margin: "7px", opacity: 0.1 }} />
            <div
              style={{
                marginLeft: "10px",
                paddingTop: "1px",
                color: currentSort == "hot" ? "rgb(72,72,72)" : "grey",
                fontSize: "15px",
                display: showSortList ? "" : "none",
                textDecoration: currentSort == "hot" ? "underline" : "",
                textUnderlineOffset: "4px",
              }}
              onClick={() => {
                setCurrentSort("hot");
                setShowSortList(!showSortList);
              }}
            >
              熱門
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "47px",
          transition: "height 300ms",
        }}
      ></div>
      <div
        style={{
          display: showLogout ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          position: showLogout ? "fixed" : "static",
          top: "48px",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: showLogout ? "rgba(0, 0, 0, .5)" : "",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, .5)",
          }}
        >
          <AiOutlineClose
            style={{
              position: "absolute",
              right: "11px",
              top: "10px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            onClick={() => {
              setShowLogout(false);
            }}
          />
          <p style={{ fontWeight: "bold", color: "grey", marginTop: "20px" }}>
            Are you sure you want to log out?
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ display: "block" }}>
              <LogoutButton />
            </div>
            <div style={{ display: "block" }}>
              <button
                style={{
                  backgroundColor: "rgb(91, 91, 187)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "110px",
                  height: "44px",
                }}
                onClick={() => navigate("/")}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {userData.map((post, index) => (
          <div
            className="HomeBox"
            key={index}
            onClick={() => {
              handleClick(
                post.id,
                post.createdAt,
                post.chat,
                likeData[index],
                index,
                post.chat.user.name,
                post.chat.user.imageUrl
              );
            }}
          >
            <div className="title1">{post.chat.question} </div>
            <div className="answer">{post.chat.answer}</div>

            <div className="boxInfo">
              <AiFillLike className="likeIcon" />
              <div className="like">{likeData[index]}</div>
              <AiOutlineRead className="readIcon" />
              <div className="read">{viewData[index]}</div>
              {post.chat.user.imageUrl == null ? (
                <img className="icon" src={AppIcon} alt="" />
              ) : (
                <img className="icon" src={post.chat.user.imageUrl} alt="" />
              )}
              <div className="usernameInHomeBox">{post.chat.user.name}</div>
              <div className="dateInBox">
                {calculateTimePassed(post.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: 0,
          right: 0,
          bottom: "40px",
          background: "white",
          zIndex: 10,
          opacity: isOpen ? 1 : 0.2,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "opacity 300ms, transform 300ms",
          overflow: "scroll",
        }}
      >
        <div style={{}}>
          <div className="secondTopBar">
            <MdOutlineKeyboardArrowLeft
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                color: "GrayText",
                height: "40px",
                width: "40px",
              }}
            />
            <BsThreeDots
              style={{
                color: "GrayText",
                height: "32px",
                width: "32px",
                position: "absolute",
                right: "10px",
                top: "2px",
              }}
            />
          </div>
          <MdOutlineKeyboardArrowLeft
            style={{ height: "40px", width: "40px" }}
          />
          <p className="model-question">{onClickContent.chat.question}</p>
          {/* // working */}
          <img
            src={onClickContent.icon == null ? AppIcon : onClickContent.icon}
            style={{
              marginLeft: "10px",
              width: "25px",
              height: "25px",
              borderRadius: "7px",
            }}
          />
          <div
            style={{
              marginTop: "10px",
              marginLeft: "8px",
              display: "inline-block",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            {currentUsername}
          </div>
          <hr className="horizontalBar" />
          <img
            className="icon"
            src={ChatGPT3}
            style={{
              marginLeft: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "7px",
            }}
          />
          <div
            style={{
              marginLeft: "10px",
              display: "inline-block",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Chat-GPT
          </div>
          <p className="model-answer">{onClickContent.chat.answer}</p>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: "38px",
          fontSize: "22px",
          background: "white",
          zIndex: 10,
          height: "40px",
          opacity: isOpen ? 1 : 0.2,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "opacity 300ms, transform 300ms",
          overflow: "scroll",
        }}
      >
        <div style={{ position: "absolute", right: "60px" }}>
          <FaHeart
            onClick={handleClickModel}
            color={liked ? "red" : "#ffbebe"}
          />
          {currentLike}
          <AiOutlineRead style={{ marginLeft: "18px" }} />
          {currentView}
        </div>
      </div>
    </div>
  );
}

function calculateTimePassed(localDateTime: string) {
  const localDt = new Date(localDateTime);
  const now = new Date();
  const timeDiff = now.getTime() - localDt.getTime();
  const timePassedSeconds = Math.floor(timeDiff / 1000);
  if (timePassedSeconds < 60) {
    return Math.floor(timePassedSeconds) + "秒前";
  } else if (timePassedSeconds < 3600) {
    return Math.floor(timePassedSeconds / 60) + "分鐘前";
  } else if (timePassedSeconds < 86400) {
    return Math.floor(timePassedSeconds / 3600) + "小時前";
  } else if (timePassedSeconds < 604800) {
    return Math.floor(timePassedSeconds / 86400) + "天前";
  } else if (timePassedSeconds < 2592000) {
    return Math.floor(timePassedSeconds / 604800) + "週前";
  } else if (timePassedSeconds < 31536000) {
    return Math.floor(timePassedSeconds / 2592000) + "月前";
  } else {
    return Math.floor(timePassedSeconds / 31536000) + "年前";
  }
}
