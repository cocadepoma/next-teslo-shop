import { ShopLayout } from "../../components/layout";
import { Typography } from '@mui/material';

import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

import { useProducts } from "../../hooks";


export default function MenPage() {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title="Teslo-Shop - Men" pageDescription="Teslo-Shop men products">
      <Typography variant="h1" component="h1">Men</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Men Products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
