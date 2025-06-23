import axios from "../../utils/axiosConfig";
import { loadProduct } from "../reducers/productSlice";



// function to get all products
export const asyncGetAllProducts = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/products");
        dispatch(loadProduct(data));
    } catch (error) {
        console.log(error);
    }
};

//function to delete a product
export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/products/${id}`);
        dispatch(asyncGetAllProducts()); // to refresh the product list after deletion
    } catch (error) {
        console.log(error);
    }
};

//function to update a product
export const asyncUpdateProduct= (id,updatedProduct) => async(dispatch,getState)=>{
    try {
        const res = await axios.patch(`/products/${id}`,updatedProduct);
        dispatch(asyncGetAllProducts()); // to refresh the product list after updating
    } catch (error) {
        console.log(error);
    }
}

// function to add a new product
export const asyncAddProduct = (product) => async (dispatch,getState) =>{
    try {
        const res = await axios.post("/products", product);
        dispatch(asyncGetAllProducts()); // Refresh the product list after adding a new product
    } catch (error) {
        console.log(error);
    }
};