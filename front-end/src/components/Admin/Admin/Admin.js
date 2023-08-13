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
import axios from 'axios';
const cookies = new Cookies();

const onDelete= async function(id){

  try {
     await axios.delete(`http://localhost:3001/user/book/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("TOKEN")}`,
      },
    });
    alert("Book Deteted")
    window.location.href="/admin"
  } catch (error) {
    alert("Something wrong please please try again")
    console.error('API Error:', error);
  }
}


const Admin = ({ product }) => {
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
        <a href={`/edit/${product._id}`}>
          <Button variant="contained" className={classes.button}>
            <b>EDIT</b>
          </Button>
        </a>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onDelete(product._id)}
        >
          <b>REMOVE</b>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Admin;
