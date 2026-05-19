import { useEffect, useState } from "react";
import "./ReviewsSection.css";

const reviews = [
  {
    text: "Antes sentía que la energía solar era demasiado técnica para mi casa. Con GdO entendí mi plan en minutos y ahora pago una cuota clara cada mes.",
    name: "María Fernanda",
    role: "Usuaria residencial",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    text: "Lo mejor fue no tener que hacer una inversión gigante. Instalaron todo, nos explicaron el sistema y desde el primer mes vimos el cambio en la factura.",
    name: "Carlos Restrepo",
    role: "Propietario de vivienda",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    text: "En mi casa se va la luz seguido. Tener batería de respaldo nos dio tranquilidad, especialmente en las noches y cuando estamos trabajando desde casa.",
    name: "Laura Gómez",
    role: "Cliente plan resiliente",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    text: "El simulador me ayudó a entender cuánta energía uso realmente. No fue una venta confusa, fue una recomendación clara para mi hogar.",
    name: "Andrés Molina",
    role: "Cliente GdO Solar",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
];

export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[activeReview];

  return (
    <section className="reviews-section" id="reviews">
      <div className="review-stars">★★★★★</div>

      <div className="review-content" key={activeReview}>
        <h2>“{review.text}”</h2>

        <p>
          {review.name}, <span>{review.role}</span>
        </p>
      </div>

      <div className="review-avatars">
        {reviews.map((item, index) => (
          <button
            key={item.name}
            className={`review-avatar ${
              activeReview === index ? "active" : ""
            }`}
            onClick={() => setActiveReview(index)}
            aria-label={`Ver review de ${item.name}`}
          >
            <img src={item.image} alt={item.name} />
          </button>
        ))}
      </div>
    </section>
  );
}