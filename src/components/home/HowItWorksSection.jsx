import "./HowItWorksSection.css";
import { Search, Wrench, TrendingDown } from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section className="how-section" id="como-funciona">
            <div className="how-header">
                <h2>
                    Tres pasos.
                    <br />
                    Sin letra pequeña.
                    <br />
                    Sin sorpresas.
                </h2>

                <p>
                    Sabemos que los procesos de energía solar suelen parecer
                    complejos y llenos de tecnicismos. Por eso diseñamos una
                    experiencia simple, transparente y sin dolores de cabeza.
                </p>
            </div>

            <div className="how-video-card">
                <video
                    className="how-video"
                    src="https://mzfiuuohoeoqpsrqmcju.supabase.co/storage/v1/object/sign/imagenes%20timeline%20assesment/modelonegocio.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZjJmNzAwMC04YTA2LTQ5NzYtYjJmNS05ZDljNWZhNDdmYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZW5lcyB0aW1lbGluZSBhc3Nlc21lbnQvbW9kZWxvbmVnb2Npby5tcDQiLCJpYXQiOjE3NzkxNTU5ODIsImV4cCI6MTgxMDY5MTk4Mn0.7_SSeVte1_6OHhKtfWF5HvQxorghAwtucPdcTbkLDBY"
                    controls
                    preload="metadata"
                />
            </div>

            <div className="how-steps">
                <article className="how-step">
                    <Search size={30} />
                    <span>01</span>
                    <h3>Descubre tu perfil</h3>
                    <p>
                        Responde 14 preguntas en menos de 2 minutos y descubre
                        qué solución solar encaja contigo y cuánto podrías
                        ahorrar.
                    </p>
                </article>

                <article className="how-step">
                    <Wrench size={30} />
                    <span>02</span>
                    <h3>Instalamos nosotros</h3>
                    <p>
                        Paneles, batería, configuración y puesta en marcha. Tú
                        no te preocupas por nada. Instalación inicial: $0.
                    </p>
                </article>

                <article className="how-step">
                    <TrendingDown size={30} />
                    <span>03</span>
                    <h3>Ahorra y descansa</h3>
                    <p>
                        Pagas una cuota mensual fija, con mantenimiento incluido
                        y respaldo energético para esos apagones inesperados.
                    </p>
                </article>
            </div>

            <div className="how-cta">
                <h3>¿Listo para empezar?</h3>

                <div className="how-cta-actions">
                    <button className="btn btn-primary" data-start-form>
                        Haz el quiz de perfil →
                    </button>

                    <button className="btn btn-secondary simulatorBtn">
                        Usa el simulador →
                    </button>
                </div>
            </div>
        </section>
    );
}
