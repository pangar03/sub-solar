import "./Footer.css";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="https://mzfiuuohoeoqpsrqmcju.supabase.co/storage/v1/object/sign/imagenes%20timeline%20assesment/logo%20gdo%20positivo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZjJmNzAwMC04YTA2LTQ5NzYtYjJmNS05ZDljNWZhNDdmYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcyB0aW1lbGluZSBhc3Nlc21lbnQvbG9nbyBnZG8gcG9zaXRpdm8ucG5nIiwiaWF0IjoxNzc5MTUyMzg1LCJleHAiOjE4MTA2ODgzODV9.F_S64OV5Z_TLF4r6cdGCeA7Nu0HfrFPE8fHxjzupXiQ"
            alt="GdO"
          />

          <p>
            Transformamos hogares con energía solar inteligente, accesible y sin
            complicaciones.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Explora</h4>

            <button data-start-form>Haz el quiz</button>
            <button className="simulatorBtn">Simulador</button>
            <button>Planes</button>
            <button>Contáctanos</button>
          </div>

          <div className="footer-column">
            <h4>Contacto</h4>

            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+57 (602) 000 0000</span>
            </div>

            <div className="footer-contact-item">
              <Mail size={16} />
              <span>solar@gdo.com.co</span>
            </div>

            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Colombia</span>
            </div>
          </div>

          <div className="footer-column">
            <h4>Promigas</h4>

            <a
              href="https://www.promigas.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sitio corporativo
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 GdO Solar. Todos los derechos reservados.</span>
        <span>Powered by Promigas</span>
      </div>
    </footer>
  );
}