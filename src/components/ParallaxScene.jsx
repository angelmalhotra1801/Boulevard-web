"use client"

// src/components/ParallaxScene.jsx
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useThrottle } from "../hooks/useThrottle"

export default function ParallaxScene() {
  const sceneRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Define layers with their properties
  const layers = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layer%203-xtD6iSmae3C4ally1SohmBzVADzoX0.png",
      speedX: 0.01,
      speedY: 0.01,
      zIndex: 1,
      className: "bg-img",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clouds-oBmzWWLS3kifTT3UI2Jean4UDsEsSd.png",
      speedX: 0.03,
      speedY: 0.04,
      zIndex: 3,
      className: "clouds-img",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain-msydoGlpq2PziPwYcIZRGZTuZrFCVk.png",
      speedX: 0.05,
      speedY: 0.06,
      zIndex: 4,
      className: "mountain-img",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/girl-UObufQDoQpOm7GjHZRIsWtOjpw8sY1.png",
      speedX: 0.08,
      speedY: 0.09,
      zIndex: 5,
      className: "girl-img",
    },
    // Add castle image to the right side
    {
      src: "/placeholder.svg?height=600&width=400", // Replace with actual castle image
      speedX: 0.04,
      speedY: 0.05,
      zIndex: 4,
      className: "castle-img",
    },
  ]

  // Throttle mouse move updates for better performance
  const throttledMouseMove = useThrottle((e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    // Calculate normalized position (-1 to 1)
    const normalizedX = (clientX - innerWidth / 2) / (innerWidth / 2)
    const normalizedY = (clientY - innerHeight / 2) / (innerHeight / 2)

    setMousePosition({ x: normalizedX, y: normalizedY })
  }, 10)

  useEffect(() => {
    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [throttledMouseMove])

  useEffect(() => {
    // Animate each layer with GSAP for smoother transitions
    layers.forEach((layer) => {
      const element = document.querySelector(`.${layer.className}`)
      if (element) {
        gsap.to(element, {
          x: -mousePosition.x * 100 * layer.speedX,
          y: -mousePosition.y * 100 * layer.speedY,
          duration: 1.2, // Smooth transition
          ease: "power2.out",
        })
      }
    })
  }, [mousePosition])

  return (
    <>
      <div
        ref={sceneRef}
        className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500"
      >
        {layers.map((layer, index) => (
          <img
            key={index}
            src={layer.src || "/placeholder.svg"}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${layer.className}`}
            style={{
              zIndex: layer.zIndex,
              width: ["girl-img", "castle-img"].includes(layer.className)
                ? "auto"
                : "100vw",
              height: ["girl-img", "castle-img"].includes(layer.className)
                ? "75vh"
                : "100vh",
              objectFit: ["girl-img", "castle-img"].includes(layer.className)
                ? "contain"
                : "cover",
              transform: "translate(-50%, -50%)",
            }}
            alt=""
          />
        ))}

        {/* Vignette effect */}
        <div className="absolute inset-0 pointer-events-none z-[100] bg-radial-gradient" />
      </div>
    </>
  );
}

