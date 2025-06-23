import { toast } from "react-toastify";
import axios from "../../utils/axiosConfig";
import { loadUser } from "../reducers/userSlice";




// function to get the current logged in user
export const asyncGetLoggedInUser = () => async (dispatch,getState)=>{
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user === "undefined") {
            // No user found, don't try to parse
            return;
        }
        if(user){
            dispatch(loadUser(user));
        }else console.log("user not logged in!");
    } catch (error) {
        console.log(error);
    }
};

//function to update the user profile
export const asyncUpdateUserProfile = (id,user) => async (dispatch,getState)=>{
    try {
        const {data} = await axios.patch(`/users/${id}`, user); //update the user profile in database
        localStorage.setItem("user",JSON.stringify(data)); //save the updated user in local storage
        dispatch(loadUser(data)); //update the user in the store
        console.log("user profile updated successfully!");
    } catch (error) {
        console.log(error);
    }
}

//function to logout the user 
export const asyncLogoutUser = () => async (dispatch,getState)=>{
    try {
        localStorage.removeItem("user");
        dispatch(loadUser(null));
        console.log("user logged out successfully!");
    } catch (error) {
        console.log(error);
    }
};

//function to delete the user
export const asyncDeleteUser = (id) => async (dispatch,getState)=>{
    try {
        await axios.delete(`/users/${id}`); //delete the user from database
        localStorage.removeItem("user"); //remove the user from local storage
        dispatch(loadUser(null)); //update the user in the store
        console.log("user deleted successfully!");
    } catch (error) {
        console.log(error);
    }
};

//function to save the logging in user in local storage
export const asyncSaveUserInLocalStorage = (user) => async(dispatch,getState)=>{
    try {
        const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`) //to verify if user is registered or not
        console.log("user saved in local storage");
        localStorage.setItem("user",JSON.stringify(data[0]));
    } catch (error) {
        console.log(error);
    }
};

export const asyncRegisterUser = (user) => async (dispatch,getState) =>{
    try {
        const res = await axios.post("/users", user);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};