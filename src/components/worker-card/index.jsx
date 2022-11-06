// import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

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
import styled from '@emotion/styled';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactShowMoreText from 'react-show-more-text';
import { ReactComponent as MoreSVG } from '../../assets/more.svg';
import { MyPopover } from '..';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=100';

const daysOfWeek = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export default function WorkerCard({ user = {} }) {
  const { palette } = useTheme();

  const especialidesLabel = user.especialidades?.map((especialidade, index) => (
    <Typography key={especialidade} variant="span">
      {index === 0 ? especialidade : ` - ${especialidade}`}
    </Typography>
  ));
  const especialidades = user.especialidades?.map((especialidade, index) => (
    <>
      {index !== 0 ? ' ' : null}
      <Chip
        sx={{
          height: 23,
          maxWidth: 100,
          // ml: 0.1,
          '.MuiChip-label': { fontSize: 12 },
        }}
        label={especialidade}
      />
    </>
  ));

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
          height={120}
          effect="blur"
          src={user.photoURL ?? DEFAULT_IMAGE}
          width={120}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div className="profile-info">
          <h5 className="profile-name">{user.nome ?? 'Chaulim'}</h5>
          <MyPopover title={user.profissao}>
            <Chip
              sx={{
                maxWidth: 120,
                textAlign: 'left',
                my: 0.5,
              }}
              size="small"
              label={user.profissao ?? 'Açougueiro'}
            />
          </MyPopover>

          <Typography
            sx={{
              alignItems: 'center',
              display: 'flex',
              fontSize: '0.9rem',
              gap: 1,
            }}
          >
            <QueryBuilderIcon fontSize="small" /> {user.horaDe} - {user.horaAte}
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
            <div style={{ position: 'relative' }}>
              <StyledSpeedDial
                ariaLabel="Cidades de atuação"
                sx={{
                  '.MuiSpeedDial-fab': {
                    boxShadow: 0,
                  },
                }}
                direction="down"
              >
                {user.cidades?.map((cidade) => (
                  <SpeedDialAction
                    key={cidade}
                    icon={<AtendimentoLocationIcon />}
                    tooltipTitle={cidade}
                    tooltipOpen
                    // onClick={() => console.log('mama')}
                  />
                ))}
              </StyledSpeedDial>
              <Chip
                size="small"
                variant="outlined"
                sx={{
                  'span.MuiChip-label': {
                    maxWidth: '100px',
                  },
                }}
                label={user.cidades?.map((cidade, index) => (
                  <Typography key={cidade} variant="span">
                    {index === 0 ? cidade : ` - ${cidade}`}
                  </Typography>
                ))}
              />
            </div>
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
              color={
                user.workDays?.includes((index + 1).toString())
                  ? 'primary'
                  : 'default'
              }
            />
          ))}
        </Stack>
      </Stack>
      <div className="description">
        <h5>Descrição do profissional</h5>
        <div className="especialidades">
          <MyPopover title={especialidesLabel}>{especialidades}</MyPopover>
        </div>

        <p>
          <ReactShowMoreText
            lines={3}
            more={
              <Typography
                variant="span"
                sx={{ fontWeight: 'bold', textDecoration: 'none' }}
              >
                ver mais
              </Typography>
            }
            less={
              <Typography
                variant="span"
                sx={{ fontWeight: 'bold', textDecoration: 'none' }}
              >
                ver menos
              </Typography>
            }
            // className="content-css"
            keepNewLines={false}
            anchorClass="show-more-less-clickable"
            truncatedEndingComponent={'... '}
            // width={200}
          >
            {user.descricao ??
              `Faço serviços relacionados a Televisão, Ar condicionado, Faço serviços relacionados a Televisão, Ar condicionado,Faço serviços relacionados a Televisão, Ar condicionado,
          local`}
          </ReactShowMoreText>
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
          {user.avaliacaoMaisRecente ? (
            <p>
              <strong>Roberto Silva:</strong> Excelentes profissionais, rápidos,
              honestos e com bom preços. Recomendo muito
            </p>
          ) : (
            <p>
              <strong>{user.nome}</strong> ainda não possui avaliações. Seja o
              primeiro a avaliar
            </p>
          )}
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

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown': {
    top: theme.spacing(0),
    left: theme.spacing(0),
  },
  top: 0,
  bottom: 0,
  left: 0,
  right: 10,
  '& .MuiButtonBase-root.MuiSpeedDial-fab': {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '140px',
    borderRadius: 0,
    minHeight: '25px',
    boxShadow: 0,
  },
  '.MuiSpeedDialAction-staticTooltipLabel': {
    backgroundColor: theme.palette.shape.main,
  },
}));
