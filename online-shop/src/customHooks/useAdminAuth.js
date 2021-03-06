import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkUserIsAdmin } from "../utils/checkUserIsAdmin";
import { LOGIN_ROUTE } from "../utils/paths";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.replace(LOGIN_ROUTE);
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuth;
