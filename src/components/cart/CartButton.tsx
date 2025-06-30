import classes from "../products/Products.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppDispatch";
import React, { useEffect, useState } from "react";
import { CartProps } from "../../interfaces/index";

const CartButton: React.FC<CartProps> = ({ className }) => {
  const numberOfItems = useAppSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const goToShop = () => {
    navigate(`/cart`, { replace: true });
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (numberOfItems === 0) return;

    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 400);

    return () => clearTimeout(timeout);
  }, [numberOfItems]);

  return (
    <div className={className}>
      <button onClick={goToShop}>🛒</button>
      <span className={`${classes.badge} ${animate ? classes.bounce : ""}`}>
        {numberOfItems}
      </span>
    </div>
  );
};

export default CartButton;
