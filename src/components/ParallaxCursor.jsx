// src/components/ParallaxCursor.jsx
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function ParallaxCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updatePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(".cursor", {
        x: position.x,
        y: position.y,
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to(".cursor-trail", {
        x: position.x,
        y: position.y,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="cursor fixed w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm pointer-events-none z-[1000] -ml-3 -mt-3"
        style={{ mixBlendMode: "difference" }}
      />
      <div className="cursor-trail fixed w-12 h-12 rounded-full border border-white/20 pointer-events-none z-[999] -ml-6 -mt-6" />
    </>
  );
}
