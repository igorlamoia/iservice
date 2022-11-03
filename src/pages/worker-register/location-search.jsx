import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MultipleSearchInput, SearchInput } from '../../components';
import { Virtualize } from './virtualize-autocompleate';

export default function LocationInputs() {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [stateChosed, setStateChosed] = useState({ id: 0, nome: '' });
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
  console.log(states);

  // useEffect(() => {
  //   //
  //   setLoading(true);

  //   fetch('  https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  //     .then((dados) => dados.json())
  //     .then((data) => {
  //       setStates(data);
  //       setLoading(false);
  //     });
  // }, []);

  const handleSelect = async ({ id, nome }) => {
    setStateChosed({ id, nome });
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
      );
      const arrayCidades = data.map((city) => ({
        id: city.id,
        nome: city.nome,
      }));
      setCities(arrayCidades);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectCity = (citiesChosed) => {
    console.log(citiesChosed);
  };

  return (
    <>
      <SearchInput
        loading={loading}
        textFieldProps={{
          label: 'Estado de atuação',
        }}
        autocompleteProps={{
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
      <Virtualize>
        <MultipleSearchInput
          disableListWrap
          loading={loading}
          textFieldProps={{
            label: 'Cidades de Atuação',
            placeholder: 'Cidades',
          }}
          autocompleteProps={{
            loading,
            // value: services,
            options: cities,
            onChange: (event, value) => {
              handleSelectCity(value);
            },
            getOptionLabel: (city) => `${city.nome}`,
          }}
        />
      </Virtualize>
    </>
  );
}

// , (${city.municipio?.microrregiao?.mesorregiao?.nome})
