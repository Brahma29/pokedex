import Image from 'next/image';
import React from 'react';
import pokeLoading from '../../assets/Images/pokeloading.gif';

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-24 h-24 loading-image">
        <Image src={pokeLoading} alt="loading" fill />
      </div>
    </div>
  );
};

export default Loader;
