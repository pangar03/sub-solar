import './PrioritySection.css';
const priorities = [
  { id: 'ahorro', label: '💸 Pagar menos cada mes' },
  { id: 'respaldo', label: '🔋 No quedarme sin luz' },
  { id: 'verde', label: '🌿 Consumir energía limpia' },
];

export default function PrioritySection() {
  return (
    <section className="section reveal priority-dark-section">
      <div className="section-header">
        <h2>¿Cuál es tu prioridad principal?</h2>
        <p>
          Arrastra tu prioridad al recuadro y verás qué plan de GdO Solar podría
          encajarte mejor. El quiz completo te dará una propuesta con números reales.
        </p>
      </div>

      <div className="drag-zone">
        <p className="drag-title">Arrastra lo que más te importa:</p>
        <div className="drag-options">
          {priorities.map((priority) => (
            <div
              className="drag-chip"
              draggable="true"
              data-priority={priority.id}
              key={priority.id}
            >
              {priority.label}
            </div>
          ))}
        </div>
        <div className="drop-target" id="dropTarget">
          Suelta aquí lo que más te importa
        </div>
      </div>
    </section>
  );
}
