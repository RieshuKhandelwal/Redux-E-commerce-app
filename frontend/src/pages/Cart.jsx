import { useSelector, useDispatch } from "react-redux";
import CartCard from "./CartCard";
import { useParams } from "react-router-dom";

const Cart = () => {
  const userId = useParams().uid; 
  const carts = useSelector((state) => state.cartReducer.carts);
  const products = useSelector((state)=>state.productReducer.products);

  const userCart = carts.find((cart) => cart.userId === userId);

  if (!userCart) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
        <div className="text-gray-400">No cart found for this user.</div>
      </div>
    );
  }

  if (!userCart.productsArray || userCart.productsArray.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
        <div className="text-gray-400">Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
      {userCart.productsArray.map((item, idx) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return (
          <CartCard
            key={idx}
            product={product}
            quantity={item.quantity}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

export default Cart;