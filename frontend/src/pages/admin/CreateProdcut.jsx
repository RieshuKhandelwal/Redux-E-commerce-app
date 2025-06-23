import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { asyncAddProduct } from '../../store/actions/productActions';
import { toast } from 'react-toastify';

const CreateProdcut = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productHandler = (product) => {
    product.id = nanoid();
    console.log("Product created:", product);
    dispatch(asyncAddProduct(product));
    reset();
    navigate("/products");
    toast.success("Product listed successfully");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-blue-400 mb-6 flex items-center justify-center gap-2">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create New Product
        </h1>
        <form onSubmit={handleSubmit(productHandler)} className="flex flex-col gap-4">
          <div>
            <input className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none" {...register("title", { required: "Title can't be empty" })} type="text" placeholder="Product Title" />
            <small className="text-red-400">{errors?.title?.message}</small>
          </div>
          <div>
            <input className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none" {...register("price", { required: "Valid price required" })} type="number" step="0.01" placeholder="Price (e.g. 19.99)" />
            <small className="text-red-400">{errors?.price?.message}</small>
          </div>
          <div>
            <textarea className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none resize-none" {...register("description", { required: "Description required" })} placeholder="Description" rows={3}></textarea>
            <small className="text-red-400">{errors?.description?.message}</small>
          </div>
          <div>
            <input className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none" {...register("image", { required: "Image URL required" })} type="url" placeholder="Image URL" />
            <small className="text-red-400">{errors?.image?.message}</small>
          </div>
          <div>
            <input className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 outline-none" {...register("category", { required: "Category required" })} type="text" placeholder="Category" />
            <small className="text-red-400">{errors?.category?.message}</small>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg transition-all duration-200">
            Create Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProdcut
