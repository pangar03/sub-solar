import "./InteractiveSimulatorPromo.css";
import { Plug, ArrowRight, BatteryCharging, Wind, WashingMachine, Lightbulb } from "lucide-react";

export default function InteractiveSimulatorPromo() {
  return (
    <section className="simulator-promo-section" id="baterias">
      <div className="simulator-promo-header">
        <h2>
          Enciende tu casa.
          <br />
          <span>Mira cómo reacciona tu batería.</span>
        </h2>

        <p>
          Activa el aire acondicionado, la lavadora o las luces y descubre en
          tiempo real cuánta energía consume tu hogar y cuánto podría durar tu
          batería solar.
        </p>
      </div>

      <button className="simulator-promo-card simulatorBtn" type="button">
        <div className="simulator-house">
          <div className="house-roof"></div>
          <div className="house-body">
            <div className="house-window"></div>
            <div className="house-door"></div>
            <div className="house-window"></div>
          </div>

          <div className="appliance-icon icon-air">
            <Wind size={28} />
          </div>

          <div className="appliance-icon icon-wash">
            <WashingMachine size={28} />
          </div>

          <div className="appliance-icon icon-light">
            <Lightbulb size={28} />
          </div>

          <div className="battery-widget">
            <BatteryCharging size={26} />
            <div>
              <strong>8h 20m</strong>
              <span>respaldo estimado</span>
            </div>
          </div>
        </div>

        <div className="simulator-promo-content">
          <span className="promo-kicker">
            <Plug size={18} />
            Simulador Interactivo GdO
          </span>

          <h3>Juega con tu consumo y descubre tu plan ideal.</h3>

          <p>
            Prueba distintos electrodomésticos, compara escenarios y entiende
            qué batería se adapta mejor a tu casa.
          </p>

          <div className="promo-link">
            Explorar el simulador <ArrowRight size={20} />
          </div>
        </div>
      </button>
    </section>
  );
}