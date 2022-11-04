import React from 'react';
import './style.scss';
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AtendimentoLocationIcon from '@mui/icons-material/WhereToVoteRounded';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactComponent as MoreSVG } from '../../assets/more.svg';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=100';

const daysOfWeek = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export default function WorkerCard({ user = {} }) {
  const { palette } = useTheme();

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        borderRadius: 1.5,
        scrollSnapAlign: 'start',
        width: 300,
        minWidth: 290,
      }}
      className="card-body"
      elevation={4}
    >
      <header className="profile">
        <LazyLoadImage
          className="profile-img"
          height="100%"
          effect="blur"
          src={user.fotoUrl ?? DEFAULT_IMAGE}
          width="100%"
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div className="profile-info">
          <h5 className="profile-name">{user.nome ?? 'Chaulim'}</h5>
          <strong className="profession">
            {user.profissao ?? 'Açougueiro'}
          </strong>
          <Typography
            sx={{
              alignItems: 'center',
              display: 'flex',
              fontSize: '0.9rem',
              gap: 1,
            }}
          >
            <QueryBuilderIcon fontSize="small" /> 12:33 - 18:22
          </Typography>
          <Rating
            name="half-rating"
            defaultValue={4.5}
            value={4.0}
            precision={0.5}
            readOnly
          />
          <div className="location">
            <Badge
              overlap="circular"
              sx={{
                '.MuiBadge-badge': {
                  height: 10,
                  p: '6px',
                  width: 10,
                  minWidth: 10,
                  borderRadius: '50%',
                  border: `1px solid ${palette.border.main}`,
                  bgcolor: palette.border.main,
                },
              }}
              badgeContent={user.cidades?.length ?? 1}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <AtendimentoLocationIcon
              // fontSize="small"
              />
            </Badge>
            {user.cidades?.map((cidade) => (
              <Chip
                key={cidade}
                label={cidade.nome}
                size="small"
                variant="outlined"
              />
            ))}
          </div>
        </div>
      </header>
      <Stack
        sx={{
          justifyContent: 'center',
        }}
        direction="row"
      >
        <Stack direction="row" spacing={0.4}>
          {daysOfWeek.map((day, index) => (
            <Chip
              key={index}
              sx={{
                height: 26,
                width: 26,
                '.MuiChip-label': { fontSize: 10 },
              }}
              label={day}
              variant="outlined"
              size="small"
              color={user.workDays?.includes(index + 1) ? 'primary' : 'default'}
            />
          ))}
        </Stack>
      </Stack>
      <div className="description">
        <h5>Descrição do profissional</h5>
        <p>
          {user.descricao ??
            `Faço serviços relacionados a Televisão, Ar condicionado, geladeira
          local`}
          <span>... ver mais</span>
        </p>
      </div>
      <Box
        component="footer"
        sx={{
          bgcolor: 'shape.light',
          ...(palette.mode === 'dark' && {
            boxShadow: '0px 0px 5px var(--color-primary-dark)',
          }),
        }}
        className="card-footer"
        mode={palette.mode}
      >
        <IconButton
          className="more-info"
          sx={{
            bgcolor: palette.primary.main,
            transition: 'filter .3s ease',
            '&:hover': {
              bgcolor: palette.primary.dark,
              filter: `drop-shadow(0px 0px 0.6rem ${palette.primary.main})`,
            },
          }}
        >
          <MoreSVG />
        </IconButton>
        <h5>Avaliação mais recente</h5>
        <div className="review">
          <p>
            <strong>Roberto Silva:</strong> Excelentes profissionais, rápidos,
            honestos e com bom preços. Recomendo muito
          </p>
        </div>
        <Button
          variant="contained"
          sx={{
            color: 'black',
            fontWeight: 600,
            boxShadow: 0,
            borderRadius: 1.7,
            transition: 'transform .2s ease-in-out',
            '&:hover': {
              boxShadow: 0,
              bgcolor: palette.primary.dark,
              transform: 'scale(0.99)',
            },
          }}
        >
          Solicitar Orçamento
        </Button>
      </Box>
    </Paper>
  );
}
