import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Péssimo',
  1: 'Péssimo',
  1.5: 'Horrível',
  2: 'Horrível',
  2.5: 'Ruim',
  3: 'Razoável',
  3.5: 'Médiano',
  4: 'Bom',
  4.5: 'Ótimo',
  5: 'Excelente',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function StarRating({ handleRating = () => {} }) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    handleRating(value);
  }, [value]);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
