import React from 'react'
import { ShopLayout } from '../components/layout/ShopLayout';
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title="Teslo-shop - Page not found" pageDescription="Nothing to show here">
      <Box sx={{ flexDirection: { xs: 'column', sm: 'row' } }} display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={200}>404 |</Typography>
        <Typography marginLeft={1.5}>This page does not exists</Typography>
      </Box>
    </ShopLayout>
  )
}
export default Custom404;
