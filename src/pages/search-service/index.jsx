import { Box, Container, Typography } from '@mui/material';
import { isNaN } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import {
  Carousel,
  Footer,
  Navbar,
  SkeletonWorkercard,
  WorkerCard,
} from '../../components';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';
import { api } from '../../utils/api';
import {
  convertMinutesToStringTime,
  convertTimeStringToMinute,
  formatarHora,
} from '../../utils/format';
import { BoxService } from './box-service';
import { BreadCrumbsMenu } from './bread-crumbs-menu';
import { FilterOptions } from './filter-options';
import { NoParamsFilterRoute } from './no-params-filter-route';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Gallery } from './gallery';
import ImageListItem from '@mui/material/ImageListItem';
const intervaloInvalido = (horario) => horario < 0 || horario > 1439;

// import T2 from '../../assets/t2.json';
// import useGeoLocation from '../../hooks/useGeolocation';

export default function SearchService() {
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const { state } = useLocation();
  const [isLoadingPrestadores, setIsLoadingPrestadores] = useState(true);
  const [prestadores, setPrestadores] = useState([]);

  const service = state;

  const handlePrestadores = (prestadoresAPI) => {
    const prestadoresDTO = prestadoresAPI?.map((prestador) => ({
      ...prestador,
      profissao: prestador.especialidades[0]?.nome,
      especialidades: prestador.especialidades?.map(
        (especialidade) => especialidade.descricao
      ),
      workDays: prestador.diasAtendimento?.split(','),
      descricao: prestador.descricaoProfissional,
      cidades: prestador.cidadesAtendimento?.map((cidade) => cidade.nome),
      horaDe: convertMinutesToStringTime(prestador.horarioAtendimentoInicio),
      horaAte: convertMinutesToStringTime(prestador.horarioAtendimentoFim),
    }));
    return prestadoresDTO;
  };

  const handleSearchPrestador = async () => {
    try {
      const horarioAtendimentoInicio = service.horarioAtendimentoInicio
        ? convertTimeStringToMinute(
            formatarHora(service.horarioAtendimentoInicio)
          )
        : null;
      const horarioAtendimentoFim = service.horarioAtendimentoFim
        ? convertTimeStringToMinute(formatarHora(service.horarioAtendimentoFim))
        : null;

      if (
        isNaN(horarioAtendimentoInicio) ||
        intervaloInvalido(horarioAtendimentoInicio)
      )
        return setInteractivityError(
          'Horário de início de atendimento inválido'
        );
      if (
        isNaN(horarioAtendimentoFim) ||
        intervaloInvalido(horarioAtendimentoFim)
      )
        return setInteractivityError('Horário de fim de atendimento inválido');
      setIsLoadingPrestadores(true);
      const { data } = await api.post('filtros/listar-prestador', {
        codCategoria: service.codCategoria || null,
        codEspecialidade: service.codEspecialidade || null,
        // idServico: service.idServico || null,
        descricao: service.descricao || null,
        diasAtendimento: service.diasAtendimento || [],
        horarioAtendimentoInicio,
        horarioAtendimentoFim,
        codCidade: service.city?.codCidade || null,
      });
      setPrestadores(handlePrestadores(data.payload));
    } catch (error) {
      console.log(error);
      if (error.mensagem) return setInteractivityError(error.mensagem);
      setInteractivityError('Erro ao buscar prestadores');
    } finally {
      setIsLoadingPrestadores(false);
    }
  };

  useEffect(() => {
    const haveService = service || {};
    if (
      !haveService.codCategoria &&
      !haveService.codEspecialidade &&
      !haveService.idServico &&
      !haveService.descricao &&
      !haveService.diasAtendimento &&
      !haveService.horarioAtendimentoInicio &&
      !haveService.horarioAtendimentoFim &&
      !haveService.city?.codCidade
    ) {
      setIsLoadingPrestadores(false);
    } else handleSearchPrestador();
  }, [service]);

  return (
    <>
      <Box
        sx={{
          padding: {
            xs: '1rem 1.5rem',
            md: '1rem 3rem',
            lg: '1rem 4rem',
          },
        }}
      >
        <Navbar />
        <Container
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            pt: { xs: 2, sm: 0 },
          }}
        >
          <BreadCrumbsMenu params={service ?? {}} />
          <BoxService service={service ?? {}} />
          <FilterOptions service={service ?? {}} />
          {/* <Carousel>
            {isLoadingPrestadores
              ? [1, 2, 3, 4].map((key) => (
                  <SwiperSlide key={key}>
                    <SkeletonWorkercard />
                  </SwiperSlide>
                ))
              : prestadores?.map((prestador) => (
                  <SwiperSlide key={prestador.codPrestador}>
                    <WorkerCard user={prestador} />
                  </SwiperSlide>
                ))}
          </Carousel> */}
          <Gallery>
            {isLoadingPrestadores
              ? [1, 2, 3, 4, 5, 6].map((key) => (
                  <ImageListItem key={key}>
                    <SkeletonWorkercard />
                  </ImageListItem>
                ))
              : prestadores?.map((prestador) => (
                  <ImageListItem key={prestador.codPrestador}>
                    <WorkerCard user={prestador} />
                  </ImageListItem>
                ))}
          </Gallery>

          <NoParamsFilterRoute service={service ?? {}} />
          <Box
            sx={{
              my: 'auto',
              mx: 'auto',
              // bgcolor: 'background.paper',
            }}
          >
            {prestadores?.length === 0 && !isLoadingPrestadores && (
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1.7rem',
                    lg: '2.2rem',
                  },
                  // mt: { xs: '3rem', md: '2rem', lg: 0 },
                  // bgcolor: 'background.paper',
                }}
              >
                Nenhum prestador encontrado
              </Typography>
            )}
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
