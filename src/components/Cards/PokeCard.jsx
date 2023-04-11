import Image from 'next/image';
import TypeLabel from './TypeLabel';
import Link from 'next/link';

const PokeCard = ({ pokemon }) => {
  return (
    <>
      <Link
        href={`pokemon/${pokemon.id}`}
        className="rounded-lg pokecard bg-[#28282B] p-6"
      >
        <div className="relative w-full pokemon-image h-60">
          <Image
            src={pokemon.image}
            alt="poke"
            fill
            className="object-contain p-6 bg-white rounded-md "
          />
        </div>
        <div className="py-2 pokemon-details">
          <h4>#{pokemon.number}</h4>
          <h2 className="text-xl font-medium uppercase">{pokemon.name}</h2>
          <div className="flex flex-wrap gap-2 py-1 pokemon-types">
            {pokemon.types.map((type, index) => (
              <TypeLabel type={type} key={index} />
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PokeCard;
