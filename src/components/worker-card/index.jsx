// import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import React, { Fragment, useState } from 'react';
import './style.scss';
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AtendimentoLocationIcon from '@mui/icons-material/WhereToVoteRounded';
import styled from '@emotion/styled';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactShowMoreText from 'react-show-more-text';

import { collection, query, where, getDocs } from 'firebase/firestore';

import { ReactComponent as MoreSVG } from '../../assets/more.svg';
import { MyPopover } from '..';
import LoadImage from '../../assets/images/avatar-default.svg';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import SpeedDialMore from './speed-more';

const daysOfWeek = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
const weekDays = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export default function WorkerCard({ user = {} }) {
  const DEFAULT_IMAGE = LoadImage;

  const { palette } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // console.log('user', user);

  // Preciso disso no handleSelect:
  // displayName : "teste"
  // email : "teste@s.com"
  // photoURL : null
  // uid : "IUWO8glD8qbbstrS8P9UcqzlvwZ2"
  const handleShowMore = async () => {
    console.log('handleShowMore');
    try {
      if (isLoading) return;
      setIsLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      // Só preciso de um usuário, então pego o primeiro
      querySnapshot.forEach((usuario) => {
        const prestador = usuario.data();
        navigate('/chat', {
          state: {
            prestador: {
              displayName: prestador.displayName,
              email: prestador.email,
              photoURL: prestador.photoURL,
              uid: prestador.uid,
            },
          },
        });
      });

      setIsLoading(false);
      // setTimeout(() => setIsLoading(false), 1000);
    } catch (erro) {
      console.log('erro', erro);
      setIsLoading(false);
    }
  };

  const especialidesLabel = user.especialidades?.map((especialidade, index) => (
    <Typography
      sx={{ textTransform: 'capitalize' }}
      key={especialidade}
      variant="span"
    >
      {index === 0 ? especialidade : ` - ${especialidade}`}
    </Typography>
  ));
  const especialidades = user.especialidades?.map((especialidade, index) => (
    <Fragment key={especialidade.nome ?? index}>
      {index !== 0 ? ' ' : null}
      <Chip
        sx={{
          height: 23,
          maxWidth: 100,
          textTransform: 'capitalize',
          // ml: 0.1,
          '.MuiChip-label': { fontSize: 12 },
        }}
        label={especialidade}
      />
    </Fragment>
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
          src={user.linkFoto || user.photoURL || DEFAULT_IMAGE}
          width={120}
          style={{ borderRadius: 100, objectFit: 'cover' }}
          placeholderSrc={LoadImage}
          placeholder={<Skeleton variant="circular" width={120} height={120} />}
        />
        <div className="profile-info">
          <h5 className="profile-name">{user.nome}</h5>
          <MyPopover title={user.profissao}>
            <Chip
              sx={{
                maxWidth: 120,
                textAlign: 'left',
                my: 0.5,
                textTransform: 'capitalize',
              }}
              size="small"
              label={user.profissao}
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
          <MyPopover
            title={
              user.avaliacao ? `${user.avaliacao}/5` : 'Não possui avaliação'
            }
          >
            <Rating
              name="rating"
              value={user.avaliacao ?? 0}
              precision={0.1}
              readOnly
            />
          </MyPopover>
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
              badgeContent={user.cidades?.length}
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
            <MyPopover key={weekDays[index]} title={weekDays[index]}>
              <Chip
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
            </MyPopover>
          ))}
        </Stack>
      </Stack>
      <div className="description">
        <Badge
          // overlap="circular"
          sx={{
            '.MuiBadge-badge': {
              height: 5,
              p: '6px',
              mt: 2.2,
              // left: 0,
              right: -9,
              width: 10,
              minWidth: 10,
              borderRadius: '50%',
              border: `2px solid ${palette.border.main}`,
              bgcolor: palette.border.main,
            },
          }}
          badgeContent={user.especialidades?.length}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <h5>Descrição profissional</h5>
        </Badge>

        <div className="especialidades">
          <MyPopover title={especialidesLabel}>
            <Stack direction="row" spacing={0.4}>
              {especialidades}
            </Stack>
          </MyPopover>
        </div>

        <Stack sx={{ my: 1 }}>
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
            truncatedEndingComponent="... "
            // width={200}
          >
            {user.descricao}
          </ReactShowMoreText>
        </Stack>
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
        {/* <CustomSpeedDial /> */}
        {isLoading ? (
          <Stack
            sx={{
              position: 'absolute',
              p: '10px',
              mt: '-20px',
              top: 0,
              // bgcolor: 'primary.main',
              boxShadow: `0px 0px 5px ${palette.primary.main}`,
              borderRadius: '50%',
              right: '1.75rem',
            }}
          >
            <CircularProgress color="secondary" size={20} />
          </Stack>
        ) : (
          <SpeedDialMore palette={palette} handleShowMore={handleShowMore} />
        )}
        <h5>Avaliação mais recente</h5>
        <div className="review">
          {user.avaliacaoMaisRecente ? (
            <p>
              <Typography as="strong">Roberto Silva:</Typography> Excelentes
              profissionais, rápidos, honestos e com bom preços. Recomendo muito
            </p>
          ) : (
            <p>
              <Typography as="strong">{user.nome}</Typography> ainda não possui
              avaliações. Seja o primeiro a avaliar
            </p>
          )}
        </div>
        <Button
          variant="contained"
          disabled={isLoading}
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

  top: -10,
  bottom: 0,
  left: 0,
  right: -10,

  '& .MuiButtonBase-root.MuiSpeedDial-fab': {
    backgroundColor: 'rgba(0,0,0,0)',

    width: '140px',
    borderRadius: 0,
    minHeight: '25px',
    boxShadow: 0,
  },
  '.MuiSpeedDialAction-staticTooltipLabel': {
    backgroundColor: theme.palette.shape.main,
    paddingBottom: 0,
  },
  // zIndex: 1051,
  span: {
    '&.MuiSpeedDialAction-staticTooltip': {
      display: 'flex',
      flexDirection: 'row-reverse',
      // backgroundColor: 'red',
      transform: 'translateX(-100px)',
    },
    '&.MuiSpeedDialAction-staticTooltipLabel': {
      minWidth: '100px',
      textAlign: 'center',
      transform: 'translateX(195px)',
    },
  },
  '&:hover': {
    filter: `drop-shadow(0 0 0.6rem ${theme.palette.primary.main})`,
  },
  '& .MuiSpeedDial-actions': {
    transform: 'translateY(-10px)',
  },
}));
