import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-logo">
        <img
          src="https://mzfiuuohoeoqpsrqmcju.supabase.co/storage/v1/object/sign/imagenes%20timeline%20assesment/logo%20gdo%20positivo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZjJmNzAwMC04YTA2LTQ5NzYtYjJmNS05ZDljNWZhNDdmYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcyB0aW1lbGluZSBhc3Nlc21lbnQvbG9nbyBnZG8gcG9zaXRpdm8ucG5nIiwiaWF0IjoxNzc5MTUyMzg1LCJleHAiOjE4MTA2ODgzODV9.F_S64OV5Z_TLF4r6cdGCeA7Nu0HfrFPE8fHxjzupXiQ"
          alt="GDO Solar"
        />
      </div>

      <div className="navbar-links">
        <a href="#sobre-nosotros">Sobre nosotros</a>
        <a href="#baterias">Baterías</a>
        <a href="#contactanos">Contáctanos</a>
        <a href="#planes">Planes & Precio</a>
      </div>

      <button className="navbar-cta">
        Quiero energía solar
      </button>
    </nav>
  );
}