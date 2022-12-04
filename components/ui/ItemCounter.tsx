import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  currentValue: number
  maxValue: number;

  updateQuantity: (quantity: number) => void;
};

export const ItemCounter: FC<Props> = ({ currentValue, updateQuantity, maxValue }) => {

  const onUpdateQuantity = (qtt: number) => {
    let newValue = currentValue;

    if (newValue + qtt <= 0) {
      newValue = 1;
    } else if (currentValue + qtt <= maxValue) {
      newValue += qtt;
    }

    updateQuantity(newValue);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton disabled={maxValue === 0} onClick={() => onUpdateQuantity(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>

      <IconButton disabled={maxValue === 0} onClick={() => onUpdateQuantity(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
