import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { useAuthContext } from '../../hooks/context/AuthContext';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';
import { api } from '../../utils/api';
import { codStatusDescricao } from '../../utils/codigos';
import { showDate } from '../../utils/format';
import CardList from './card-list';
import ModalDemanda from './modal-solicitacao';

export function Solicitacoes() {
  const { logedUser, logOut, isLoading } = useAuthContext();
  const [demandas, setDemandas] = useState([]);
  const [isLoadingNotification, setIsLoadingNotification] = useState(true);
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getSolicitacoes = async () => {
    try {
      setIsLoadingNotification(true);
      const { data } = await api.get(
        `listar/solicitacoes-usuario?codUsuario=${logedUser.codUsuario}`
      );
      setDemandas(data.payload);
    } catch (error) {
      setInteractivityError(error?.response?.data?.message || 'Falha na api');
    } finally {
      setIsLoadingNotification(false);
    }
  };

  const todasDemandas = demandas;
  const demandasPendentes = demandas.filter(
    (demanda) => demanda.codStatus === 1
  );
  const demandasFinalizadas = demandas.filter(
    (demanda) => demanda.codStatus === 6
  );

  useEffect(() => {
    if (!logedUser.codUsuario) return;
    getSolicitacoes();
  }, [logedUser?.codUsuario]);

  const [choosedDemanda, setChoosedDemanda] = useState({});

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Navbar />

      <Typography variant="h5" sx={{ mt: 2 }}>
        Demandas
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pendentes" {...a11yProps(0)} />
            <Tab label="Todas" {...a11yProps(1)} />
            <Tab label="Finalizadas" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {demandasPendentes?.map((demanda) => (
            <CardList
              key={demandas.codAtendimento}
              dados={demanda}
              onClick={() => setChoosedDemanda(demanda)}
            />
          ))}
          {demandasPendentes?.length === 0 && !isLoadingNotification && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Você não possui demandas Pendente
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {todasDemandas?.map((demanda) => (
            <CardList
              key={demandas.codAtendimento}
              dados={demanda}
              onClick={() => setChoosedDemanda(demanda)}
            />
          ))}
          {todasDemandas?.length === 0 && !isLoadingNotification && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Você não possui demandas
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {demandasFinalizadas?.map((demanda) => (
            <CardList
              key={demandas.codAtendimento}
              dados={demanda}
              onClick={() => setChoosedDemanda(demanda)}
            />
          ))}
          {demandasFinalizadas?.length === 0 && !isLoadingNotification && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Você não possui demandas concluídas
            </Typography>
          )}
        </TabPanel>
        {isLoadingNotification && (
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <CircularProgress color="secondary" />
          </Stack>
        )}
        {choosedDemanda?.codAtendimento && (
          <ModalDemanda
            demanda={choosedDemanda}
            setChoosedDemanda={setChoosedDemanda}
            demandas={demandas}
            setDemandas={setDemandas}
          />
        )}
      </Box>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
