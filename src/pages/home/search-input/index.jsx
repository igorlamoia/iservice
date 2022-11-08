/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './style.scss';
// import SearchSVG from '../../assets/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../../components';
import { api } from '../../../utils/api';

export default function SearchInputHome() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const handleServiceSearch = async (event) => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `listar/servicos?search=${event.target.value}`
      );
      setServices(data.payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelect = (value) => {
    navigate('/search/service', { state: { service: value } });
  };

  return (
    <SearchInput
      loading={loading}
      handleSearch={handleServiceSearch}
      textFieldProps={{
        label: 'Encontrar serviço',
      }}
      autocompleteProps={{
        loading,
        // value: services,
        options: services,
        onChange: (event, value) => {
          handleSelect(value);
        },
        groupBy: (option) => option.nomeCategoria,
        getOptionLabel: (option) =>
          `${option.nomeEspecialidade}: ${option.descricao}`,
      }}
    />
  );
}
