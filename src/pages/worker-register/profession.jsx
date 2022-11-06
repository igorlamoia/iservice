import {
  createFilterOptions,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MultipleSearchInputForm, SearchInputForm } from '../../components';
import MultipleSearchInput from '../../components/form/multiple-search-input';
import { api } from '../../utils/api';
import { Virtualize } from './virtualize-autocompleate';

export default function Profession({
  setProfissionValues = () => {},
  validationErros = {},
}) {
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
    setEspecialidadesChoused((old) => ({ ...old, ...value }));
    setEspecialidadesChoused(value);
  };

  useEffect(() => {
    setProfissionValues({
      codCategoria: categoryChoused?.codCategoria,
      profissao: profissoesChoused?.nome,
      especialidades: especialidadesChoused.map((item) => item.nome),
    });
  }, [categoryChoused, profissoesChoused, especialidadesChoused]);

  const filter = createFilterOptions();

  return (
    <Stack spacing={1}>
      <Typography sx={{ mb: 0.5 }}>Prestação de Serviço</Typography>
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
            isOptionEqualToValue: (option, value) => option.nome === value.nome,
            onChange: (event, newValue) => {
              if (newValue === null) return;
              if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                handleSelectProfissao({
                  nome: newValue.inputValue,
                });
              } else {
                handleSelectProfissao({ nome: newValue.nome });
              }
            },
            filterOptions: (options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.nome
              );
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  nome: `Adicionar profissão: "${inputValue}"`,
                });
              }

              return filtered;
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
              limitTags: 2,
              onFocus: handleEspecialidades,
              value: especialidadesChoused,
              options: especialidades,
              onChange: (event, newValue) => {
                const newArrayEspecialidades = newValue.map((item) => {
                  if (item.inputValue) return { nome: item.inputValue };
                  return { nome: item.nome };
                });
                handleSelectEspecialidade(newArrayEspecialidades);
              },
              isOptionEqualToValue: (option, value) =>
                option.nome === value.nome,
              filterOptions: (options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.nome
                );
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    nome: `Adicionar: "${inputValue}"`,
                  });
                }

                return filtered;
              },
              getOptionLabel: (city) => `${city?.nome}`,
            }}
          />
        </Virtualize>
      </Stack>
      {Boolean(validationErros?.especialidades) && (
        <FormHelperText error>{validationErros.especialidades}</FormHelperText>
      )}
    </Stack>
  );
}
