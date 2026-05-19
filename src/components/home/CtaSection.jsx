import './CtaSection.css';
export default function CtaSection() {
  return (
    <section id="contacto" className="cta-band reveal dark-glass-cta">
      <h2>Menos de 3 minutos para saber cuánto puedes ahorrar con energía solar.</h2>
      <p>
        Responde el quiz, descubre tu plan personalizado y recibe una propuesta con
        números reales. Sin inversión inicial, sin compromiso.
      </p>
      <button className="btn btn-primary" data-start-form>
        Quiero descubrir mi plan solar →
      </button>
    </section>
  );
}
