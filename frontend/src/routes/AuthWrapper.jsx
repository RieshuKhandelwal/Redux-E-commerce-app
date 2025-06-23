import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthWrapper = (props) => {
    const users = useSelector((state) => state.userReducer.users);
  return users? (props.children):(<Navigate to="/login" replace={true} />)
}

export default AuthWrapper
