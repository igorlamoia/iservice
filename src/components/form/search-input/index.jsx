/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
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
import { debounce } from '../../../utils/async';

export default function SearchInput({
  handleSearch = () => {},
  loading,
  autocompleteProps = {},
  textFieldProps = {},
}) {
  const { palette } = useTheme();

  const handleSearchDebounce = useCallback(debounce(handleSearch), []);

  return (
    <Autocomplete
      noOptionsText="..."
      loadingText="Carregando..."
      {...autocompleteProps}
      // sx={{
      //   width: { xs: '100%', sm: '100%', md: 480 },
      //   // mt: 1,
      //   py: 2,
      //   border: 'none',
      //   // borderRadius: 10,
      //   // transition: 'all 5s ease',
      //   ...autocompleteProps.sx,
      // }}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleSearchDebounce}
          // shrink={true}
          {...textFieldProps}
          InputLabelProps={{
            ...params.InputLabelProps,
            type: 'search',
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="secondary" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export function CustomPaper(props) {
  return (
    <Paper
      elevation={1}
      sx={{ backdropFilter: 'blur(8px)', my: { xs: 1, sm: 0 } }}
      {...props}
    />
  );
}
export const StyledAutocomplete = styled(Autocomplete)({
  '& MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined':
    {
      backgroundColor: 'secondary.main',
    },

  '& .MuiAutocomplete-inputRoot': {
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {},
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
    },
  },
});
