import React from 'react';
import pokeballImg from '../assets/pokeball.svg';

export const Pokemon = ({ name, url, showInfo }) => {
  /**@description  es la ruta base donde se almacenan la imagen de cada pokémon*/
  const urlBaseImagen =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  /**@description como no tenemos el numero de pokémon lo extraemos desde la url */
  const pokemonNumber = url
    .replace('https://pokeapi.co/api/v2/pokemon/', '')
    .slice(0, -1);

  return (
    <div className="pokemon">
      <div className="pokemon-column">
        <h2 className="pokemon-name">
          {' '}
          {pokemonNumber} - {name}
        </h2>
        <div className="pokemon-action">
          <button onClick={() => showInfo(url)}>Ver Ficha</button>
        </div>
      </div>
      <div className="pokemon-column">
        <img src={pokeballImg} className="pokeball-img" />
        <img
          className="pokemon-img"
          src={`${urlBaseImagen}/${pokemonNumber}.png`}
        />
      </div>
    </div>
  );
};
