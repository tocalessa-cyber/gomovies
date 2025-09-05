"use client";

import { useEffect } from 'react';
import { handleAdsterraClick } from '../utils/adsterra';

// Komponen khusus untuk menangani klik secara global.
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Fungsi untuk memanggil logika adsterra saat ada klik di mana saja.
    const handleClick = (e) => {
      // Dummy targetUrl dibuat karena logika handleAdsterraClick memerlukannya.
      // Kita menggunakan URL halaman saat ini.
      const targetUrl = window.location.href;
      handleAdsterraClick(e, targetUrl);
    };

    window.addEventListener('click', handleClick);

    // Cleanup function untuk menghapus event listener saat komponen di-unmount.
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []); // Dependensi kosong memastikan efek hanya berjalan sekali saat mount.

  return (
    <>
      {children}
    </>
  );
}