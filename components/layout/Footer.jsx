// components/layout/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-gray-400 py-6 text-center rounded-lg shadow-xl">
      <div className="container mx-auto px-4">
        <p>&copy; {year} Himovies. All rights reserved.</p>
        <p className="mt-2 text-sm">Powered by TMDB API & Next.js</p>
      </div>
    </footer>
  );
}
