import './SimulatorSection.css';
const simulatorCards = [
  {
    icon: '💸',
    title: '¿Cuánto ahorrarías?',
    text: 'Te mostramos el estimado mensual basado en tu consumo real.',
  },
  {
    icon: '🔋',
    title: '¿Qué batería te toca?',
    text: 'Según tus necesidades de respaldo ante apagones.',
  },
  {
    icon: '🏠',
    title: '¿Es para tu hogar?',
    text: 'Te decimos si tu perfil encaja con el servicio GdO Solar.',
  },
  {
    icon: '🧭',
    title: '¿Qué plan es el tuyo?',
    text: 'Ahorrador o Resiliente: descúbrelo al final del quiz.',
  },
];

export default function SimulatorSection() {
  return (
    <section id="simulador" className="section process reveal simulator-section">
      <div className="section-header">
        <h2>Descubre tu plan solar en 3 minutos</h2>
        <p>
          Responde unas preguntas sobre tu hogar y te mostramos cuánto puedes ahorrar,
          qué batería te corresponde y qué plan se adapta mejor a ti.
        </p>
      </div>

      <div className="simulator-experience">
        <div className="simulator-banner">
          <img src="./resources/solar-roof.jpg" alt="Quiz solar" />
          <div className="simulator-overlay">
            <div className="simulator-text">
              <h3>Tu plan solar personalizado te espera</h3>
              <p>3 minutos. Sin tecnicismos. Con propuesta real al final.</p>
            </div>
          </div>
        </div>

        <div className="simulator-glass-cards">
          {simulatorCards.map((card) => (
            <article className="simulator-glass-card" key={card.title}>
              <div className="icon-bubble">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-actions">
        <button className="btn btn-primary" data-start-form>
          Quiero descubrir mi plan →
        </button>
        <button className="btn btn-secondary simulatorBtn">
          Explorar simulador primero
        </button>
      </div>
    </section>
  );
}
