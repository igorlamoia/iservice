import { Button, Stack, Avatar, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { codStatusDescricao } from '../../../utils/codigos';
import { showDate } from '../../../utils/format';

export function DemandaPendenteItem({
  demanda: { dataStatus, descricao, codStatus, linkFoto, nome, codAtendimento },
}) {
  const navigate = useNavigate();

  const handleDemandas = async () => {
    navigate('/demandas');
  };

  const { corMui, descricao: statusDescricao } = codStatusDescricao(codStatus);
  return (
    <Button onClick={handleDemandas}>
      <Stack sx={{ maxWidth: 250, width: 250 }}>
        <Chip
          avatar={<Avatar alt={nome} src={linkFoto} />}
          sx={{ justifyContent: 'flex-start' }}
          label={nome}
        />
        <Stack sx={{ p: 1, textAlign: 'left' }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              color: 'border.chat',
            }}
          >
            <Typography sx={{ fontSize: 12 }}>
              Atendimento: {codAtendimento}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              {showDate(dataStatus)}
            </Typography>
          </Stack>

          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              fontSize: 13.5,
            }}
          >
            {descricao}
          </Typography>
        </Stack>
        <Chip
          sx={{ maxWidth: 80, height: 20, fontSize: 10 }}
          variant="outlined"
          label={statusDescricao}
          color={corMui}
        />
      </Stack>
    </Button>
  );
}
