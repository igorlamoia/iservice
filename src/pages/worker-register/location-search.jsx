import { FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { MultipleSearchInputForm, SearchInputForm } from '../../components';
import { Virtualize } from './virtualize-autocompleate';

export default function LocationInputs({
  setLocation,
  location = {},
  validationErros = {},
}) {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [stateChoused, setStateChoused] = useState({ id: 0, nome: '' });
  const [cities, setCities] = useState([]);

  const handleState = async () => {
    try {
      if (states?.length) return;
      setLoading(true);
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      setStates(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelect = async ({ id, nome }) => {
    if (stateChoused?.id === id) return;
    setStateChoused({ id, nome });
    setCities([]);
    setLocation({ state: id, cities: [] });

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
      );
      const arrayCidades = data.map((city) => city.nome);

      setCities(arrayCidades);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectCity = (citiesChosed) => {
    setLocation((old) => ({ ...old, cities: citiesChosed }));
  };

  return (
    <>
      <SearchInputForm
        loading={loading}
        textFieldProps={{
          label: 'Estado de atuação',
        }}
        autocompleteProps={{
          sx: { width: '100%' },
          onFocus: handleState,
          loading,
          // value: services,
          options: states,
          onChange: (event, value) => {
            handleSelect(value);
          },
          getOptionLabel: (state) => `${state.nome} (${state.sigla})`,
        }}
      />
      {Boolean(validationErros?.nomeCidade) && (
        <FormHelperText error>{validationErros.nomeCidade}</FormHelperText>
      )}
      <Virtualize>
        <MultipleSearchInputForm
          disableListWrap
          loading={loading}
          textFieldProps={{
            label: 'Cidades de Atuação',
            placeholder: 'Cidades',
          }}
          autocompleteProps={{
            loading,
            sx: { width: '100%' },
            limitTags: 2,
            // value: services,
            value: location.cities,
            options: cities,
            onChange: (event, value) => {
              handleSelectCity(value);
            },
            getOptionLabel: (city) => `${city.nome}`,
          }}
        />
      </Virtualize>
      {Boolean(validationErros?.codEstado) && (
        <FormHelperText error>{validationErros.codEstado}</FormHelperText>
      )}
    </>
  );
}

// , (${city.municipio?.microrregiao?.mesorregiao?.nome})
