import CardsContainer from '@/components/Containers/CardsContainer';
import Header from '@/components/Header/Header';
import client from '@/utils/apollo-client';
import { getAllPokemons } from '@/utils/queries';

export default function Home({ pokemons }) {
  return (
    <>
      <CardsContainer pokemons={pokemons} />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAllPokemons,
    variables: {
      first: 60,
    },
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
