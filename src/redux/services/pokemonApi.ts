// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from '../../utils/types'
import getPokemonName from '../../utils/getPokemonName'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonById: builder.query<Pokemon, string>({
      query: (id) => ({ url: `pokemon/${id}` }), // Use an object with `url` property to include the `id` in the request
      transformResponse: (res: any): Pokemon => {
        return {
          id: res.id,
          names: getPokemonName(res.id),
          image:
            res.id >= 906
              ? res.sprites.other['official-artwork'].front_default
              : res.sprites.other.home.front_default,
          //@ts-ignore
          types: res.types.map((type) => type.type.name),
        }
      },
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByIdQuery } = pokemonApi
