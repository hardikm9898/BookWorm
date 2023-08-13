import React, { useState, useEffect } from 'react';
import { Grid, InputAdornment, Input,Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Admin from './Admin/Admin.js';
import useStyles from './styles.js';
import Carousel from 'react-bootstrap/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo1 from '../../assets/4.jpeg';
import '../ProductView/style.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios from 'axios';
import {Link} from 'react-router-dom'

const AdminProducts = ({ onAddToWhitelist }) => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const token = cookies.get('TOKEN');
  useEffect(() => {
    axios
      .get('http://localhost:3001/user/book', {
        headers: {
          "authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setProducts(data.results.book); 
      })
      .catch((error) => {
        console.error('API Error:');
      });
  }, []);

  

  return (
    <div className="main">
    <a href='/book/add'>

        <Button variant="contained" className={classes.button}>
          <b>ADD BOOK</b>
        </Button>
    </a>
    <a href='/'>

        <Button variant="contained" className={classes.button}>
          <b>BACK TO DASHBORD</b>
        </Button>
    </a>
      
      <main className={classes.mainPage}>
        <div className={classes.toolbar} />
        <Grid
          className={classes.content}
          container
          justify="center"
          spacing={5}
        >
          {products
            .filter((product) => {
              if (searchTerm === '') {
                return product;
              } else if (
                product.title
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Grid
                className={classes.content}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                id="pro"
              >
                <Admin product={product} onAddToWhitelist={onAddToWhitelist} />
              </Grid>
            ))}
        </Grid>
      </main>
    </div>
  );

 
};

export default AdminProducts;
