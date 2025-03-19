import { forwardRef } from "react";

const Card = forwardRef(({ id, frontSrc, frontAlt, backText }, ref) => {
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={frontSrc || "/placeholder.svg?height=400&width=300"}
              width="300"
              height="400"
              alt={frontAlt}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flip-card-back">
            <p className="text-black text-center text-lg">{backText}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
