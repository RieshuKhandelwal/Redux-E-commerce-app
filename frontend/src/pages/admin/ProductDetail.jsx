import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { asyncDeleteProduct, asyncUpdateProduct } from '../../store/actions/productActions'
import { asyncAddToCart, asyncUpdateCart } from '../../store/actions/cartActions'

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.productReducer.products.find(p => p.id === id));
    const users = useSelector((state) => state.userReducer.users);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: product
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.cartReducer.carts) || [];
    
    if (!product) {
        return <div className='text-center text-white text-2xl mt-20'>Product not found</div>;
    }

    const updateProductHandler = (updatedProduct) => {
        console.log("updated product data", updatedProduct);
        dispatch(asyncUpdateProduct(id, updatedProduct));
        navigate("/products");
    }

    const deleteHandler = () => {
        dispatch(asyncDeleteProduct(id));
        navigate("/products");
    };

    const handleAddToCart = () => {
        if (!users) {
            navigate("/login");
            return;
        }
        // Find user's cart in Redux store
        const userCart = carts.find(cart => cart.userId === users.id);

        if (userCart) {
            // Check if product already in cart
            const existing = userCart.productsArray.find(p => p.productId === product.id);
            let updatedProductsArray;
            if (existing) {
                updatedProductsArray = userCart.productsArray.map(p =>
                    p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                updatedProductsArray = [...userCart.productsArray, { productId: product.id, quantity: 1 }];
            }
            dispatch(asyncUpdateCart({ ...userCart, productsArray: updatedProductsArray }));
        } else {
            // No cart for user, create new
            dispatch(asyncAddToCart({ userId: users.id, productId: product.id }));
        }
        navigate("/cart/" + users.id);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
            <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10">
                {/* Left: Product Details */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full max-w-xs h-auto rounded-xl shadow-lg border-4 border-white/20 mb-6"
                    />
                    <h1 className="text-4xl font-extrabold mb-2 text-blue-400">{product.title}</h1>
                    <p className="text-2xl font-semibold mb-2 text-green-400">${product.price}</p>
                    <p className="text-gray-200 mb-4 text-center">{product.description}</p>
                    <div className="flex flex-wrap gap-4 mb-2">
                        <span className="bg-blue-600/80 px-3 py-1 rounded-full text-sm font-medium">{product.category}</span>
                    </div>
                </div>
                {/* Right: Edit Form (top) + Buttons (bottom) */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Only show edit form and edit/delete buttons if user is logged in and isAdmin */}
                    {users && users?.isAdmin && (
                        <>
                            <form
                                onSubmit={handleSubmit(updateProductHandler)}
                                className="bg-gray-900/80 rounded-xl p-6 mb-8 shadow-lg flex flex-col gap-4"
                            >
                                <h2 className="text-2xl font-bold text-blue-300 mb-2 text-center">Edit Product</h2>
                                <input
                                    className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                                    {...register("title", { required: "Title can't be empty" })}
                                    type="text"
                                    placeholder="Product Title"
                                />
                                <input
                                    className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                                    {...register("price", { required: "Valid price required" })}
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                />
                                <textarea
                                    className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none resize-none"
                                    {...register("description", { required: "Description required" })}
                                    placeholder="Description"
                                    rows={3}
                                />
                                <input
                                    className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                                    {...register("image", { required: "Image URL required" })}
                                    type="url"
                                    placeholder="Image URL"
                                />
                                <input
                                    className="p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 outline-none"
                                    {...register("category", { required: "Category required" })}
                                    type="text"
                                    placeholder="Category"
                                />
                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2 transition"
                                >
                                    Save Changes
                                </button>
                            </form>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-bold shadow-lg"
                                    onClick={deleteHandler}
                                >
                                    Delete Product
                                </button>
                            </div>
                        </>
                    )}
                    {/* Add to Cart button is visible to all users */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        <button
                            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg font-bold shadow-lg"
                            onClick={()=>handleAddToCart(users?.id,id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail