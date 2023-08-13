import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../assets/circles.png';
import useStyles from './styles';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
const cookies= new Cookies()

const LogOut= function(){
cookies.remove("TOKEN")
window.location.href="/"
}
const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book App"
              height="50px"
              className={classes.image}
            />
            <strong>Book-Worm</strong>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/whitelist"
              aria-label="Show Whitelist items"
              color="inherit"
            >
              <Badge color="secondary">
                <p>WHITELIST</p>
              </Badge>
            </IconButton>
            <Button variant="success" onClick={LogOut}>
              LOGOUT
            </Button>
            <a href="/admin">
              <Button variant="success">ADMIN</Button>
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
