import "./FeatureIntroSection.css";
import { Sun, Wrench, BadgeDollarSign, BatteryCharging } from "lucide-react";

export default function FeatureIntroSection() {
  return (
    <section className="feature-intro">
      <div className="feature-top">
        <div className="feature-copy">
          <h2>
            Energía solar para tu hogar,
            <span> sin complicaciones.</span>
          </h2>

          <p>
            Paga una cuota mensual fija y deja el resto en nuestras manos.
            Instalamos, monitoreamos y mantenemos tu sistema para que empieces
            a ahorrar desde el primer mes.
          </p>

          <button className="btn btn-primary" data-start-form>
  Descubre tu plan ideal →
</button>
        </div>

        <div className="feature-image">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276"
            alt="Sistema solar residencial"
          />
        </div>
      </div>

      <div className="feature-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Sun size={28} strokeWidth={2.2} />
          </div>
          <h4>Sin inversión inicial</h4>
          <p>Instalamos tu sistema sin pagos gigantes por adelantado.</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Wrench size={28} strokeWidth={2.2} />
          </div>
          <h4>Mantenimiento incluido</h4>
          <p>Nos encargamos del soporte técnico durante toda la suscripción.</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BadgeDollarSign size={28} strokeWidth={2.2} />
          </div>
          <h4>Ahorro inmediato</h4>
          <p>Empieza a reducir tu factura desde el primer mes.</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BatteryCharging size={28} strokeWidth={2.2} />
          </div>
          <h4>Respaldo energético</h4>
          <p>Opciones con baterías para mayor tranquilidad en casa.</p>
        </div>
      </div>
    </section>
  );
}