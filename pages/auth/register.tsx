import React, { useContext, useState } from 'react'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayout } from '../../components/layout'
import { tesloApi } from '../../api'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '../../contexts'
import { useRouter } from 'next/router'

type FormData = {
  email: string;
  password: string;
  name: string;
}

const RegisterPage = () => {
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ email, password, name }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(email, password, name);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title="Teslo-Shop Register">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Create new account</Typography>

              <Chip
                label="An error occured while registering"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ padding: '0px', marginTop: '10px', width: '100%', display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'This field is mandatory',
                  minLength: { value: 2, message: 'Minimum 2 characters' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is mandatory',
                  validate: (val) => validations.isEmail(val)
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'This field is mandatory',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                Register
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link underline="always">
                  Already have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage