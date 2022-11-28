import React from 'react'
import NextLink from 'next/link'

import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layout'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows info if the order is already paid or not',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label="Paid" variant="outlined" />
          : <Chip color="error" label="Outstanding" variant="outlined" />
      )
    }
  },
  {
    field: 'order',
    headerName: 'Show order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">
            Show order
          </Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  { id: 1, fullname: 'Paco R', paid: true },
  { id: 2, fullname: 'Juan Choche', paid: false },
  { id: 3, fullname: 'Pelé La Rosca', paid: true },
  { id: 4, fullname: 'Melissa Llonganissa', paid: false },
  { id: 5, fullname: 'Isabel Herrera', paid: true },
]

const HistoryPage = () => {
  return (
    <ShopLayout title="Orders History" pageDescription="Customer product orders history">
      <Typography variant="h1" component="h1">Orders History</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100$' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage