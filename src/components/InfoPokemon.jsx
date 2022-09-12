import React from 'react';

export const InfoPokemon = ({ back, infoPokemon }) => {
  /**@description arreglo para asociar el tipo de pokemon con un color */
  const colorTypes = [
    {
      name: 'normal',
      color: 'salmon',
    },
    {
      name: 'fighting',
      color: 'salmon',
    },
    {
      name: 'flying',
      color: 'steelblue',
    },
    {
      name: 'poison',
      color: 'purple',
    },
    {
      name: 'ground',
      color: 'brown',
    },
    {
      name: 'rock',
      color: 'darkslategray',
    },
    {
      name: 'bug',
      color: 'yellow',
    },
    {
      name: 'ghost',
      color: 'darkslategray',
    },
    {
      name: 'steel',
      color: 'darkslategray',
    },
    {
      name: 'fire',
      color: 'orange',
    },
    {
      name: 'water',
      color: 'cyan',
    },
    {
      name: 'grass',
      color: 'darkgreen',
    },
    {
      name: 'electric',
      color: 'yellow',
    },
    {
      name: 'psychic',
      color: 'violet',
    },
    {
      name: 'ice',
      color: 'cyan',
    },
    {
      name: 'dragon',
      color: 'darkblue',
    },
    {
      name: 'dark',
      color: 'black',
    },
    {
      name: 'fairy',
      color: 'pink',
    },
  ];
  /**@description esta varible almacena el tipo principal de pokémon(fuego, agua, hierba, etc) */
  const pokemonType = infoPokemon.types[0];

  /**@description para obtener el color del tipo de pokémon */
  const getColor = (type) => {
    const colorType = colorTypes.find((e) => e.name === type);
    return colorType.color;
  };

  return (
    <div className="slide">
      <div className="d-flex">
        <div>
          <button className="back" onClick={() => back()}>
            <i className="las la-chevron-left"></i> Volver
          </button>
        </div>
      </div>
      <div
        style={{ backgroundColor: getColor(pokemonType.type.name) }}
        className="pokemon-info"
      >
        <h2>{infoPokemon.name}</h2>
        <div className="pokemon-avatar">
          <img
            src={infoPokemon.sprites.other['official-artwork'].front_default}
          />
        </div>
      </div>

      <div className="p-4">
        <h2>Attacks</h2>
        <div className="pokemon-attacks">
          {infoPokemon.moves.map((e, i) => (
            <div className="pokemon-attack" key={i}>
              {e.move.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
