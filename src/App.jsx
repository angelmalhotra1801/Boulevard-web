"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxScene from "./components/ParallaxScene";
import ParallaxCursor from "./components/ParallaxCursor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Create a smooth scroll effect using GSAP
    const smoothScroll = {
      current: 0,
      target: 0,
      ease: 0.05,
      setHeight() {
        document.body.style.height = `${this.scrollContainer.offsetHeight}px`;
      },
      init() {
        this.scrollContainer = document.querySelector(".scrollable-container");
        this.setHeight();

        gsap.ticker.add(this.raf);

        window.addEventListener("resize", () => this.setHeight());
      },
      raf() {
        smoothScroll.target = window.scrollY;
        smoothScroll.current +=
          (smoothScroll.target - smoothScroll.current) * smoothScroll.ease;

        if (smoothScroll.scrollContainer) {
          gsap.set(smoothScroll.scrollContainer, {
            y: -smoothScroll.current,
          });
        }
      },
    };

    // Initialize smooth scrolling
    smoothScroll.init();

    // Main section parallax effect
    if (mainRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.2,
        },
      });

      tl.to(mainRef.current, {
        scale: 1.1,
        y: -80,
        ease: "power1.out",
      });
    }

    return () => {
      // Clean up
      gsap.ticker.remove(smoothScroll.raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="scrollable-container fixed top-0 left-0 w-full">
        <div ref={mainRef} className="relative w-full h-screen overflow-hidden">
          <ParallaxScene />
        </div>
        <About />
        <Contact />
      </div>

      <ParallaxCursor />
    </>
  );
}

export default App;
