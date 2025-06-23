import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './NavBar.css'; // <-- Add this import for custom styles

const NavBar = () => {
  const users = useSelector((state)=>state.userReducer.users);

  return (
    <nav
      className="flex justify-center items-center gap-4 sm:gap-6 px-4 sm:px-8 py-3 sm:py-4 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl shadow-xl bg-[rgba(11,29,81,0.65)] backdrop-blur-md border border-[var(--t1)] transition-all duration-300"
      style={{
        color: 'var(--pri)',
        fontWeight: 600,
        fontSize: '1rem',
        letterSpacing: '0.03em',
      }}
    >
      <NavLink
        className="nav-magnetic text-base sm:text-lg md:text-xl"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="nav-magnetic text-base sm:text-lg md:text-xl"
        to="/products"
      >
        Products
      </NavLink>
      {users ? (
        <>
          {users?.isAdmin && (
            <NavLink
              className="nav-magnetic text-base sm:text-lg md:text-xl"
              to="/admin/createProduct"
            >
              Create Product
            </NavLink>
          )}
          <NavLink
            className="nav-magnetic text-base sm:text-lg md:text-xl"
            to="/user/profile"
          >
            Settings
          </NavLink>
          <NavLink
            className="nav-magnetic text-base sm:text-lg md:text-xl"
            to={`/cart/${users.id}`}
          >
            Cart
          </NavLink>
        </>
      ) : (
        <NavLink
          className="nav-magnetic text-base sm:text-lg md:text-xl"
          to="/login"
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;