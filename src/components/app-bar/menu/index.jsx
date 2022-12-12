import * as React from 'react';

import { Avatar, Chip, Fade, MenuItem, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function FadeMenu({ dadosusuario, logOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

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
        PaperProps={{
          sx: { bgcolor: 'background.default', minWidth: 100 },
        }}
      >
        <MenuItem onClick={() => navigate('/solicitacoes')}>
          Solicitações Feitas
        </MenuItem>
        {Boolean(dadosusuario.prestador) && (
          <MenuItem onClick={() => navigate('/demandas')}>
            Atendimentos
          </MenuItem>
        )}

        {/* <MenuItem onClick={handleClose}></MenuItem> */}
        <MenuItem onClick={logOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
