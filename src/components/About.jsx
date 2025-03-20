"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import sampleImage from "/src/assets/download.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!container.current) return;

    const cards = cardRefs.current.filter(Boolean);
    const totalScrollHeight = window.innerHeight * 1.5;
    const position = [14, 38, 62, 86];
    const rotation = [-10, -5, 5, 10];

    const pinTrigger = ScrollTrigger.create({
      trigger: container.current.querySelector(".cards"),
      start: "top top",
      end: `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Create the spread animation
    const spreadTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: `+=${totalScrollHeight * 0.4}`,
        scrub: 0.3,
      },
    });

    // Animate cards to spread out
    cards.forEach((card, index) => {
      spreadTimeline.to(
        card,
        {
          left: `${position[index]}%`,
          rotation: `${rotation[index]}`,
          ease: "power2.inOut",
        },
        index * 0.05
      );
    });

    cards.forEach((card, index) => {
      const flipCard = card.querySelector(".flip-card-inner");

      gsap.set(flipCard, {
        transition: "none",
        transformStyle: "preserve-3d",
      });

      // Create a flip timeline with clear start/end points
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current.querySelector(".cards"),
            start: `top+=${totalScrollHeight * 0.5} top`,
            end: `top+=${totalScrollHeight * 0.7} top`,
            scrub: 0.5,
            markers: true, // Helpful for debugging - remove in production
            onEnter: () => console.log("Flip animation triggered"),
          },
        })
        .to(flipCard, {
          rotationY: 180,
          ease: "power1.inOut",
          duration: 1,
        });
    });

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      className="w-full min-h-screen bg-black flex items-center justify-center"
      ref={container}
    >
      <div className="container mx-auto px-5 md:px-10">
        <div className="py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Us
          </h1>

          <p className="text-lg text-blue-50">Into the metaGame Layer</p>
          <p className="max-w-md text-lg text-blue-50 opacity-50 mb-16">
            In the year 3010, a group of genius college students accidentally
            activate a time rift, throwing them into an ancient world where
            magic and science collide. Stranded in a land ruled by a ruthless
            Demon Overlord, they must battle mythical creatures, forge
            alliances, and uncover the legendary Eon Core to restore time—or
            reshape history forever.
          </p>

          <section className="cards relative h-[60vh]">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc={sampleImage}
                frontAlt="Card Image"
                backText={`Card details ${index + 1}`}
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
