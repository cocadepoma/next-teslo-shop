import { Box, CircularProgress, Typography } from "@mui/material"

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography sx={{ fontSize: '1.7rem', fontWeight: 200, mb: 2 }}>Loading . . .</Typography>
      <CircularProgress size={40} thickness={2} sx={{ color: 'rgba(0,0,0,0.6)' }} />
    </Box>
  )
}
