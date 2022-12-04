import { Grid, Typography, Button, Box, Chip } from '@mui/material';
import { GetServerSideProps, GetStaticPaths, NextPage } from 'next'
import { GetStaticProps } from 'next'
import { getAllProductSlugs } from '../../database/dbProducts';
import { dbProducts } from '../../database';

import { ShopLayout } from "../../components/layout"
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import { IProduct, ISize } from '../../interfaces/products';
import { useContext, useState } from 'react';
import { ICartProduct } from '../../interfaces';
import { useRouter } from 'next/router';
import { CartContext } from '../../contexts';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((oldTempProduct) => ({
      ...oldTempProduct,
      size,
    }));
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct((oldTempProduct) => ({
      ...oldTempProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct)

    router.push('/cart');
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          {/* slideshir */}
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column">

            {/* titles */}
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Amount</Typography>

              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={updateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />

              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
                disabled={product.inStock === 0}
              />
            </Box>

            {/* Add to cart */}
            {
              product.inStock > 0
                ? (
                  <Button
                    onClick={onAddProduct}
                    disabled={!tempCartProduct.size} color="secondary" className="circular-btn">
                    {
                      tempCartProduct.size
                        ? 'Add to cart'
                        : 'Select a size'
                    }
                  </Button>
                )
                : (
                  <Chip label="No available" color="error" variant="outlined" />
                )
            }



            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


// Dont 'use SSR
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product,
//     }
//   }
// }


// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({ params: { slug } })),
    // fallback: false,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
