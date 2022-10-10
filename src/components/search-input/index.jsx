import React from 'react';
import './style.scss';
import SearchSVG from '../../assets/search-icon.svg';

export default function SearchInput() {
  return (
    <div className="input-wrapper">
      <img src={SearchSVG} alt="" />
      <input
        type="text"
        name="profissionais-search"
        id=""
        placeholder="Pesquise profissionais"
      />
    </div>
  );
}
