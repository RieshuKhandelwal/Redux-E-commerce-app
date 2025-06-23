import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { asyncGetLoggedInUser} from '../store/actions/userActions';
import { loadUser } from '../store/reducers/userSlice';
import { toast } from 'react-toastify';
import axios from '../utils/axiosConfig';


const Login = () => {
  const navigate = useNavigate();
  const { register,reset,handleSubmit,formState:{errors} } = useForm();
  const dispatch = useDispatch();
  const loginHandler = async (user) => {
    try {
      // Check if user exists with given email and password
      const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`)
      if (data && data.length > 0) {
        // Save user in localStorage
        localStorage.setItem("user",JSON.stringify(data[0]));
        dispatch(asyncGetLoggedInUser());
        toast.success("Login successful!");
        reset();
        navigate("/");
      } else {
        toast.error("Invalid email or password");
        reset();
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log(error);
    }
  };
  return (
    <div className='w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center'>
        <h1 className='text-white text-5xl text-center my-10'>Login Page</h1>
        <form onSubmit={handleSubmit(loginHandler)} className='flex flex-col items-center mb-10 p-4 bg-gray-800 rounded-lg'>
            <input type="email" placeholder='Email' {...register("email",{required:"valid email required"})} className='outline-0 mb-4 p-2 rounded border-b bg-black' />
            <small className='text-red-400 text-[12px] -mt-3 mb-4'>{errors?.email?.message}</small>
            <input type="password" placeholder='Password' {...register("password",{required:"password required"})} className='outline-0 mb-4 p-2 rounded border-b bg-black' />
            <small className='text-red-400 text-[12px] -mt-3 mb-4'>{errors?.password?.message}</small>
            <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer'>Login</button>
            <p className='text-gray-400 mt-4'>Don't have an account? <Link to="/register" className='text-blue-400'>Register</Link></p>
        </form>
    </div>
  )
}

export default Login
