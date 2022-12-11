import * as React from 'react';

import Notification from '@mui/icons-material/NotificationsNoneSharp';
import { Fade, MenuItem, Menu, Button } from '@mui/material';

export function NotifyIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Notification />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Chat</MenuItem>
        <MenuItem onClick={handleClose}>Solicitação</MenuItem>
        <MenuItem onClick={handleClose}>Not..</MenuItem>
      </Menu>
    </div>
  );
}
