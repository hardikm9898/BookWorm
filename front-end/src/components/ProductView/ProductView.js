import React from 'react';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies= new Cookies()
const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});
const token = cookies.get("TOKEN")
  const fetchProduct = async (id) => {
   axios
     .get(`http://localhost:3001/user/book/${id}`, {
       headers: {
         authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       const { data } = response;
       setProduct(data.results.book);
     })
     .catch((error) => {
       console.error('API Error:', error);
     });
  };

  useEffect(() => {
    const id = window.location.pathname.split('/');
    fetchProduct(id[2]);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="p"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b> {product.price} </b>
          </Typography>
          <br />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
