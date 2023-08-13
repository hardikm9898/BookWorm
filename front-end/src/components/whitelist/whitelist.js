import React, { useEffect ,useState} from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import WhitelistItem from './WhitelistItems/WhitelistItem';
import useStyles from './styles';
import Cookies from "universal-cookie"
import axios from 'axios';
const cookies= new Cookies() 


const Whitelist = ({onRemoveFromWhitelist }) => {
  const classes = useStyles();

  const [whitelistBook,setWhitelistBook]=useState([])

const fetchWhitelistBook= async () => {
  try {
      const token = cookies.get("TOKEN")
      const {data}=await axios
     .get("http://localhost:3001/user/book/whitelist", {
       headers: {
         authorization: `Bearer ${token}`,
       },
     })
        setWhitelistBook(data.results)
    } catch (error) {
      alert ("something wrong",error)
    }
  };

  useEffect(()=>{
    fetchWhitelistBook()
  })

  const renderEmptyWhitelist = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">
        {' '}
        start adding some
      </Link>
      !
    </Typography>
  );

  if (!whitelistBook) return 'Loading';

  const renderWhiteList = () => (
    <>
      <Grid container spacing={4}>
        {whitelistBook.map((lineItem) => (
          <Grid item xs={12} sm={4} >
            <WhitelistItem
              item={lineItem}
              onRemoveFromWhitelist={onRemoveFromWhitelist}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Whitelist List</b>
      </Typography>
      <hr />
      {!whitelistBook.length ? renderEmptyWhitelist() : renderWhiteList()}
    </Container>
  );
};

export default Whitelist;
