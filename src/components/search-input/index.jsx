/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './style.scss';
// import SearchSVG from '../../assets/search-icon.svg';
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Paper,
  styled,
  TextField,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  return (
    <StyledAutocomplete
      // disablePortal
      options={top100Films.map((option) => option.label)}
      noOptionsText="..."
      sx={{
        width: { xs: '100%', sm: '100%', md: 480 },
        mt: 2,
        py: 3,
        border: 'none',
        borderRadius: 10,
        transition: 'all 5s ease',
      }}
      PaperComponent={CustomPaper}
      // freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          // shrink={true}
          label="Encontrar serviço"
          InputLabelProps={{
            ...params.InputLabelProps,
            type: 'search',
            sx: {
              position: 'absolute',
              left: '40px',
              backdropFilter: 'blur(20px)',
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment
                  sx={{ position: 'absolute', ml: 1 }}
                  position="start"
                >
                  <SearchIcon />
                </InputAdornment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            '& legend': { m: 5 },
            '& fieldset': {
              boxShadow: `0px 0px 10px ${palette.shadow.input}`,
            },
          }}
        />
      )}
    />
  );
}

function CustomPaper(props) {
  return (
    <Paper
      elevation={1}
      sx={{ backdropFilter: 'blur(8px)', my: { xs: 1, sm: 0 } }}
      {...props}
    />
  );
}

const StyledAutocomplete = styled(Autocomplete)({
  '& MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined':
    {
      backgroundColor: 'secondary.main',
    },

  '& .MuiAutocomplete-inputRoot': {
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: '45px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
      borderRadius: 20,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {},
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
    },
  },
});
const top100Films = [
  { label: 'Dona Cida (Milene)', year: 1994 },
  { label: 'Delícia da RBM', year: 1957 },
  { label: '+ A (orgulho)', year: 1972 },
  { label: 'Sorriso Yago', year: 1974 },
  { label: 'AnaL', year: 2008 },
  { label: 'Fabão da VM', year: 1993 },
  { label: 'É o Igão e o Jão', year: 1994 },
];
