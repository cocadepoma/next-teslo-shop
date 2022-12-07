import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout';
import { countries } from '../../utils';
import { CartContext } from '../../contexts';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
};

const AddressPage = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const { updateShippingAddress } = useContext(CartContext);

  const onReviewOrder = (data: FormData) => {
    updateShippingAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title="Address" pageDescription="Confirm destinatary address">
      <form onSubmit={handleSubmit(onReviewOrder)}>
        <Typography variant='h1' component="h1">Address</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Firstname"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'This field is mandatory',
                minLength: { value: 2, message: 'Minimum 2 characters' }
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Lastname"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is mandatory',
                minLength: { value: 2, message: 'Minimum 2 characters' }
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'This field is mandatory',
                minLength: { value: 10, message: 'Minimum 10 characters' }
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2"
              variant="filled"
              fullWidth
              {...register('address2', {
                minLength: { value: 10, message: 'Minimum 10 characters' }
              })}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'This field is mandatory',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'This field is mandatory',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              key={Cookies.get('country') || countries.find(country => country.code === 'ESP')?.code!}
              select
              fullWidth
              label="Select"
              defaultValue={Cookies.get('country') || countries.find(country => country.code === 'ESP')?.code!}
              inputProps={register('country', {
                required: 'This field is mandatory',
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone number"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is mandatory',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circulat-btn"
            size="large"
          >
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;
//   let userId = '';
//   let isValidToken = false;

//   try {
//     userId = await jwt.isValidToken(token);
//     isValidToken = true
//   } catch (error) {
//     console.log(error);
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }

export default AddressPage