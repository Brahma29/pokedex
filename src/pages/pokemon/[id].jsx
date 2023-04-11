import TypeLabel from '@/components/Cards/TypeLabel';
import ProgressBarContainer from '@/components/Containers/ProgressBarContainer';
import EvolutionModal from '@/components/modals/EvolutionModal';
import Loader from '@/components/utils/Loader';
import client from '@/utils/apollo-client';
import {
  getAllPokemons,
  getPokemonEvolutions,
  getSinglePokemon,
} from '@/utils/queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SinglePokemon = ({ pokemons }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [evolutionsLoading, setEvolutionsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [evolutionData, setEvolutionData] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(
    pokemons.findIndex((each) => each.id === id) !== -1
      ? pokemons.filter((each) => each.id === id)[0]
      : null
  );

  const getPokemonById = async () => {
    setLoading(true);
    const { data } = await client.query({
      query: getSinglePokemon,
      variables: {
        id: id,
      },
    });
    console.log({ data });
    setCurrentPokemon(data.pokemon);
    setLoading(false);
  };

  useEffect(() => {
    if (!currentPokemon) {
      getPokemonById(id);
    } else {
      setLoading(false);
    }
  }, []);

  const getEvolutionData = async () => {
    const { data } = await client.query({
      query: getPokemonEvolutions,
      variables: {
        'id': id,
      },
    });
    console.log({ data });
    if (data.pokemon.evolutions !== null)
      setEvolutionData([...data.pokemon.evolutions, currentPokemon]);
    setEvolutionsLoading(false);
  };

  const handleClickEvolutions = () => {
    getEvolutionData();
    console.log({ evolutionData });
    setIsOpen(!isOpen);
  };

  return (
    <>
      <EvolutionModal
        isOpen={isOpen}
        toggleHandler={() => setIsOpen(!isOpen)}
        loading={evolutionsLoading}
        evolutions={evolutionData}
      />
      {loading ? (
        <div className="pt-52">
          <Loader />
        </div>
      ) : (
        <div className="container py-8 mx-auto">
          <div className="flex flex-col gap-8 px-4 py-6 pokemon-container md:flex-row md:px-0">
            <div className="relative w-full img md:w-96 md:h-96 h-96">
              <Image
                src={currentPokemon.image}
                alt={currentPokemon.name}
                fill
                className="object-contain p-6 bg-white rounded-lg"
              />
              <button
                onClick={handleClickEvolutions}
                className="absolute px-4 py-2 text-xl font-medium text-black bg-yellow-200 rounded-md w-[90%] left-[5%] -bottom-4"
              >
                View Evolutions
              </button>
            </div>
            <div className="flex flex-col items-start flex-1 gap-8 md:gap-4 pokemon-details-container">
              <div className="flex flex-col justify-between w-full md:items-center md:flex-row ">
                <h1 className="text-4xl font-bold uppercase">
                  {currentPokemon.name}
                </h1>
                <span className="text-2xl">
                  <span className="text-sm"> Max CP</span>{' '}
                  {currentPokemon.maxCP}
                  🛡️
                  <span className="text-sm"> Max HP</span>{' '}
                  {currentPokemon.maxHP}
                  💪🏻
                </span>
              </div>
              <div className="bg-[#28282B] p-4 w-full rounded-md border border-opacity-10 gap-y-4 border-white grid md:grid-cols-3">
                <span>
                  Weight : {currentPokemon.weight.minimum} -{' '}
                  {currentPokemon.weight.maximum}
                </span>
                <span>
                  Height : {currentPokemon.height.minimum} -{' '}
                  {currentPokemon.height.maximum}
                </span>
                <span>Category : {currentPokemon.classification}</span>
                <span className="flex gap-2 whitespace-nowrap">
                  Types :
                  <span className="flex flex-wrap items-start gap-1">
                    {currentPokemon.types.map((type, index) => (
                      <TypeLabel type={type} key={index} />
                    ))}
                  </span>
                </span>
                <span className="flex gap-2 whitespace-nowrap">
                  Weakness :
                  <span className="flex flex-wrap items-start gap-1">
                    {currentPokemon.weaknesses.map((type, index) => (
                      <TypeLabel type={type} key={index} />
                    ))}
                  </span>
                </span>
                <span className="flex gap-2 whitespace-nowrap">
                  Resistant :
                  <span className="flex flex-wrap gap-1">
                    {currentPokemon.resistant.map((type, index) => (
                      <TypeLabel type={type} key={index} />
                    ))}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 stats">
                <span
                  className="text-3xl tracking-[14px] font-black text-center transform rotate-180"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  ATTACKS
                </span>
                <div className="flex flex-col gap-4 ">
                  <div className=" fast-attacks-stats">
                    <ProgressBarContainer
                      attackType={currentPokemon.attacks.fast}
                    />
                  </div>
                  <div className="special-attacks-stats">
                    <ProgressBarContainer
                      attackType={currentPokemon.attacks.special}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePokemon;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getAllPokemons,
    variables: {
      first: 20,
    },
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
