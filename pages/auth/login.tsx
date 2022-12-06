import React, { useContext, useState } from 'react'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'

import { tesloApi } from '../../api'
import { AuthLayout } from '../../components/layout'
import { validations } from '../../utils'
import { AuthContext } from '../../contexts'
import { useRouter } from 'next/router'

type FormData = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const { loginUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace('/')
  }

  return (
    <AuthLayout title="Teslo-Shop Log in">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Log in</Typography>

              <Chip
                label="User or password not valid"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ padding: '0px', marginTop: '10px', width: '100%', display: showError ? 'flex' : 'none' }}
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
                type="password"
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
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Confirm
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ textAlign: 'right' }}
            >
              <NextLink href="/auth/register" passHref legacyBehavior>
                <Link underline="always">
                  Don&apos;t have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage