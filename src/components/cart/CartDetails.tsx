import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import classes from "./CartDetails.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/slices/cart-slice";

const CartDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.cart.selectedItem);
  const backToShop = () => {
    navigate(`/products`, { replace: true });
  };
  const addItemToCart = () => {
    dispatch(
      cartActions.addItemTocart({
        title: product.title,
        price: product.price,
        image: product.image,
        id: product.id,
      })
    );
    navigate("/cart", { replace: true });
  };
  return (
    <div className={classes.cart}>
      <Button className={classes.button} onClick={backToShop}>
        🛒
      </Button>
      <div className={classes.image}>
        {" "}
        <img src={product.image} alt={product.title} />
      </div>
      <div className={classes.details}>
        <div className={classes.name}>{product.title}</div>

        <div className={classes.price}>Price: ${product.price}</div>
        <Button className={classes.addButton} onClick={addItemToCart}>
          ADD
        </Button>
        <div className={classes.description}>{product.description}</div>
      </div>
    </div>
  );
};

export default CartDetails;
