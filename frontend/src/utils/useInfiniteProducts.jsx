import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axiosConfig';
import { loadLazyProduct } from '../store/reducers/productSlice';

export const useInfiniteProducts = () => {

    const dispatch = useDispatch();
    const products = useSelector((state)=>state.productReducer.products);
    const [hasMore, sethasMore] = useState(true);
    
  const fetchProducts = async() => {
    try {
      const {data}= await axios.get(`/products?_limit=6&_start=${products.length}`);
      if(data.length === 0){
        sethasMore(false);
      }else{
        sethasMore(true);  
        dispatch(loadLazyProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])


  return {products,hasMore,fetchProducts};
}
