import { getDesign } from "../../utils";
import { useAppSelector } from "../../hooks/useAppDispatch";
import CartItem from "./CartItem";
import classes from "./Cart.module.scss";
import Button from "../button/Button";
import emptyCart from "../../assets/images/cart.png";
import { useBackToShop } from "../../hooks/useBackToShop";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const numberOfItems = useAppSelector((state) => state.cart.totalQuantity);
  const totalPrice = useAppSelector((state) => state.cart.total);
  const designVersion = useAppSelector((state) => state.config.designVersion);

  const backToShop = useBackToShop();

  return (
    <div className={classes.cart}>
      <ul
        className={
          numberOfItems === 0
            ? ""
            : `${classes.cartWithItems} ${getDesign(designVersion, classes)}`
        }
      >
        {numberOfItems === 0 ? (
          <div className={classes.emptyCart}>
            <img src={emptyCart} alt="Empty cart" />
            <li>
              Your cart is <span>empty</span>.
            </li>
            <Button className={classes.backToShopBtn} onClick={backToShop}>
              🛍️ RETURN TO SHOP
            </Button>
          </div>
        ) : (
          <>
            {" "}
            <div className={classes.backToShop} onClick={backToShop}>
              Back to sh<span>o</span>p🛍️
            </div>
            <h3 className={classes.shoppingCart}>🛒Shopping Cart</h3>
            <div className={classes.items}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    total: item.totalPrice,
                    price: item.price,
                    image: item.image,
                  }}
                />
              ))}
            </div>
            <footer>
              <p className={classes.privacy}>
                By continuing, I declare that I have read and accept the
                Purchase Conditions and understand Privacy and Cookie Policy.
              </p>
              <div className={classes.totalPrice}>
                <span className={classes.total}>TOTAL</span>
                <div className={classes.sum}>
                  <span className={classes.dolar}>
                    ${totalPrice.toFixed(2)}
                  </span>
                  <div>* Taxes included</div>{" "}
                </div>
                <Button className={classes.continueBtn}>CONTINUE</Button>
              </div>
            </footer>
          </>
        )}
      </ul>
    </div>
  );
};

export default Cart;
