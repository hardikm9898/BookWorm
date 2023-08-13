// import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import Cookies from 'universal-cookie';
// import axios from 'axios';
const cookies = new Cookies();

const Product = ({ product, onAddToWhitelist }) => {

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title={product.title}
        />
      </CardActionArea>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6">{product.title}</Typography>
        </div>
        <div className={classes.cardContent}>
          <Typography variant="h6" color="secondary">
            <b>{product.price}</b>
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onAddToWhitelist(product._id)}
        >
          <b>WHITELIST</b>
        </Button>
        <Link to={`product-view/${product._id}`}>
          <Button variant="contained" className={classes.button}>
            <b>VIEW</b>
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Product;
