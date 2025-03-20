"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Story = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Floating effect for the image
    gsap.to(imageRef.current, {
      y: -30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Subtle animation for text
    gsap.from(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power2.out",
    });

    // Button hover effect
    gsap.set(buttonRef.current, { scale: 1 });
    buttonRef.current.addEventListener("mouseenter", () => {
      gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3 });
    });
    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
    });
  }, []);

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center">
      <div className="container mx-auto px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Text Section */}
        <div ref={textRef}>
          <h3 className="text-yellow-500 text-xl font-semibold tracking-widest uppercase font-['Instrument_Serif']">
            Introducing
          </h3>
          <h1 className="text-6xl lg:text-7xl font-extrabold uppercase mt-2 font-['Instrument_Serif']">
            Synctec
          </h1>
          <p className="text-gray-300 mt-4 max-w-md tracking-wide leading-relaxed font-['Instrument_Serif']">
            Synctec is your gateway to a thriving and dynamic network of gamers,
            creators, and innovators. Our platform brings together passionate
            individuals from across Africa, fostering connections,
            collaboration, and growth.
          </p>
          <button
            ref={buttonRef}
            className="mt-6 px-8 py-4 text-lg font-bold uppercase bg-gray-900 hover:bg-gray-800 text-yellow-400 border-2 border-gray-700 rounded-md shadow-lg transition relative transform skew-x-6 font-['Roboto']"
          >
            JOIN US
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center lg:justify-end mr-10">
          <img
            ref={imageRef}
            src="src/assets/character.png"
            alt="Synctec Character"
            className="rounded-xl w-80 h-80 lg:w-[450px] lg:h-[450px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
