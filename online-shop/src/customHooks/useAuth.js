import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/paths";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.replace(LOGIN_ROUTE);
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
