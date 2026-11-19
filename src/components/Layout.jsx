import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Cursor from "./Cursor.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <ScrollProgress />
      {children}
      <Footer />
    </>
  );
}
