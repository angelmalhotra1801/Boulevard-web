"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxScene from "./components/ParallaxScene";
import ParallaxCursor from "./components/ParallaxCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Story from "./components/Story";
import Marquee from "./components/Marquee"; // Adjust path if needed
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      <div className="main" ref={mainRef}>
        {" "}
        <div className="relative">
          {loading && <Preloader onFinish={() => setLoading(false)} />}

          {!loading && (
            <main className="min-h-screen flex items-center justify-center bg-black text-white"></main>
          )}
        </div>
      </div>
      <Navbar setIsSidebarOpen={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="scrollable-container fixed top-0 left-0 w-full">
        <div ref={mainRef} className="relative w-full h-screen overflow-hidden">
          <ParallaxScene />
        </div>
        <div className="html-container">
          <iframe
            src="src/components/about.html"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </div>
        <Banner />
        <Story />
        <Marquee />
        <Contact />
      </div>

      <ParallaxCursor />
    </>
  );
}

export default App;
