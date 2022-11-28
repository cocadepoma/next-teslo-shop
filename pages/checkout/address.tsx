import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm destinatary address">
      <Typography variant='h1' component="h1">Address</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Surname"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address 2"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>
              Country
            </InputLabel>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>France</MenuItem>
              <MenuItem value={2}>Spain</MenuItem>
              <MenuItem value={3}>Germany</MenuItem>
              <MenuItem value={4}>Belgium</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone number"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circulat-btn" size="large">
          Review order
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage