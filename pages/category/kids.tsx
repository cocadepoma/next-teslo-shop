import { ShopLayout } from "../../components/layout";
import { Typography } from '@mui/material';

import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

import { useProducts } from "../../hooks";


export default function KidsPage() {
  const { products, isLoading } = useProducts('/products?gender=kids');

  return (
    <ShopLayout title="Teslo-Shop - Kids" pageDescription="Teslo-Shop kids products">
      <Typography variant="h1" component="h1">Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Kids Products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}
