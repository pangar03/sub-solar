import "./ContactSection.css";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contactanos">
      <div className="contact-card">
        <div className="contact-copy">
          <span className="contact-kicker">Contáctanos</span>

          <h2>
            Hablemos sobre la energía
            <br />
            de tu hogar.
          </h2>

          <p>
            ¿Tienes dudas sobre nuestros planes solares, baterías o el proceso
            de instalación? El equipo de GdO está listo para ayudarte a
            encontrar la mejor solución para tu hogar.
          </p>

          <button className="btn contact-btn" data-start-form>
            Quiero asesoría personalizada →
          </button>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <Phone size={22} />
            <div>
              <strong>Llámanos</strong>
              <span>+57 (602) 000 0000</span>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={22} />
            <div>
              <strong>Escríbenos</strong>
              <span>solar@gdo.com.co</span>
            </div>
          </div>

          <div className="contact-item">
            <MapPin size={22} />
            <div>
              <strong>GdO / Promigas</strong>
              <span>Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}