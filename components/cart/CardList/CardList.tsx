import NextLink from 'next/link';

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../../contexts';
import { ICartProduct } from '../../../interfaces';
import { currency } from '../../../utils';

interface Props {
  editable?: boolean;
}

export const CardList: FC<Props> = ({ editable = false }) => {
  const { cart, removeProductCart, updateCartQuantity } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQtt: number) => {
    updateCartQuantity({
      ...product,
      quantity: newQtt,
    })
  };

  return (
    <>
      {
        cart.map(product => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">Size: <strong>{product.size}</strong></Typography>

                {
                  editable
                    ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        updateQuantity={(value) => onNewCartQuantityValue(product, value)}
                        maxValue={5}
                      />
                    )
                    : <Typography variant="h5">{product.quantity} {product.quantity > 1 ? 'products' : 'product'}</Typography>
                }

              </Box>
            </Grid>

            <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
              <Typography>{currency.format(product.price)}</Typography>

              {
                editable && (
                  <Button
                    onClick={() => removeProductCart(product)}
                    variant="text"
                    color="secondary"
                  >
                    Delete
                  </Button>
                )
              }

            </Grid>
          </Grid>
        ))
      }
    </>
  );
};
