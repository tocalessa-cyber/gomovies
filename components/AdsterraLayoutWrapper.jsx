"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scriptsLoaded = false;
      
      const loadAdScripts = () => {
        if (scriptsLoaded) return;
        
        // Memuat skrip iklan Native Banner
        const nativeBannerScript = document.createElement('script');
        nativeBannerScript.src = "//fundingfashioned.com/75a330c0010036df621f28cf1fa626d0/invoke.js";
        nativeBannerScript.async = true;
        nativeBannerScript.setAttribute('data-cfasync', 'false');
        nativeBannerScript.id = 'adsterra-native-banner';
        document.body.appendChild(nativeBannerScript);

        // Memuat skrip iklan Popunder
        const popunderScript = document.createElement('script');
        popunderScript.type = 'text/javascript';
        popunderScript.src = "//fundingfashioned.com/8a/d6/af/8ad6af416314aafc6add60c81ac98829.js";
        popunderScript.async = true;
        popunderScript.id = 'adsterra-popunder';
        document.body.appendChild(popunderScript);

        // Memuat skrip iklan Social Bar
        const socialBarScript = document.createElement('script');
        socialBarScript.type = 'text/javascript';
        socialBarScript.src = "//fundingfashioned.com/af/8a/3e/af8a3e31911498739f710f2973e1c485.js";
        socialBarScript.async = true;
        socialBarScript.id = 'adsterra-social-bar';
        document.body.appendChild(socialBarScript);

        scriptsLoaded = true;
      };

      // Delay loading untuk memastikan DOM siap
      const timer = setTimeout(loadAdScripts, 1000);

      return () => {
        clearTimeout(timer);
        
        // Hapus scripts jika ada
        const scriptsToRemove = [
          'adsterra-native-banner',
          'adsterra-popunder', 
          'adsterra-social-bar'
        ];
        
        scriptsToRemove.forEach(id => {
          const script = document.getElementById(id);
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}