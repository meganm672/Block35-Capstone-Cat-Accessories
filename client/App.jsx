
import { Routes, Route, Link } from 'react-router-dom';
import Login_register from './components/Login_register';
import Cart from './components/Cart';
import Products from './components/Products';
import Admin from './components/Admin';
import NavBar from './components/Navbar';
import SingleProduct from './components/SingleProduct';
import { useSelector } from 'react-redux'

import React from "react";
import UpdateProductForm from './components/UpdateProductForm';

function App() {
  const token = useSelector(state => state.auth.token);
  console.log("The Token is :", token)
  return (
     <>
        <NavBar />
        <div id="container">
          <div id="main-section">
            <Routes>
              <Route path="/register" element={<Login_register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Products />} />
              <Route path="/:id" element={<SingleProduct />}/>
              <Route path="/admin" element={<Admin />} />
              <Route path="/UpdateProductForm" element={<UpdateProductForm />} />
              <Route path="/Navbar" element={<NavBar />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
  
  export default App;