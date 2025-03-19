import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".transition-overlay", {
      y: 0,
      duration: 0.6,
      ease: "power2.inOut",
    })
      .to(".transition-overlay", {
        y: "-100%",
        delay: 0.2,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .set(".transition-overlay", { y: "100%" });
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Transition Overlay */}
      <div className="transition-overlay fixed top-0 left-0 w-full h-full bg-black z-50 translate-y-full"></div>
      {children}
    </div>
  );
};

export default PageTransition;
