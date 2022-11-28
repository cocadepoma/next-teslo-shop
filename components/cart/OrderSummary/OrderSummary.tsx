import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>

      <Grid item xs={6} sx={{ mt: 0.5 }}>
        <Typography>
          Number of products
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          3 items
        </Typography>
      </Grid>


      <Grid item xs={6} display="flex" sx={{ mt: 0.5 }}>
        <Typography>
          Subtotal
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          $155.6
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" sx={{ mt: 0.5 }}>
        <Typography>
          Tax 21%
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          $35
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" sx={{ mt: 2.5 }}>
        <Typography variant="subtitle1">
          Total
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2.5 }}>
        <Typography variant="subtitle1">
          $120.6
        </Typography>
      </Grid>
    </Grid>
  )
}
