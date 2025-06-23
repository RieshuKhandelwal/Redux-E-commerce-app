import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUserProfile } from '../../store/actions/userActions';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>state.userReducer.users);
    const { register,reset,handleSubmit,formState:{ errors } } = useForm({
        defaultValues: users });

    const editProfileHandler = (profile) => {
        console.log("updated profile data", profile);
        dispatch(asyncUpdateUserProfile(users.id,profile));
    }
    const logoutHandler = async() =>{
        dispatch(asyncLogoutUser());
        navigate("/login"); // Redirect to login after logout
        toast.success("User logged out successfully");
    }
    const deleteUserHandler = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            dispatch(asyncDeleteUser(users.id));
            navigate("/"); // Redirect to home after deletion
            toast.success("User deleted successfully");
        }
    }   
  return users?(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-400 text-transform: uppercase">{users?.username}</h1>
        <p className="text-gray-200 mb-6">This is your profile page.</p>
        <hr className='h-[1px] mb-10 bg-white w-full' />
        <form onSubmit={handleSubmit(editProfileHandler)} className="w-full space-y-4">
            <input type='text' className='w-full p-2 rounded-lg bg-white/20 text-white' {...register("username", { required: "Username is required" })} />
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}

            <input type='email' className='w-full p-2 rounded-lg bg-white/20 text-white' {...register("email", { required: "Email is required" })} />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            <input type='password' className='w-full p-2 rounded-lg bg-white/20 text-white' {...register("password", { required: "Password is required" })} />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>Update Profile</button> 
            <button type='button' className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors' onClick={logoutHandler}>Logout user</button>
            {
                users?.isAdmin && (
                    <button type='button' className='w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mt-4' onClick={deleteUserHandler}>
                        Delete User
                    </button>
                )
            }
        </form>
      </div>
    </div>
  ):"Loading...";
}

export default UserProfile
