import "./SolarProfilesSection.css";

export default function SolarProfilesSection() {
    return (
        <section className="solar-profiles" id="planes">
            <div className="profiles-header">
                <h2>
                    ¿Cuál es tu perfil?
                    <br />
                    <span>Descubre tu plan solar GdO ideal.</span>
                </h2>
            </div>

            <div className="profiles-grid">
                <article className="profile-card profile-card-image">
                    <img
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                        alt="Persona revisando factura"
                    />
                    <div className="profile-overlay"></div>

                    <div className="profile-content">
                        <h3>El Ahorrador</h3>

                        <div>
                            <strong>-40%</strong>
                            <p>en tu factura mensual de energía.</p>
                        </div>
                    </div>
                </article>

                <article className="profile-card profile-card-image">
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                        alt="Familia tranquila en casa"
                    />
                    <div className="profile-overlay"></div>

                    <div className="profile-content">
                        <h3>La Resiliente</h3>

                        <div>
                            <strong>+8 horas</strong>
                            <p>de respaldo energético ante apagones.</p>
                        </div>
                    </div>
                </article>

                <article className="profile-card profile-card-cta">
                    <div className="profile-cta-content">
                        <span>No sé cuál soy</span>
                        <h3>Te lo decimos en 14 preguntas.</h3>
                        <p>
                            Responde el quiz y descubre exactamente qué plan se
                            adapta mejor a tu hogar.
                        </p>

                        <button className="btn btn-primary" data-start-form>
                            Hacer el quiz →
                        </button>
                    </div>
                </article>
            </div>

            <div className="industry-support">
                <p>Apoyados por líderes de la industria</p>

                <div className="industry-logo">
                    <img
                        src="https://www.promigas.com/Internas/logo-promigas-heade.svg"
                        alt="Promigas"
                    />
                </div>
            </div>
        </section>
    );
}
