import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { CardList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { CartContext } from '../../contexts';

const CartPage = () => {
  const router = useRouter();
  const { isLoaded, cart } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) return <></>;

  return (
    <ShopLayout title="Cart - 3" pageDescription="Your shopping cart">
      <Typography variant="h1" component="h1">Cart</Typography>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CardList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              {/* Order summary */}
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage