import { gql } from '@apollo/client';

//QUERY TO GET ALL THE POKEMONS
//ACCEPTS $FIRST FOR THE FIRST ENTERED POKEMONS
export const getAllPokemons = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          damage
          type
        }
        special {
          name
          damage
          type
        }
      }
    }
  }
`;

//QUERY TO GET THE EVOLUTIONS OF A POKEMON
//ACCEPTS ID OF THE POKEMON
export const getPokemonEvolutions = gql`
  query pokemon($id: String) {
    pokemon(id: $id) {
      evolutions {
        types
        name
        image
        id
        number
      }
    }
  }
`;

//QUERY TO GET POKEMON BY ID
//ACCEPTS ID OF THE POKEMON
export const getSinglePokemon = gql`
  query pokemon($id: String) {
    pokemon(id: $id) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          damage
          type
        }
        special {
          name
          damage
          type
        }
      }
    }
  }
`;
