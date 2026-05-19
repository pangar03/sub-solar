import "./ReturningMiniCard.css";
import { X, RotateCcw, Phone } from "lucide-react";

export default function ReturningMiniCard() {
  return (
    <aside
      id="returningMiniCard"
      className="returning-mini-card hidden"
      aria-label="Buscar resultado anterior"
    >
      <div className="returning-mini-top">
        <div className="returning-mini-heading">
          <div className="returning-mini-icon">
            <RotateCcw size={18} strokeWidth={2.4} />
          </div>

          <div>
            <h4>¿Ya hiciste este formulario?</h4>
            <p>Ingresa tu celular y te llevamos directo a tu resultado anterior.</p>
          </div>
        </div>

        <button
          className="mini-close"
          id="returningMiniClose"
          aria-label="Cerrar"
        >
          <X size={16} strokeWidth={2.6} />
        </button>
      </div>

      <div className="mini-phone-row">
        <div className="mini-input-wrap">
          <Phone size={16} strokeWidth={2.4} />
          <input
            id="returningPhoneInput"
            type="tel"
            placeholder="Tu WhatsApp"
          />
        </div>

        <button className="btn btn-primary" id="returningLookupBtn">
          Ver
        </button>
      </div>

      <p className="mini-error" id="returningMiniError"></p>
    </aside>
  );
}