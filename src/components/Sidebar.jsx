"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const menuItems = [
  { title: "Story", page: "001", href: "#", active: false },
  { title: "Protocol", page: "002", href: "#", active: false },
  { title: "Journal", page: "003", href: "#", active: false },
  { title: "Contact", page: "004", href: "#", active: false },
  { title: "Gallery", page: "005", href: "#", active: true },
  { title: "About", page: "006", href: "#", active: false },
];

const bottomItems = [
  { title: "Connect", content: "Discord" },
  { title: "Buy On", content: "Opensea" },
  { title: "US-EN", content: "2004" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const menuContainerRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    if (isOpen) {
      gsap.to(menuContainerRef.current, {
        left: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        menuItemsRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(menuContainerRef.current, {
        left: "-50%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const shuffleText = (element) => {
    if (!element) return;
    const text = element.textContent;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = text
        .split("")
        .map((letter, index) =>
          index < iteration
            ? text[index]
            : letters[Math.floor(Math.random() * 26)]
        )
        .join("");
      iteration += 1 / 3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
  };

  return createPortal(
    <div
      ref={menuContainerRef}
      className={`fixed top-1/2 -translate-y-1/2 left-[-50%] w-[35%] h-[100vh] flex justify-center items-center z-50 bg-black/30 backdrop-blur-lg text-white font-['Space Mono'] uppercase overflow-hidden transition-all duration-500 ease-out p-6`}
    >
      <div className="w-full h-full flex overflow-hidden">
        <div className="flex-[5] flex flex-col justify-between border-r border-white/10">
          <div className="border-t border-white/10">
            <div className="p-8 hidden md:block">
              <p className="text-xs">Discover</p>
            </div>
            <div className="py-5 px-4 md:px-0 flex flex-col">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  className={`relative transition-all duration-300 py-2 pl-4 text-3xl font-bold tracking-[-1px] ${
                    item.active
                      ? "bg-aquamarine text-black hover:bg-white" // Ensures the background is visible
                      : "hover:bg-white hover:text-black"
                  }`}
                  onMouseEnter={(e) =>
                    shuffleText(e.currentTarget.querySelector("a"))
                  }
                >
                  <a
                    href={item.href}
                    className={`relative z-10 ${
                      item.active ? "text-black" : "text-white hover:text-black"
                    }`} // Fixes the text color issue
                  >
                    {item.title}
                  </a>
                  <span className="absolute left-[calc(100%+20px)] text-xs">{`Page ${item.page}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {bottomItems.map((item, index) => (
              <div
                key={index}
                className="w-full flex gap-4 border-t border-white/10 p-4 px-8"
              >
                <div className="flex-1 hidden md:block">
                  <p className="text-xs">{item.title}</p>
                </div>
                <div className="flex-4 md:pl-8">
                  <p className="relative w-max p-0.5 uppercase text-xs group">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[0.2] flex flex-col justify-between">
          <button
            onClick={onClose}
            className="p-6 border-b border-white/10 text-white hover:text-gray-300"
          >
            ✖
          </button>
          <div className="p-6">
            <span className="text-white">☰</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Sidebar;
