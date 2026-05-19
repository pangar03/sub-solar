import './BenefitsSection.css';
const benefits = [
  {
    icon: '💸',
    title: 'Tarifa fija, sin sorpresas',
    text: 'A diferencia del servicio eléctrico convencional, cuyas tarifas de kWh varían cada mes, con GdO Solar pagas lo mismo todos los meses. Sabes exactamente cuánto sale tu energía, sin importar cómo cambien los precios del mercado.',
  },
  {
    icon: '🔋',
    title: 'Batería de respaldo incluida',
    text: 'Tu plan incluye una batería que se carga con energía solar durante el día. Cuando los paneles no están en pleno funcionamiento — o hay un apagón — la batería entra en acción y mantiene tu casa encendida.',
  },
  {
    icon: '🏠',
    title: 'Sin inversión inicial',
    text: 'Los paneles solares se instalan en tu hogar bajo un modelo de comodato: tú los usas y te beneficias de la energía que generan, mientras nosotros nos encargamos del mantenimiento y el rendimiento del sistema. Tú solo pagas la suscripción mensual.',
  },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="section reveal">
      <div className="section-header">
        <h2>Energía solar como nunca te la habían explicado</h2>
        <p>
          No necesitas saber de paneles ni de instalaciones. Aquí te contamos cómo
          funciona el servicio en términos simples.
        </p>
      </div>

      <div className="grid-3">
        {benefits.map((benefit) => (
          <article className="info-card" key={benefit.title}>
            <div className="icon-bubble">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
