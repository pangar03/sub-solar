import './ResultsPage.css';

export default function ResultsPage() {
  return (
    <main id="resultsPage" className="results hidden">
      <div className="result-action-hub" id="resultActionHub">
        <button className="result-contact-btn" type="button">
          Contáctanos
        </button>

        <button className="result-simulator-btn simulatorBtn" type="button">
          Ir al simulador
        </button>
      </div>
    </main>
  );
}