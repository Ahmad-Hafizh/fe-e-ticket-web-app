import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col px-10 md:px-32 lg:px-48 lg:py-12 py-5 bg-blue-900 text-white">
        <div className="footer top flex justify-center gap-16 lg:gap-32 py-10 ">
          <div className="Menu 1 flex flex-col items-center  gap-2 md:gap-3 lg:gap-4">
            <div>
              <h1 className="font-bold text-lg lg:text-xl">Navigasi</h1>
            </div>
            <div className="flex flex-col items-center text-base lg:text-lg text-gray-50 md:gap-1 lg:gap-2">
              <Link href={`/creator/dashboard`}>
                <h1>Buat Event</h1>
              </Link>
              <Link href={'/search'}>
                <h1>Event Terbaru</h1>
              </Link>
              <Link href={'/search'}>
                <h1>Tentang Kami</h1>
              </Link>
              <Link href={'/search'}>
                <h1>FAQ</h1>
              </Link>
            </div>
          </div>
          <div className="Menu 2 flex flex-col items-center gap-2 md:gap-3 lg:gap-4">
            <div>
              <h1 className="font-bold text-lg lg:text-xl">Inspirasi Event</h1>
            </div>
            <div className="flex flex-col items-center text-base lg:text-lg text-gray-50 md:gap-1 lg:gap-2">
              <Link href={'/search?cat=Music'}>
                <h1>Event Musik</h1>
              </Link>
              <Link href={'search?cat=Drama'}>
                <h1>Event Drama</h1>
              </Link>
              <Link href={'search?cat=Community'}>
                <h1>Event Komunitas</h1>
              </Link>
              <Link href={'search?cat=Cultural'}>
                <h1>Event Budaya</h1>
              </Link>
            </div>
          </div>
          <div className="Menu 3 flex-col hidden md:flex  gap-2 md:gap-3 lg:gap-4">
            <div>
              <h1 className="font-bold text-lg lg:text-xl">Lokasi Event</h1>
            </div>
            <div className="flex flex-col items-center text-base lg:text-lg text-gray-50 md:gap-1 lg:gap-2">
              <Link href={`search?city=Jakarta`}>
                <h1>Jakarta</h1>
              </Link>
              <Link href={`search?city=Surabaya`}>
                <h1>Surabaya</h1>
              </Link>
              <Link href={`search?city=Malang`}>
                <h1>Malang</h1>
              </Link>
              <Link href={`search?city=Bandung`}>
                <h1>Bandung</h1>
              </Link>
            </div>
          </div>
          <div className="Menu 4 flex-col hidden lg:flex  gap-2 md:gap-3 lg:gap-4">
            <div>
              <h1 className="font-bold text-lg lg:text-xl">Lokasi Event</h1>
            </div>
            <div className="flex flex-col items-center text-base lg:text-lg text-gray-50 md:gap-1 lg:gap-2">
              <Link href={`search?city=Jakarta`}>
                <h1>Jakarta</h1>
              </Link>
              <Link href={`search?city=Surabaya`}>
                <h1>Surabaya</h1>
              </Link>
              <Link href={`search?city=Malang`}>
                <h1>Malang</h1>
              </Link>
              <Link href={`search?city=Bandung`}>
                <h1>Bandung</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer down w-full bg-blue-950 px-10 pt-5 pb-3 gap-6 flex flex-col text-white">
        <div className="footer down menu 1">
          <ul className="flex gap-2 list-none text-white text-xs justify-around lg:justify-center lg:gap-10 items-center lg:text-md">
            <li>Kebijakan Privasi</li>
            <li>Petunjuk Penggunaan</li>
            <li>Legalitas</li>
          </ul>
        </div>
        <div className="footer down copyright py-4">
          <h1 className="text-white text-center text-sm">Copyright of Event dot com. 2024</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
