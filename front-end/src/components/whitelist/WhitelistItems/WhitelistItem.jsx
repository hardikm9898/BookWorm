import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
} from '@material-ui/core';

import useStyles from './styles';

const WhitelistItem = ({ item, onRemoveFromWhitelist }) => {
  
  const classes = useStyles();

  const handleRemoveFromWhitelist = (lineItemId) =>
    onRemoveFromWhitelist(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia
        image={item.imageUrl}
        alt={item.title}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.title}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <a href="/">
            <Button type="button" color="primary" variant="contained">
              Back
            </Button>
          </a>
          <a href={`product-view/${item._id}`}>
            <Button variant="contained" className={classes.button}>
              <b>VIEW</b>
            </Button>
          </a>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromWhitelist(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default WhitelistItem;
