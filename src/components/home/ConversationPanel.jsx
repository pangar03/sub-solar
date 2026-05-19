import './ConversationPanel.css';
export default function ConversationPanel() {
  return (
    <>
      <section className="conversation-panel reveal">
        <div className="chat-menu">
          <h3>¿Cuánto pagas de luz hoy? 💡</h3>
          <p className="hint">
            Millones de hogares en Colombia pagan tarifas que suben cada mes. Con
            GdO Solar, eso cambia: tarifa fija, paneles nuestros, energía tuya.
          </p>
          <div className="chat-row" data-start-form>
            ⚡ Descubrir qué plan me corresponde
          </div>
          <div className="chat-row" data-scroll="beneficios">
            🔍 ¿Cómo funciona la energía solar como servicio?
          </div>
          <div className="chat-row" id="randomTip">
            💬 Dame un dato rápido
          </div>
        </div>

        <div className="energy-preview">
          <h3>¿Qué es lo que más te preocupa?</h3>
          <p className="hint">Elige y te explicamos cómo nuestro servicio lo resuelve.</p>

          <div className="preview-options">
            <button type="button" data-preview="ahorro">
              💸 Mi factura alta
            </button>
            <button type="button" data-preview="respaldo">
              🔋 Los apagones
            </button>
            <button type="button" data-preview="green">
              🌿 Energía limpia
            </button>
          </div>

          <div className="preview-card" id="previewCard">
            <div className="preview-emoji">☀️</div>
            <p>Elige una preocupación para ver cómo GdO Solar la soluciona.</p>
          </div>
        </div>
      </section>

      <div className="sun-tip" id="sunTip">
        Tip: responde pensando en tu casa real, no en términos técnicos ✨
      </div>
      <button className="sun-orb" id="sunOrb" aria-label="Tip solar">
        ☀️
      </button>
    </>
  );
}
