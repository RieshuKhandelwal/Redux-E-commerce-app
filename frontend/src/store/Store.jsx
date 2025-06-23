import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userSlice'
import { productSlice } from './reducers/productSlice'
import { cartSlice } from './reducers/cartSlice'

export const store = configureStore({
    reducer:{
        userReducer: userSlice.reducer,
        productReducer: productSlice.reducer,
        cartReducer: cartSlice.reducer,
    },
});