import { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../context/cart.context";

const CheckOut = () => {
  const { cartItems, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  return (
    <div>
      <h1>Checkout page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => addItemToCart(cartItem)}>Increment</span>
              <br />
              <span onClick={() => removeItemToCart(cartItem)}>Decrement</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckOut;
