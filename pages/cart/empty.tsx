import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout/ShopLayout';

const EmptyPage = () => {
  return (
    <ShopLayout title="Empty Card" pageDescription="There are not products in the cart">
      <Box sx={{ flexDirection: { xs: 'column', sm: 'row' } }} display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <RemoveShoppingCartOutlined sx={{ fontSize: 80 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography sx={{ ml: 2 }}>Your cart is empty</Typography>

          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h4" color="secondary">
              Return
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage