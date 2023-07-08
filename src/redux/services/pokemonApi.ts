// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from '../types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonById: builder.query<Pokemon, string>({
      query: (id) => ({ url: `pokemon/${id}` }), // Use an object with `url` property to include the `id` in the request
      transformResponse: (res: any): Pokemon => {
        return {
          name: res.name,
          image:
            res.id >= 906
              ? res.sprites.other['official-artwork'].front_default
              : res.sprites.other.home.front_default,
        }
      },
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByIdQuery } = pokemonApi
