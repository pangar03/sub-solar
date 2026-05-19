import "./PricingSection.css";
import { BatteryCharging, Sun, Leaf, Check } from "lucide-react";

const plans = [
  {
    icon: <BatteryCharging size={30} />,
    name: "Plan Resiliente",
    price: "Desde $189.900/mes",
    description:
      "Para hogares que necesitan independencia energética y respaldo ante apagones.",
    features: [
      "Paneles solares instalados",
      "Batería de respaldo incluida",
      "Hasta 8 horas de autonomía",
      "Mantenimiento incluido",
      "Soporte prioritario 24/7",
    ],
  },
  {
    icon: <Sun size={30} />,
    name: "Plan Ahorrador",
    badge: "Más popular",
    price: "Desde $129.900/mes",
    description:
      "Para hogares que quieren reducir su factura de energía desde el primer mes.",
    features: [
      "Paneles solares instalados",
      "Ahorro estimado del 30–40% en factura",
      "Cuota fija mensual garantizada",
      "Mantenimiento incluido",
      "Soporte en horario hábil",
    ],
  },
  {
    icon: <Leaf size={30} />,
    name: "Plan Verde",
    price: "Desde $89.900/mes",
    description:
      "Para hogares que quieren dar el primer paso hacia la energía limpia con una inversión mínima.",
    features: [
      "Paneles solares instalados",
      "Contribución medible a tu huella de carbono",
      "Ahorro moderado en factura",
      "Mantenimiento incluido",
      "Ideal para apartamentos o consumo bajo",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="pricing-section" id="planes">
      <div className="pricing-header">
        <h2>
          Planes y Precios
          <br />
          <span>El plan que se adapta a tu hogar, no al revés.</span>
        </h2>

        <p>
          Sin costos de instalación. Sin sorpresas en la factura. Solo elige el
          que más se ajusta a tu vida.
        </p>
      </div>

      <div className="pricing-stack">
        {plans.map((plan, index) => (
          <article
            className={`pricing-card ${plan.badge ? "featured" : ""}`}
            key={plan.name}
            style={{ "--card-index": index }}
          >
            <div className="pricing-card-image">
              <div className="pricing-icon">{plan.icon}</div>
            </div>

            <div className="pricing-card-content">
              {plan.badge && <span className="pricing-badge">{plan.badge}</span>}

              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>

              <p>{plan.description}</p>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn pricing-btn" data-start-form>
                Quiero este plan →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="pricing-quiz-box">
        <p>
          ¿No sabes cuál elegir? Haz el quiz de perfil y te recomendamos el plan
          ideal para tu hogar.
        </p>

        <button className="btn pricing-quiz-btn" data-start-form>
          Hacer el quiz →
        </button>
      </div>
    </section>
  );
}