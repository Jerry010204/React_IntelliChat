import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

export default function LoginButtonFacebook() {
  const navigate = useNavigate();

  return (
    <div id="signInButton">
      <LoginSocialFacebook
        className="LoginButtonFacebook"
        appId="306630d22c62fc5875e70ffc0a129e23"
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton text="Sign in with Facebook" />
      </LoginSocialFacebook>
    </div>
  );
}
