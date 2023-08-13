import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';

import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Whitelist from './components/whitelist/whitelist';
import ProductView from './components/ProductView/ProductView';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Cookies from 'universal-cookie';
import Login from './components/Login/Login';
import AdminProducts from './components/Admin/Admins';
import Edit from "./components/Admin/Edit"
import Create from "./components/Admin/Add"
import Signup from './components/Signup/signup';
import axios from 'axios';
const cookies = new Cookies();

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [whitelistBook, setWhitelistBook] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  

  const handleAddToWhitelist = async (bookId) => {
     try {
     const token = cookies.get("TOKEN")
      await axios
     .post(`http://localhost:3001/user/book/whitelist/${bookId}`,{}, {
       headers: {
         authorization:`Bearer ${token}`,
       },
     })
alert("Book Whitelisted")
    } catch (error) {
      alert ("Book is already Whitelist or Somthing wrong ")
    }
  };

  const handleRemoveFromWhitelist = async (lineItemId) => {
    try {
      const token = cookies.get("TOKEN")
     await axios.delete(`http://localhost:3001/user/book/whitelist/${lineItemId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      window.location.herf='/whitelist'
alert("Book remove from Whitelist")
    } catch (error) {
      alert ("Somthing is wrong server error")
    }
  };


  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const token = cookies.get('TOKEN');


  if (!token) {
    return (
      <><Router>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Router>
      </>
    );
  }else if(window.location.href==='http://localhost:3000/admin'){
    return (
      <>
        <AdminProducts />
      </>
    );
  }
  
  else {
    return (
      <div>
        <Router>
          <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar
              handleDrawerToggle={handleDrawerToggle}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Products
                    onAddToWhitelist={handleAddToWhitelist}
                    handleUpdateCartQty
                  />
                }
              ></Route>
              <Route
                exact
                path="/whitelist"
                element={
                  <Whitelist
                    whitelistBook={whitelistBook}
                    onRemoveFromWhitelist={handleRemoveFromWhitelist}
                  />
                }
              ></Route>
              <Route
                path="/product-view/:id"
                exact
                element={<ProductView />}
              ></Route>
              <Route
                path="/edit/:id"
                exact
                element={<Edit />}
              ></Route>
              <Route
                path="/book/add"
                exact
                element={<Create />}
              ></Route>
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
};

export default App;
