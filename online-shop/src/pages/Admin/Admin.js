import React, { useState } from "react";
import "./admin.scss";
import Button from "../../components/Forms/Button/Button";
import { useSelector } from "react-redux";
import ShopMen from "../../assets/shopMens.jpg";
import Modal from "../../components/Modal/Modal";

const mapState = ({ user }) => ({
  user: user.currentUser,
});

const Admin = () => {
  const [modalActive, setModalActive] = useState(false);
  const currentUser = useSelector(mapState);

  return (
    <div className="admin">
      <h3 className="adminTitle">
        Welcome home
        <b className="text-uppercase"> {currentUser?.user?.displayName}</b> ,
        here you can add new card, or delete existing
      </h3>
      <Button onClick={() => setModalActive(true)} className="addProduct btn">
        Add new card
      </Button>

      <Modal active={modalActive} setActive={setModalActive} />

      <div className="cardWrapper">
        <ul>
          <li className="productItem">
            <img src={ShopMen} style={{ width: 100, height: 100 }} />
            <h2 className="cardInside">Name</h2>
            <h2 className="cardInside">$32</h2>
            <Button className="deleteProduct btn">Delete</Button>
          </li>
          <li className="productItem">
            <img src={ShopMen} style={{ width: 100, height: 100 }} />
            <h2 className="cardInside">Name</h2>
            <h2 className="cardInside">$32</h2>
            <Button className="deleteProduct btn">Delete</Button>
          </li>
          <li className="productItem">
            <img src={ShopMen} style={{ width: 100, height: 100 }} />
            <h2 className="cardInside">Name</h2>
            <h2 className="cardInside">$32</h2>
            <Button className="deleteProduct btn">Delete</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
