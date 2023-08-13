import React, { useState, useEffect } from 'react';
import { Grid, InputAdornment, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Product from './Product/Product.js';
import useStyles from './styles';
import Carousel from 'react-bootstrap/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo1 from '../../assets/4.jpeg';
import '../ProductView/style.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios from 'axios';

const Products = ({ onAddToWhitelist }) => {
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
        console.error('API Error:', error);
      });
  }, []);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <Carousel fade infiniteLoop useKeyboardArrows autoPlay>
        <Carousel.Item>
          <img className="d-block w-100" src={logo1} alt="slide" />
          <Carousel.Caption>
            <div className={classes.searchs}>
              <Input
                className={classes.searchb}
                type="text"
                placeholder="Which book are you looking for?"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {searchTerm === '' && (
        <>
          <h3 className={classes.contentHeader}>FEATURED</h3>
          <Grid
            className={classes.contentFeatured}
            container
            justify="center"
            spacing={1}
          >
            {products.map((product) => (
              <>
                {product.length > 0 ? (
                  <Grid
                    className={classes.contentFeatured}
                    item
                    xs={6}
                    sm={5}
                    md={3}
                    lg={2}
                    id="pro"
                  >
                    <Product
                      product={product}
                      onAddToWhitelist={onAddToWhitelist}
                    />
                  </Grid>
                ) : (
                  ''
                )}
              </>
            ))}
          </Grid>
        </>
      )}

      <Grid className={classes.content} container justify="center" spacing={5}>
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
              <Product product={product} onAddToWhitelist={onAddToWhitelist} />
            </Grid>
          ))}
      </Grid>
    </main>
  );

 
};

export default Products;
