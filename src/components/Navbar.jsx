import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import { Link } from "react-router-dom";


const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = ({ setIsSidebarOpen }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Handle Scroll Behavior
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate Navbar Visibility
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  // Toggle Audio Indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Play/Pause Audio
  useEffect(() => {
    if (audioElementRef.current) {
      isAudioPlaying
        ? audioElementRef.current.play()
        : audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              {/* Hamburger Menu Button */}
              <button
                onClick={setIsSidebarOpen} // Now using prop function from App.jsx
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>

              <Button
                id="product-button"
                title="Products"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            {/* Nav Items */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Audio Indicator */}
              <button
                className="ml-10 flex items-center space-x-0.5"
                onClick={toggleAudioIndicator}
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
