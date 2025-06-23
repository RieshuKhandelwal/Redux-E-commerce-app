import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
};

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        loadProduct:(state,action)=>{
            state.products = action.payload;
        },
        loadLazyProduct:(state,action)=>{
            const newProducts = action.payload;
            state.products = [...state.products, ...newProducts];
        }
    },
});

export default productSlice.reducer;
export const { loadProduct, loadLazyProduct } = productSlice.actions;