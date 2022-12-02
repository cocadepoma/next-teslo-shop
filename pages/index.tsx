import { ShopLayout } from "../components/layout";
import { Typography } from '@mui/material';

import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";

import { useProducts } from "../hooks";


export default function HomePage() {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription="Find the best products of Teslo here">
      <Typography variant="h1" component="h1">Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>All the products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
