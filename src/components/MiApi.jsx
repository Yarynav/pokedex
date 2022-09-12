import { useEffect, useState } from 'react';
import { InfoPokemon } from './InfoPokemon';
import { Pokemon } from './Pokemon';

export const MiApi = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [infoPokemon, setInfoPokemon] = useState(null);
  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');

  /** @description Obtiene el listado inical de Pokemones desde el api */
  const getPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251');
    const json = await res.json();
    const orderedPokemons = sortPokemons(json.results);
    setPokemons(orderedPokemons);
    setFilteredPokemons(orderedPokemons);
  };
  /** @description me ordena las card de pokemon por nombre si el orden es igual asc(ascedente) ordenara de la "a" la "z" en caso de que des(desendete) ordenara de la "z"a la "a"*/
  const sortPokemons = (pokemonList) => {
    if (order === 'asc') {
      return pokemonList.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    } else if (order === 'desc') {
      return pokemonList.sort(function (a, b) {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    } else {
      setSearch('');
      return pokemons.length > 0 ? pokemons : pokemonList;
    }
  };
  /** @descripcion va a buscar la informacion de un pokémon en especifico atravez de la api */
  const showInfo = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    setInfoPokemon(json);
  };
  /**@description filtra pokémon deacuerdo de lo que esta escrito en input si el input esta vacio te muestra el listado completo */
  const searchPokemons = (search) => {
    if (search.length > 0) {
      const filter = pokemons.filter((e) => e.name.indexOf(search) >= 0);
      setFilteredPokemons(filter);
    } else {
      setFilteredPokemons(pokemons);
    }
  };
  /**@description ejecuta los cambio necesario al momento de ingresar informacion en el input de busqueda  */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchPokemons(e.target.value);
  };
  /**@description cuando se carga el componente llamamos al api de pokemon para mostrar el listado */
  useEffect(() => {
    getPokemons();
  }, []);
  /**@description Este useEffect se ejecutara cada vez que cambie el orden y actuliza el listado con el orden esperado,(ascendente,descendente o el estado incial)*/
  useEffect(() => {
    let orderedPokemons = [...filteredPokemons];
    orderedPokemons = sortPokemons(orderedPokemons);
    setFilteredPokemons(orderedPokemons);
  }, [order]);

  return (
    <div>
      {/* si tenemos la info de un pokemon especifico mostraremos el componente info pokémon donde podemos ver tipo y los ataques. En caso contrario mostramos el listado de pokemon */}
      {infoPokemon !== null ? (
        <InfoPokemon
          infoPokemon={infoPokemon}
          back={() => setInfoPokemon(null)}
        />
      ) : (
        <div className="slide">
          <div className="header">
            <h1>Pokemons</h1>
            <div>
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Escribe para buscar un pokemon"
              />
              <label className="ml-2">Ordernar por nombre</label>
              <button className="ml-2" onClick={() => setOrder('asc')}>
                <i className="las la-angle-up"></i>
              </button>
              <button className="ml-2" onClick={() => setOrder('desc')}>
                <i className="las la-angle-down"></i>
              </button>
              <button className="ml-2" onClick={() => setOrder('')}>
                Reset
              </button>
            </div>
          </div>
          {/* solomanete muestra el listado de pokemons una vez responda la api */}
          {filteredPokemons.length > 0 && (
            <div className="pokemon-container">
              {/* en esta funcion recorremos los datos de la api para mostrar un componente de pokemon por cada iteracion */}
              {filteredPokemons.map((e, i) => (
                <Pokemon
                  key={i}
                  name={e.name}
                  url={e.url}
                  showInfo={showInfo}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
