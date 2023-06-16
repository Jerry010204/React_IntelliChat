import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const client_id =
  "427138427725-gleujneuj8vgnhfeah1bqircaeug6phs.apps.googleusercontent.com";

export default function LogoutButton() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/");
  };

  return (
    <div id="signInButton">
      <GoogleLogout
        clientId={client_id}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
