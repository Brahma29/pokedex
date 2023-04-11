import Image from 'next/image';
import React, { useState } from 'react';
import Loader from '../utils/Loader';

const EvolutionModal = ({ isOpen, toggleHandler, evolutions, loading }) => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-50 bg-opacity-10 ${
        !isOpen && 'hidden'
      }`}
    >
      <div
        className={` z-50 rounded-lg p-8 evolution-modal w-[90%] md:w-[80%] h-auto min-h-[90vh] md:h-[90vh]`}
      >
        <div className="flex justify-between modal-header">
          <h1 className="text-xl font-medium uppercase md:text-3xl">
            Evolutions
          </h1>
          <button className="text-xl font-bold" onClick={toggleHandler}>
            X
          </button>
        </div>
        <div className="h-full mt-4 modal-body md:mt-0">
          <div className="flex flex-col items-center justify-around h-full gap-2 md:gap-0 evolutions-container md:flex-row">
            {loading ? (
              <Loader />
            ) : evolutions.length === 0 ? (
              <span className="text-xl">No Further Evolutions</span>
            ) : (
              evolutions
                .sort((a, b) => a.number - b.number)
                .map((pokemon, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-2 rounded-full w-28 h-28 image md:w-52 md:h-52">
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        fill
                        className="object-contain p-6 bg-white rounded-full"
                      />
                    </div>
                    <h1 className="text-xl">{pokemon.name}</h1>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionModal;
