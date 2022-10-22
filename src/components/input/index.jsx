/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';

export default function MyInput({
  label,
  id,
  endAdornment,
  sx,
  error,
  errorMessage,
  ...rest
}) {
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: 1,
        marginBottom: 1,
        '& > label': {
          top: 23,
          left: 0,
          // color: 'black',
          '&[data-shrink="false"]': {
            top: 5,
          },
        },

        '& > div > input': {
          padding: '30.5px 14px 11.5px !important',
        },
        '& legend': {
          display: 'none',
        },
        '& fieldset': {
          top: 0,
        },
        '.Mui-error input': {
          animation: 'shake .3s',
        },
        '@keyframes shake': {
          '25%': {
            transform: 'translateX(-4px)',
          },
          '50%': {
            transform: 'translateX(4px)',
          },
          '75%': {
            transform: 'translateX(-4px)',
          },
        },
        ...sx,
      }}
      error={Boolean(error)}
    >
      <InputLabel shrink={rest.shrink} htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type="text"
        data-shrink="false"
        shrink
        // value={values.email}
        name={id}
        // onBlur={handleBlur}
        // onChange={handleChange}
        label={label}
        // inputProps={{}}
        {...rest}
        endAdornment={endAdornment}
      />
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
