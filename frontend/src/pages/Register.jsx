import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid'
import axios from '../utils/axiosConfig'
import { asyncRegisterUser } from '../store/actions/userActions'
import { toast } from 'react-toastify';



const Register = () => {
    const { register,reset,handleSubmit,formState:{errors} } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerHandler = async (user) => {
      user.id = nanoid();
      user.isAdmin = false;

      // Check if email already exists
        try {
            const { data: users } = await axios.get(
                `/users?email=${user.email}`
            );
            if (users && users.length > 0) {
                toast.error("Email already registered. Please use a different email.");
                return;
            }
        } catch (err) {
            toast.error("email already registered!");
            return;
        }

      console.log("User signed up:", user);
      dispatch(asyncRegisterUser(user));
      toast.success("User registered successfully");
      reset();
      navigate("/login");
  }

return (
        <div className='w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center'>
            <h1 className='text-5xl text-center my-20'>Welcome to Register Page</h1>
            <form onSubmit={handleSubmit(registerHandler)} className='bg-gray-800 p-6 rounded shadow-md mb-10 flex flex-col gap-4 items-center'>
                <input className='p-2 bg-gray-700 text-white rounded outline-0 border-b'
                    {...register("username", {
                        required: "Username can't be empty",
                        minLength: { value: 3, message: "Username must be at least 3 characters" },
                        pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Username can only contain letters, numbers, and underscores" }
                    })}
                    type='text'
                    placeholder='Username'
                />
                <small className='text-red-400 text-[12px] -mt-3 mb-4'>{errors?.username?.message}</small>
                <input className='p-2 bg-gray-700 text-white rounded outline-0 border-b'
                    {...register("email", {
                        required: "Valid email required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" }
                    })}
                    type='email'
                    placeholder='Email'
                />
                <small className='text-red-400 text-[12px] -mt-3 mb-4'>{errors?.email?.message}</small>
                <input className='p-2 bg-gray-700 text-white rounded outline-0 border-b'
                    {...register("password", {
                        required: "Password required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                        pattern: { value: /^(?=.*\d).+$/, message: "Password must contain at least one number" }
                    })}
                    type='password'
                    placeholder='Password'
                />
                <small className='text-red-400 text-[12px] -mt-3 mb-4'>{errors?.password?.message}</small>
                <button className=' bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 cursor-pointer rounded focus:outline-none focus:shadow-outline' type='submit'>Register</button>
                <p className='text-gray-400 mt-2'>Already have an account? <Link to="/login" className='text-blue-400'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register
