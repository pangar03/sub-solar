import "./FormMascot.css";
import { SunMedium, Sparkles } from "lucide-react";

export default function FormMascot() {
  return (
    <aside className="form-mascot-card">
      <div className="mascot" aria-hidden="true">
        <div className="mascot-face">
          <SunMedium size={44} strokeWidth={2.2} />
          <Sparkles className="mascot-sparkle" size={18} strokeWidth={2.4} />
        </div>
      </div>

      <div id="speech" className="speech">
        Hola, soy Soli. Te haré preguntas simples para entender tu hogar.
      </div>
    </aside>
  );
}