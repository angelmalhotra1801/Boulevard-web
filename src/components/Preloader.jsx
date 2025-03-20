import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);

          // GSAP blur-out animation
          gsap.to(preloaderRef.current, {
            opacity: 0,
            y: -100, // Moves it upwards
            duration: 1.5, // Slow transition
            ease: "power2.out",
            onComplete: onFinish, // Call onFinish after animation
          });

          return 100;
        }
        return oldProgress + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-[9999]"
    >
      <div className="mb-6">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10 L90 90 H10 Z"
            stroke="url(#gradient)"
            strokeWidth="5"
            fill="none"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff0080" />
              <stop stopColor="#8000ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-lg mb-2">Click anywhere to turn on Music</div>
        <div className="animate-bounce">🎧</div>
      </div>

      <div className="absolute bottom-10 right-10 text-[60px] font-bold">
        {progress}%
      </div>
    </div>
  );
};

export default Preloader;
