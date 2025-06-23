import { useDispatch } from 'react-redux';
import { asyncDecreaseQuantity, asyncIncreaseQuantity } from '../store/actions/cartActions';

const CartCard = ({ product, quantity,userId }) => {

  const dispatch = useDispatch();
  const onIncrease = () => {
    dispatch(asyncIncreaseQuantity({ userId, productId: product.id }));
  }
  const onDecrease = () => {
    dispatch(asyncDecreaseQuantity({ userId, productId: product.id }));
  }

  

  return (
  <div className="flex items-center bg-gray-800 rounded-lg shadow-md p-4 mb-4">
    <img
      src={product.image}
      alt={product.title}
      className="w-20 h-20 object-cover rounded-lg mr-4 border border-gray-700"
    />
    <div className="flex-1">
      <h2 className="text-lg font-bold text-white">{product.title}</h2>
      <p className="text-blue-400 font-semibold">${product.price}</p>
    </div>
    <div className="flex items-center gap-2">
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        onClick={onDecrease}
      >
        -
      </button>
      <span className="text-white font-bold px-2">{quantity}</span>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  </div>
  )
}

export default CartCard


