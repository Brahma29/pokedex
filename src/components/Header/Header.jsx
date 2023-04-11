import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className="container flex px-4 py-6 mx-auto border-b-2 border-yellow-100 border-opacity-30 md:px-0">
        <Link href="/" className="flex logo">
          <h1 className="text-2xl text-yellow-200">Pokedex ;)</h1>
        </Link>
      </div>
    </>
  );
};

export default Header;
