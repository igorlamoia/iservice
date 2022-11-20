import * as React from 'react';

import { Avatar, Chip, Fade, MenuItem, Menu } from '@mui/material';

export function FadeMenu({ dadosusuario }) {
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
      <Chip
        sx={{ maxWidth: 140, fontSize: 12 }}
        onClick={handleClick}
        alignItems="center"
        avatar={<Avatar alt="" src={dadosusuario?.linkFoto} />}
        label={dadosusuario?.nome}
        variant="outlined"
      />
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
