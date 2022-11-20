import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  styled,
} from '@mui/material';

import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

export default function SpeedDialMore({ palette, handleShowMore }) {
  return (
    <Stack
      className="more-info"
      // sx={{ position: 'absolute', top: 0, right: 0 }}
    >
      <SpeedMore
        ariaLabel="ver mais informações"
        direction="up"
        sx={{
          '&:hover': {
            filter: `drop-shadow(0px 0px 0.6rem ${palette.primary.main})`,
          },
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          tooltipOpen
          icon={<MarkUnreadChatAltIcon />}
          tooltipTitle="Chat"
          onClick={handleShowMore}
        />
      </SpeedMore>
    </Stack>
  );
}

const SpeedMore = styled(SpeedDial)(({ theme }) => ({
  // position: 'relative',
  '&.MuiSpeedDial-directionUp': {
    // position: 'fixed',
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
  },

  '& .MuiSpeedDialIcon-icon': {
    color: '#111111',
  },
  '& .MuiFab-primary': {
    padding: '10px',
    width: 44,
    minHeight: 44,
    // height: 50,
  },
}));
