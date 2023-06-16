import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useNavigate } from "react-router-dom";
const client_id =
  "427138427725-gleujneuj8vgnhfeah1bqircaeug6phs.apps.googleusercontent.com";

export default function LoginButton() {
  const navigate = useNavigate();

  function onSuccess(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void {
    navigate("/home");

    const username: string = response.profileObj.email;
    const name: string = response.profileObj.name;
    const email: string = response.profileObj.email;
    const imageUrl: string = response.profileObj.imageUrl;
    const password: string = response.profileObj.googleId;
    const authenticate = async () => {
      try {
        const response: Promise<Response> = fetch(
          `http://localhost:8080/api/v1/auth/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }
        );
        if ((await response).ok) {
          response
            .then((promise) => promise.json())
            .then((result) => {
              localStorage.setItem("access-token", result.accessToken);
              localStorage.setItem("refresh-token", result.refreshToken);
            });
        }
      } catch (error: any) {
        console.error("API call failed with error", error);
      }
    };

    const register = async () => {
      const response = fetch(`http://localhost:8080/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          name: name,
          email: email,
          imageUrl: imageUrl,
        }),
      });
      if ((await response).ok) {
        response
          .then((token) => token.json())
          .then((result) => {
            if (result.error == null) {
              localStorage.setItem("refresh-token", result.accessToken);
              localStorage.setItem("access-token", result.refreshToken);
            }
          });
      }
    };

    authenticate();
    register();
  }

  function onFailure(error: any): void {
    console.log(error);
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={client_id}
        buttonText="Sign in with Google "
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
