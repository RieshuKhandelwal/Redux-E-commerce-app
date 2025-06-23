import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    carts: [] // [ userId, productsArray: [{ productId, quantity }] ]
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.carts = Array.isArray(action.payload) ? action.payload : [];
        }
    },
});

export default cartSlice.reducer;
export const {loadCart}  = cartSlice.actions;