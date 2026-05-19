import { useEffect } from 'react';
import './styles.css';
import './legacy.js';
import HomePage from './components/HomePage.jsx';
import FormPage from './components/FormPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';

export default function App() {
  useEffect(() => {
    // Espera un instante para asegurar que todos los nodos existan.
    window.initGdoSolarApp?.();

    const nav = document.querySelector('.nav');

    const handleNavbarScroll = () => {
      if (!nav) return;
      nav.classList.toggle('nav-scrolled', window.scrollY > 80);
    };

    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);

    return () => {
      window.removeEventListener('scroll', handleNavbarScroll);
    };
  }, []);

  return (
    <div id="app" className="app">
      <HomePage />
      <FormPage />
      <ResultsPage />
    </div>
  );
}
