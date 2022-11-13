import React, { useEffect, useState } from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Container, Skeleton, Typography, useTheme } from '@mui/material';
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
} from '../../components';
import { Categorias } from './categorias';
import AboutUs from '../../components/about-us';
import SearchInput from './search-input';
import { api } from '../../utils/api';
import { convertMinutesToStringTime } from '../../utils/format';

export default function Home() {
  const {
    palette: { mode },
  } = useTheme();
  const darkmode = mode === 'dark';

  const [isLoading, setIsLoading] = useState(false);
  const [prestadores, setPrestadores] = useState([]);

  const handlePrestadores = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('listar/todos-prestadores');
      console.log('prestadores antes', data.payload?.prestadores);
      const prestadoresTratados = data.payload?.prestadores?.map(
        (prestador) => ({
          ...prestador,
          profissao: prestador.especialidades[0]?.nome,
          especialidades: prestador.especialidades.map(
            (especialidade) => especialidade.descricao
          ),
          workDays: prestador.diasAtendimento?.split(','),
          descricao: prestador.descricaoProfissional,
          cidades: prestador.cidadesAtendimento.map((cidade) => cidade.nome),
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
      setIsLoading(false);
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
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
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
          <Carousel>
            {/* loading ? (
  <Skeleton>

  </Skeleton>
) : (
  <Avatar src={data.avatar} />
); */}
            <SwiperSlide>
              <SkeletonWorkercard />
            </SwiperSlide>
            {prestadores?.map((prestador) => (
              <SwiperSlide key={prestador.codPrestador}>
                <WorkerCard user={prestador} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <WorkerCard />
            </SwiperSlide>

            <SwiperSlide>
              <WorkerCard />
            </SwiperSlide>
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
