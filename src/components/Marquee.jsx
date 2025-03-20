"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      x: "-50%", // Moves only half to create a seamless loop
      duration: 5, // Faster movement
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="overflow-hidden bg-lime-600 w-full py-2">
      <div
        className="flex whitespace-nowrap text-white text-2xl font-bold uppercase tracking-wide"
        ref={marqueeRef}
      >
        <div className="flex items-center gap-8">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-[Instrument_Serif]">
              Gamers Assemble!
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
