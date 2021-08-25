import { useSelector } from "react-redux";
import { useEffect } from "react";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);

  try {
    useEffect(() => {
      if (!currentUser) {
        props.history.push("/login");
      }
    }, [currentUser]);

    return currentUser;
  } catch (e) {
    console.log(e);
  }
};

export default useAuth;
