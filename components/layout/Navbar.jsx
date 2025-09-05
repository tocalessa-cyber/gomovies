import Link from 'next/link';
import { FaVideo } from 'react-icons/fa';
import SearchBar from '../SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors">
          <FaVideo className="text-2xl" />
          <span className="text-xl font-bold">Himovies</span>
        </Link>
        <div className="flex-grow flex justify-end">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
