import './FormPage.css';
import FormProgress from './form/FormProgress.jsx';
import FormMascot from './form/FormMascot.jsx';
import ReturningMiniCard from './form/ReturningMiniCard.jsx';

export default function FormPage() {
  return (
    <main id="formPage" className="form-page hidden">
      <div className="form-shell">
        <div className="form-top">
          <button className="btn btn-secondary form-home-btn" id="homeBtn">
            Volver al inicio
          </button>

          <FormProgress />

          <div id="stepLabel" className="step-label">
            1 / 14
          </div>
        </div>

        <div className="question-layout">
          <FormMascot />
          <section id="questionCard" className="question-card"></section>
        </div>

        <ReturningMiniCard />
      </div>
    </main>
  );
}