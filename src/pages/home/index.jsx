import React, { useEffect, useState } from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Container, Typography, useTheme } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import iServiceLottie from '../../assets/iservice-lottie.json';
import darkIServiceLottie from '../../assets/dark-iservice-lottie.json';
import {
  ServiceCard,
  Footer,
  Navbar,
  WorkerCard,
  Carousel,
  SkeletonWorkercard,
  Categorias,
} from '../../components';
import AboutUs from '../../components/about-us';
import SearchInput from './search-input';
import { api } from '../../utils/api';
import { convertMinutesToStringTime } from '../../utils/format';

export default function Home() {
  const {
    palette: { mode },
  } = useTheme();
  const darkmode = mode === 'dark';

  const [isLoadingPrestadores, setIsLoadingPrestadores] = useState(false);
  const [prestadores, setPrestadores] = useState([]);

  const handlePrestadores = async () => {
    try {
      setIsLoadingPrestadores(true);
      const { data } = await api.get('listar/todos-prestadores');
      // console.log('prestadores antes', data.payload?.prestadores);
      const prestadoresTratados = data.payload?.prestadores?.map(
        (prestador) => ({
          ...prestador,
          profissao: prestador.especialidades[0]?.nome,
          especialidades: prestador.especialidades?.map(
            (especialidade) => especialidade.descricao
          ),
          workDays: prestador.diasAtendimento?.split(','),
          descricao: prestador.descricaoProfissional,
          cidades: prestador.cidadesAtendimento?.map((cidade) => cidade.nome),
          horaDe: convertMinutesToStringTime(
            prestador.horarioAtendimentoInicio
          ),
          horaAte: convertMinutesToStringTime(prestador.horarioAtendimentoFim),
        })
      );
      // console.log('prestadoresTratados', prestadoresTratados);
      setPrestadores(prestadoresTratados);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoadingPrestadores(false);
    }
  };

  useEffect(() => {
    handlePrestadores();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Container className="caixainicial">
          <div className="textoinicial">
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '1.7rem',
                  lg: '2.2rem',
                },
                mt: { xs: '3rem', md: '2rem', lg: 0 },
                fontWeight: '600',
              }}
            >
              Deu problema e não tem como resolver? Fique tranquilo,{' '}
              <span>i</span>Service tem os melhores profissionais esperando por
              você!
            </Typography>
            <p>Conectando quem precisa com quem sabe fazer</p>
            <SearchInput />
          </div>
          <LottieAnimacao
            animationData={darkmode ? darkIServiceLottie : iServiceLottie}
            className="lottie"
          />
        </Container>
        <div className="categorias-div">
          <Categorias />
        </div>
        <Container>
          <Typography
            variant="h2"
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 2,
              fontSize: {
                xs: '1rem',
                sm: '1.3rem',
                lg: '1.7rem',
              },
              mt: { xs: '3rem', md: '2rem', lg: 0 },
              fontWeight: '400',
            }}
          >
            Os melhores profissionais esperando por você!
          </Typography>
          <Carousel>
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
          </Carousel>
          <AboutUs />

          <Carousel>
            <SwiperSlide>
              <ServiceCard />
            </SwiperSlide>
            <SwiperSlide>
              <ServiceCard />
            </SwiperSlide>
            <SwiperSlide>
              <ServiceCard />
            </SwiperSlide>
          </Carousel>
        </Container>
      </main>
      <Footer />
    </>
  );
}
