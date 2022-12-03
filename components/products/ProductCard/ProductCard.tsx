import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

import { Grid, Card, Box, Typography, } from '@mui/material';
import { IProduct } from '../../../interfaces';

import styles from './ProductCard.module.css'
interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [IsImageLoaded, setIsImageLoaded] = useState(false);

  const ref = useRef(null);

  const router = useRouter();

  const url1 = `/products/${product.images[0]}`;
  const url2 = `/products/${product.images[1]}`;

  useLayoutEffect(() => {
    if (ref.current) setIsImageLoaded(true);
  }, [ref])

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${styles['product-card__container']} fadeIn`}
        style={{ boxShadow: isHovered ? '3px 3px 8px -1px rgba(0,0,0,0.25)' : '1px 1px 5px -2px rgba(0,0,0,0.25)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <div ref={ref} className={styles['product-card__image--first']} style={{ backgroundImage: `url(${url2})`, opacity: isHovered ? 1 : 0, }} />
        <div className={styles['product-card__image--second']} style={{ opacity: isHovered ? 0 : 1, backgroundImage: `url(${url1}) ` }} />
      </div>


      <Box sx={{ mt: 1, display: IsImageLoaded ? 'bloack' : 'none' }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  )
}