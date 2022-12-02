import { ShopLayout } from "../../components/layout";
import { Typography } from '@mui/material';

import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

import { useProducts } from "../../hooks";


export default function WomenPage() {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title="Teslo-Shop - Women" pageDescription="Teslo-Shop women products">
      <Typography variant="h1" component="h1">Women</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Women Products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
