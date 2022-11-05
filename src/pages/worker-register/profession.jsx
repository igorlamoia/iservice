import { Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MultipleSearchInputForm, SearchInputForm } from '../../components';
import MultipleSearchInput from '../../components/form/multiple-search-input';
import { api } from '../../utils/api';
import { Virtualize } from './virtualize-autocompleate';

export default function Profession({ setProfissionValues = () => {} }) {
  const [categories, setCategories] = useState([]);
  const [profissoes, setProfissoes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesChoused, setEspecialidadesChoused] = useState([]);
  const [categoryChoused, setCategoryChoused] = useState(null);
  const [profissoesChoused, setProfissoesChoused] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategories = async () => {
    try {
      if (categories.length) return;
      setLoading(true);
      const { data } = await api.get('/listar/todas-categorias');
      setCategories(data.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleEspecialidades = async () => {
    try {
      if (especialidades.length) return;
      setLoading(true);
      const { data } = await api.get('/listar/todas-especialidades');
      setEspecialidades(data.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleProfissao = async () => {
    try {
      if (profissoes.length) return;
      setLoading(true);
      const { data } = await api.get('listar/todas-profissoes');
      setProfissoes(data.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleSelectCategory = (value) => {
    setCategoryChoused(value);
  };

  const handleSelectProfissao = (value) => {
    setProfissoesChoused(value);
  };

  const handleSelectEspecialidade = (value) => {
    setEspecialidadesChoused(value);
  };

  useEffect(() => {
    setProfissionValues({
      codCategoria: categoryChoused?.codCategoria,
      profissao: profissoesChoused?.nome,
      especialidades: especialidadesChoused.map((item) => item.nome),
    });
  }, [categoryChoused, profissoesChoused, especialidadesChoused]);

  return (
    <Stack spacing={1}>
      <Typography>Especialidade(s) </Typography>
      <Stack spacing={2}>
        <SearchInputForm
          loading={loading}
          textFieldProps={{
            label: 'Categoria',
          }}
          autocompleteProps={{
            sx: { width: '100%' },
            onFocus: handleCategories,
            loading,
            value: categoryChoused,
            options: categories,
            onChange: (event, value) => {
              handleSelectCategory(value);
            },
            getOptionLabel: (categoria) => `${categoria.nome}`,
          }}
        />
        <SearchInputForm
          loading={loading}
          textFieldProps={{
            label: 'Profissão',
          }}
          autocompleteProps={{
            sx: { width: '100%' },
            onFocus: handleProfissao,
            loading,
            value: profissoesChoused,
            options: profissoes,
            onChange: (event, value) => {
              handleSelectProfissao(value);
            },
            getOptionLabel: (item) => `${item.nome}`,
          }}
        />
        <Virtualize>
          <MultipleSearchInputForm
            disableListWrap
            loading={loading}
            textFieldProps={{
              label: 'Especialidades',
            }}
            autocompleteProps={{
              sx: { width: '100%' },
              onFocus: handleEspecialidades,
              // value: services,
              value: especialidadesChoused,
              options: especialidades,
              onChange: (event, value) => {
                handleSelectEspecialidade(value);
              },
              getOptionLabel: (city) => `${city?.nome}`,
            }}
          />
        </Virtualize>
        <Divider />
      </Stack>
    </Stack>
  );
}
