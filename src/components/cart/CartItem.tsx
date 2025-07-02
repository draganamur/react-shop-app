import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  removeItemFromCart,
  addItemTocart,
} from "../../store/slices/cart-slice";
import classes from "./Cart.module.scss";
import { CartItemProps } from "../../interfaces/index";
import { getDesign } from "../../utils";
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const designVersion = useAppSelector((state) => state.config.designVersion);

  const dispatch = useAppDispatch();

  const removeItemHandler = () => {
    dispatch(
      removeItemFromCart({
        id: item.id,
      })
    );
  };

  const addItemHandler = () => {
    dispatch(
      addItemTocart({
        id: item.id,
        title: item.title,
        price: item.price,
      })
    );
  };
  return (
    <li className={`${classes.cartItem} ${getDesign(designVersion, classes)}`}>
      <header>
        <h3>{item.title}</h3>
      </header>
      <div className={classes.details}>
        <div className={classes.content}>
          <img src={item.image} alt={item.title} />
          <span className={classes.price}>
            ${item.total.toFixed(2)} <i>(${item.price}/item)</i>
          </span>
        </div>
        <div className={classes.footer}>
          <button onClick={removeItemHandler}>-</button>
          <div className={classes.quantity}>
            x <span>{item.quantity}</span>
          </div>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
