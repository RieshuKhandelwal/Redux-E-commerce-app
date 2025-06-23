import React from 'react'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from '../pages/Home';
const Products = lazy(() => import('../pages/Products'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const CreateProdcut = lazy(() => import('../pages/admin/CreateProdcut'));
const ProductDetail = lazy(() => import('../pages/admin/productDetail'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const AuthWrapper = lazy(() => import( './AuthWrapper'));
const Cart = lazy(() => import('../pages/Cart'));

const Mainroutes = () => {

  const user = useSelector(state => state.userReducer.users);
  const isAuthenticated = !!user;

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login"
          element={
            isAuthenticated
              ? <Home /> // Redirect to Home if already logged in
              : <Login />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/createProduct" element={<AuthWrapper><CreateProdcut /></AuthWrapper>} />
        <Route path="/user/profile" element={<AuthWrapper><UserProfile /></AuthWrapper>} />
        <Route path="/cart/:uid" element={<AuthWrapper><Cart /></AuthWrapper>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Mainroutes
