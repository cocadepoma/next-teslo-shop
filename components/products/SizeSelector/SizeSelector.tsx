import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { ISize } from '../../../interfaces';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  disabled: boolean;

  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize, disabled }) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button
            sx={{ mr: 1 }}
            disabled={disabled}
            key={size}
            size="small"
            color={selectedSize === size ? 'primary' : 'info'}
            onClick={() => onSelectedSize(size)}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  )
}
