import { useEffect } from "react";

/**
 * Google Analytics loader.
 *
 * Loads gtag only when VITE_GA_ID is configured AND the visitor has accepted
 * cookies. Configure in .env:  VITE_GA_ID=G-XXXXXXXXXX
 */
export default function Analytics() {
  const gaId = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (!gaId) return;

    const enable = () => {
      if (window.__cachiGaLoaded) return;
      window.__cachiGaLoaded = true;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    };

    const consent = localStorage.getItem("cachi-cookie-consent");
    if (consent === "accepted") enable();
    window.addEventListener("cachi-consent", enable);
    return () => window.removeEventListener("cachi-consent", enable);
  }, [gaId]);

  return null;
}
