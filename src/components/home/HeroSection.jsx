import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero hero-left-banner">
      <div className="hero-content-left">
        <span className="eyebrow">
          ☀️ Energía solar por suscripción para hogares
        </span>

        <h1>
          Energía solar
          <br />
          inteligente
          <br />
          para tu hogar
        </h1>

        <p className="lead">
          Reduce tu factura de energía, protégete de apagones y disfruta energía
          limpia con instalación, monitoreo y mantenimiento incluidos.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" data-start-form>
            Descubre tu plan solar →
          </button>

          <button className="btn btn-secondary simulatorBtn">
            Ver simulador
          </button>
        </div>

        <div className="trust-line">
          Sin inversión inicial · Planes flexibles · Respaldo energético
        </div>
      </div>
    </section>
  );
}