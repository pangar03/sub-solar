import "./FormProgress.css";
import {
  Sun,
  BadgeDollarSign,
  Home,
  BatteryCharging,
  Lightbulb,
  BarChart3,
  Sparkles,
  Zap,
  Shield,
  PlugZap,
  Wallet,
  Cpu,
  Settings,
  CheckCircle2,
} from "lucide-react";

const icons = [
  Sun,
  BadgeDollarSign,
  Home,
  BatteryCharging,
  Lightbulb,
  BarChart3,
  Sparkles,
  Zap,
  Shield,
  PlugZap,
  Wallet,
  Cpu,
  Settings,
  CheckCircle2,
];

export default function FormProgress() {
  return (
    <div className="progress-wrap">
      <div className="progress-emojis" id="progressEmojis">
        {icons.map((Icon, index) => (
          <span key={index}>
            <Icon size={16} strokeWidth={2.4} />
          </span>
        ))}
      </div>

      <div className="progress-track" id="progressTrack"></div>

      <div
        id="progressBar"
        className="progress-bar"
        style={{ display: "none" }}
      ></div>
    </div>
  );
}