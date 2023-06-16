import LoginButton from "../../component/Login/login";
import LogoutButton from "../../component/Login/logout";
import LoginButtonFacebook from "../../component/Login/loginFacebook";
import { useState, useEffect, FormEvent } from "react";
import { gapi } from "gapi-script";
import { BiErrorAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LogoName from "../../assets/logoName.png";
import LogoNameW from "../../assets/logoNameW.png";
import AppLogoW from "../../assets/AppLogoW.png";

import "../css/Login.css";

const client_id =
  "427138427725-gleujneuj8vgnhfeah1bqircaeug6phs.apps.googleusercontent.com";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const [currentLoginState, setCurrentLoginState] = useState("Login");
  const [registInfo, setregistInfo] = useState({
    registUsername: "",
    registEmail: "",
    registPassword: "",
    registComfirmPassword: "",
  });
  const [validRegistInfo, setValidRegistInfo] = useState({
    validRegistUsername: true,
    validRegistEmail: true,
    validRegistPassword: true,
    validRegistComfirmPassword: true,
  });
  const [loginInfo, setLoginInfo] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  const [usernameExist, setUsernameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      registInfo.registUsername != "" &&
      registInfo.registEmail != "" &&
      registInfo.registPassword != "" &&
      registInfo.registComfirmPassword != ""
    ) {
      if (
        (validRegistInfo.validRegistUsername,
        validRegistInfo.validRegistEmail,
        validRegistInfo.validRegistPassword,
        validRegistInfo.validRegistComfirmPassword)
      ) {
        const response = fetch(`http://localhost:8080/api/v1/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: registInfo.registUsername,
            name: registInfo.registUsername,
            email: registInfo.registEmail,
            password: registInfo.registPassword,
          }),
        });
        if ((await response).ok) {
          response
            .then((token) => token.json())
            .then((result) => {
              if (result.error != null) {
                if (result.error.includes("Username already exists")) {
                  setUsernameExist(true);
                  setTimeout(() => {
                    setUsernameExist(false);
                  }, 1000);
                } else if (result.error.includes("Email already exists")) {
                  setEmailExist(true);
                  setTimeout(() => {
                    setEmailExist(false);
                  }, 1000);
                }
              } else {
                localStorage.setItem("refresh-token", result.accessToken);
                localStorage.setItem("access-token", result.refreshToken);
                navigate("/home");
              }
            });
        } else {
        }
      }
    }
  };

  const [wrongPW, setWrongPW] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      const response: Promise<Response> = fetch(
        `http://localhost:8080/api/v1/auth/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginInfo.loginUsername,
            password: loginInfo.loginPassword,
          }),
        }
      );
      if ((await response).ok) {
        response
          .then((promise) => promise.json())
          .then((result) => {
            localStorage.setItem("access-token", result.accessToken);
            localStorage.setItem("refresh-token", result.refreshToken);
            navigate("/home");
          });
        setWrongPW(false);
      } else {
        setWrongPW(true);
      }
    } catch (error: any) {
      console.error("API call failed with error", error);
      setWrongPW(true);
    }
  };

  return (
    <div>
      <div className="upperBack"></div>
      <div className="LoginPage">
        <img
          src={AppLogoW}
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100px",
            width: "100px",
          }}
        />
        <img
          src={LogoNameW}
          style={{
            position: "fixed",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100px",
            width: "500px",
          }}
        />

        <div
          style={{
            position: "fixed",
            top: currentLoginState == "Signup" ? 235 : 140,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "70px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "200px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid",
                  borderColor: "grey",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "rgb(54, 51, 153)",
                    top: 0,
                    left: currentLoginState == "Signup" ? 0 : "100px",
                    right: currentLoginState == "Signup" ? "100px" : 0,
                    bottom: 0,
                    overflow: "hidden",
                    transition: "left 0.4s linear, right 0.5s ease-in-out",
                  }}
                ></div>
                <button
                  type="button"
                  className="switchButton1"
                  style={{
                    color: currentLoginState == "Signup" ? "white" : "black",
                    transition: "color 0.4s ease-in",
                  }}
                  onClick={() => {
                    loginInfo.loginUsername = "";
                    loginInfo.loginPassword = "";
                    setCurrentLoginState("Signup");
                    setWrongPW(false);
                  }}
                >
                  Signup
                </button>
                <button
                  type="button"
                  className="switchButton2"
                  style={{
                    color: currentLoginState == "Signup" ? "black" : "white",
                    transition: "color 0.4s ease-in",
                  }}
                  onClick={() => {
                    registInfo.registUsername = "";
                    registInfo.registEmail = "";
                    registInfo.registPassword = "";
                    registInfo.registComfirmPassword = "";
                    setCurrentLoginState("Login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
            {currentLoginState == "Signup" ? (
              <div>
                <div>
                  {/* <label className="registerLabel">Username</label> */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="registInput"
                      name="username"
                      style={{ padding: "15px", margin: "10px 0px" }}
                      placeholder="Username"
                      value={registInfo.registUsername}
                      onChange={(e) => {
                        if (e.target.validity.valid) {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistUsername: true,
                          });
                        } else {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistUsername: false,
                          });
                        }

                        setregistInfo({
                          ...registInfo,
                          registUsername: e.target.value,
                        });
                      }}
                      minLength={4}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <span
                  className="errorMessage"
                  style={{
                    opacity: validRegistInfo.validRegistUsername ? "0" : "1",
                  }}
                >
                  Username must be at least 4 characters long!
                </span>
                <div>
                  {/* <label className="registerLabel">Email</label> */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="registInput"
                      name="email"
                      style={{ padding: "15px", margin: "10px 0px" }}
                      placeholder="Email"
                      value={registInfo.registEmail}
                      onChange={(e) => {
                        if (e.target.validity.valid) {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistEmail: true,
                          });
                        } else {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistEmail: false,
                          });
                        }
                        setregistInfo({
                          ...registInfo,
                          registEmail: e.target.value,
                        });
                      }}
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  <span
                    className="errorMessage"
                    style={{
                      opacity: validRegistInfo.validRegistEmail ? "0" : "1",
                    }}
                  >
                    It must be a valid email address!
                  </span>
                </div>
                <div>
                  {/* <label className="registerLabel">Password</label> */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="registInput"
                      name="password"
                      style={{ padding: "15px", margin: "10px 0px" }}
                      placeholder="Password"
                      value={registInfo.registPassword}
                      onChange={(e) => {
                        if (e.target.validity.valid) {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistPassword: true,
                          });
                        } else {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistPassword: false,
                          });
                        }

                        setregistInfo({
                          ...registInfo,
                          registPassword: e.target.value,
                        });
                      }}
                      minLength={8}
                      maxLength={16}
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <span
                  className="errorMessage"
                  style={{
                    opacity: validRegistInfo.validRegistPassword ? "0" : "1",
                  }}
                >
                  Password must be 8 - 16 characters long!
                </span>
                <div>
                  {/* <label className="registerLabel">Comfirm Password</label> */}

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="registInput"
                      name="comfirmPassword"
                      style={{ padding: "15px", margin: "10px 0px" }}
                      placeholder="Comfirm Password"
                      value={registInfo.registComfirmPassword}
                      onChange={(e) => {
                        if (e.target.value == registInfo.registPassword) {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistComfirmPassword: true,
                          });
                        } else {
                          setValidRegistInfo({
                            ...validRegistInfo,
                            validRegistComfirmPassword: false,
                          });
                        }
                        setregistInfo({
                          ...registInfo,
                          registComfirmPassword: e.target.value,
                        });
                      }}
                      minLength={8}
                      maxLength={16}
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <span
                  className="errorMessage"
                  style={{
                    opacity: validRegistInfo.validRegistComfirmPassword
                      ? "0"
                      : "1",
                  }}
                >
                  Password don't match!
                </span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="submitRegisterButton">
                    Create Account
                  </button>
                </div>
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      opacity: usernameExist ? 1 : 0,
                      transition: "opacity 300ms",
                    }}
                  >
                    <BiErrorAlt />
                    Username already exists
                  </div>
                </div>

                <div
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      opacity: emailExist ? 1 : 0,
                      transition: "opacity 300ms",
                    }}
                  >
                    <BiErrorAlt />
                    Email already exists
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {/* <label className="registerLabel">Username</label> */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="LoginInput"
                      name="username"
                      style={{ padding: "15px", margin: "10px 0px" }}
                      placeholder="Username"
                      value={loginInfo.loginUsername}
                      onChange={(e) => {
                        setLoginInfo({
                          ...loginInfo,
                          loginUsername: e.target.value,
                        });
                      }}
                      minLength={4}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div>
                  {/* <label className="registerLabel">Password</label> */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      className="LoginInput"
                      name="password"
                      style={{ padding: "15px", margin: "10px 15px" }}
                      placeholder="Password"
                      value={loginInfo.loginPassword}
                      onChange={(e) => {
                        setLoginInfo({
                          ...loginInfo,
                          loginPassword: e.target.value,
                        });
                      }}
                      minLength={8}
                      maxLength={16}
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <span
                  className="errorMessage"
                  style={{
                    opacity: wrongPW ? "1" : "0",
                  }}
                >
                  The username or password is incorrect!
                </span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="submitLoginButton"
                    onClick={() => handleLoginSubmit()}
                  >
                    Login
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "15px",
                  }}
                >
                  <LoginButton />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                ></div>
                {/* <LoginButtonFacebook /> */}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
