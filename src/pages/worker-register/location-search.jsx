import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MultipleSearchInput, SearchInput } from '../../components';
import { Virtualize } from './virtualize-autocompleate';

export default function LocationInputs() {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([
    {
      id: 11,
      sigla: 'RO',
      nome: 'Rondônia',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 12,
      sigla: 'AC',
      nome: 'Acre',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 13,
      sigla: 'AM',
      nome: 'Amazonas',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 14,
      sigla: 'RR',
      nome: 'Roraima',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 15,
      sigla: 'PA',
      nome: 'Pará',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 16,
      sigla: 'AP',
      nome: 'Amapá',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 17,
      sigla: 'TO',
      nome: 'Tocantins',
      regiao: {
        id: 1,
        sigla: 'N',
        nome: 'Norte',
      },
    },
    {
      id: 21,
      sigla: 'MA',
      nome: 'Maranhão',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 22,
      sigla: 'PI',
      nome: 'Piauí',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 23,
      sigla: 'CE',
      nome: 'Ceará',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 24,
      sigla: 'RN',
      nome: 'Rio Grande do Norte',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 25,
      sigla: 'PB',
      nome: 'Paraíba',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 26,
      sigla: 'PE',
      nome: 'Pernambuco',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 27,
      sigla: 'AL',
      nome: 'Alagoas',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 28,
      sigla: 'SE',
      nome: 'Sergipe',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 29,
      sigla: 'BA',
      nome: 'Bahia',
      regiao: {
        id: 2,
        sigla: 'NE',
        nome: 'Nordeste',
      },
    },
    {
      id: 31,
      sigla: 'MG',
      nome: 'Minas Gerais',
      regiao: {
        id: 3,
        sigla: 'SE',
        nome: 'Sudeste',
      },
    },
    {
      id: 32,
      sigla: 'ES',
      nome: 'Espírito Santo',
      regiao: {
        id: 3,
        sigla: 'SE',
        nome: 'Sudeste',
      },
    },
    {
      id: 33,
      sigla: 'RJ',
      nome: 'Rio de Janeiro',
      regiao: {
        id: 3,
        sigla: 'SE',
        nome: 'Sudeste',
      },
    },
    {
      id: 35,
      sigla: 'SP',
      nome: 'São Paulo',
      regiao: {
        id: 3,
        sigla: 'SE',
        nome: 'Sudeste',
      },
    },
    {
      id: 41,
      sigla: 'PR',
      nome: 'Paraná',
      regiao: {
        id: 4,
        sigla: 'S',
        nome: 'Sul',
      },
    },
    {
      id: 42,
      sigla: 'SC',
      nome: 'Santa Catarina',
      regiao: {
        id: 4,
        sigla: 'S',
        nome: 'Sul',
      },
    },
    {
      id: 43,
      sigla: 'RS',
      nome: 'Rio Grande do Sul',
      regiao: {
        id: 4,
        sigla: 'S',
        nome: 'Sul',
      },
    },
    {
      id: 50,
      sigla: 'MS',
      nome: 'Mato Grosso do Sul',
      regiao: {
        id: 5,
        sigla: 'CO',
        nome: 'Centro-Oeste',
      },
    },
    {
      id: 51,
      sigla: 'MT',
      nome: 'Mato Grosso',
      regiao: {
        id: 5,
        sigla: 'CO',
        nome: 'Centro-Oeste',
      },
    },
    {
      id: 52,
      sigla: 'GO',
      nome: 'Goiás',
      regiao: {
        id: 5,
        sigla: 'CO',
        nome: 'Centro-Oeste',
      },
    },
    {
      id: 53,
      sigla: 'DF',
      nome: 'Distrito Federal',
      regiao: {
        id: 5,
        sigla: 'CO',
        nome: 'Centro-Oeste',
      },
    },
  ]);
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

  const handleSelectCity = (cityChoosed) => {
    console.log(cityChoosed);
  };

  return (
    <>
      Estado escolhido: {stateChosed?.nome}
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
