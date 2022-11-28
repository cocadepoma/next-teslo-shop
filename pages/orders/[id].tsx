import React from 'react'

import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';

import { CardList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { CreditCardOffOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title="Summary order: 123123" pageDescription="Summary order">
      <Typography variant="h1" component="h1">Your order summary</Typography>

      <Chip sx={{ my: 2 }} label="Outstanding" variant="outlined" color="error" icon={<CreditCardOffOutlined />} />

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order summary (3 products)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Address</Typography>

                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography>Franmcisco Manuel</Typography>
              <Typography>342 Here my address</Typography>
              <Typography>Vila-real, 12540</Typography>
              <Typography>España</Typography>
              <Typography>+34687122312</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">
                    Edit
                  </Link>
                </NextLink>
              </Box>

              {/* Order summary */}
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <h1>Pay</h1>

                <Chip sx={{ my: 2 }} label="Already paid" variant="outlined" color="success" icon={<CreditCardOffOutlined />} />

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage