import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../../contexts"
import { currency } from "../../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

  return (
    <Grid container>

      <Grid item xs={6} sx={{ mt: 0.5 }}>
        <Typography>
          Number of products
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'products' : 'product'}
        </Typography>
      </Grid>


      <Grid item xs={6} display="flex" sx={{ mt: 0.5 }}>
        <Typography>
          Subtotal
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          {currency.format(subTotal)}
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" sx={{ mt: 0.5 }}>
        <Typography>
          Tax {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 || 0}%
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 0.5 }}>
        <Typography>
          {currency.format(tax)}
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" sx={{ mt: 2.5 }}>
        <Typography variant="subtitle1">
          Total
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2.5 }}>
        <Typography variant="subtitle1">
          {currency.format(total)}
        </Typography>
      </Grid>
    </Grid>
  )
}
