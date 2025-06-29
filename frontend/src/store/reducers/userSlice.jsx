import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: null,
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.users = action.payload;
        },
    },
});

export default userSlice.reducer;
export const {loadUser} = userSlice.actions;