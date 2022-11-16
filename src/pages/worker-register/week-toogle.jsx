import * as React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';

export function ToogleWeekGroup({ mudarDias, dias }) {
  const handleFormat = (event, newFormats) => {
    // setFormats(newFormats);
    mudarDias(newFormats);
    // console.log('newFormats:', newFormats);
  };

  const MyToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.shape.select,
    },
    height: 40,
    width: 40,
  }));

  return (
    <ToggleButtonGroup
      value={dias}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <MyToggleButton value="1" aria-label="bold">
        <Tooltip title="Segunda-feira">
          <Typography>S</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="2" aria-label="bold">
        <Tooltip title="Terça-feira">
          <Typography>T</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="3" aria-label="bold">
        <Tooltip title="Quarta-feira">
          <Typography>Q</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="4" aria-label="bold">
        <Tooltip title="Quinta-feira">
          <Typography>Q</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="5" aria-label="bold">
        <Tooltip title="Sexta-feira">
          <Typography>S</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="6" aria-label="bold">
        <Tooltip title="Sábado">
          <Typography>S</Typography>
        </Tooltip>
      </MyToggleButton>
      <MyToggleButton value="7" aria-label="bold">
        <Tooltip title="Domingo">
          <Typography>D</Typography>
        </Tooltip>
      </MyToggleButton>
    </ToggleButtonGroup>
  );
}
