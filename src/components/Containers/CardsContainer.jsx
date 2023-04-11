import { useState } from 'react';
import PokeCard from '../Cards/PokeCard';
import client from '@/utils/apollo-client';
import { getAllPokemons } from '@/utils/queries';
import Loader from '../utils/Loader';

const CardsContainer = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState(pokemons);

  const nextPokemons = async () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage > 2) {
      setLoading(true);
      const { data } = await client.query({
        query: getAllPokemons,
        variables: {
          first: allPokemons.length + 20,
        },
      });
      setAllPokemons(data.pokemons);
      setLoading(false);
    }
  };
  const prevPokemons = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {loading ? (
        <div className="pt-52">
          <Loader />
        </div>
      ) : (
        <div className="container px-4 py-6 mx-auto md:px-0">
          <div className="mb-4">
            <h1 className="text-2xl">Hello! Pokemon Master</h1>
          </div>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 md:justify-start md:grid-cols-3 lg:grid-cols-4">
            {allPokemons
              .slice((currentPage - 1) * 20, currentPage * 20)
              .map((each, index) => (
                <PokeCard key={index} pokemon={each} />
              ))}
          </div>
          <div className="py-6 pagination">
            <div className="buttons">
              <div className="flex gap-3 prev-button">
                <button
                  className={`px-5 py-3 rounded-md bg-slate-600 ${
                    currentPage === 1 && 'opacity-30'
                  }`}
                  disabled={currentPage === 1}
                  onClick={prevPokemons}
                >
                  Prev
                </button>
                {/* 
              AS THERE WAS NO INFORMATION ABOUT PAGINATION IN API RESPONSE
              I HAD TO HARD CODE THE PAGINATION */}

                <button
                  className={`px-5 py-3 text-black bg-yellow-200 rounded-md ${
                    allPokemons.length === 151 &&
                    currentPage === Math.ceil(151 / 20) &&
                    'opacity-30'
                  }`}
                  onClick={nextPokemons}
                  disabled={
                    allPokemons.length === 151 &&
                    currentPage === Math.ceil(151 / 20)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardsContainer;
