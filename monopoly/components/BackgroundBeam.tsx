"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const controls = useAnimation();
    const [isVertical, setIsVertical] = useState(false); // Track if the path is vertical or horizontal
    const [side, setSide] = useState<"left" | "right" | "top" | "bottom" | null>(null)

    useEffect(() => {
      const sequence = async () => {
        // Phase 1: Top-left to top-right (horizontal)
        setIsVertical(false); // Set to horizontal
        setSide("top")
        await controls.start({
          x: [0, window.innerWidth - (150)], // 150: Width of the navbar
          y: [0, 0],
          transition: { duration: 5, ease: "linear" },
        });

        // Phase 2: Top-right to bottom-right (vertical)
        setIsVertical(true); // Set to vertical
        setSide("right")
        await controls.start({
          x: [window.innerWidth - 80, window.innerWidth - 80],
          y: [0, window.innerHeight - 150], // 80: Height of the navbar
          transition: { duration: 3, ease: "linear" },
        });

        // Phase 3: Bottom-right to bottom-left (horizontal)
        setIsVertical(false); // Set to horizontal
        setSide("bottom")
        await controls.start({
          x: [window.innerWidth - 150, 0],
          y: [window.innerHeight - 80, window.innerHeight - 80],
          transition: { duration: 5, ease: "linear" },
        });

        // Phase 4: Bottom-left back to top-left (vertical)
        setIsVertical(true); // Set to vertical
        setSide("left")

        await controls.start({
          x: [0, 0],
          y: [window.innerHeight - 150, 0],
          transition: { duration: 3, ease: "linear" },
        });

        // Loop the animation
        sequence();
      };

      sequence();
    }, [controls]);

    return (
      <div className="absolute  inset-0 h-full w-full">
        <svg
          className="z-0 h-full w-full pointer-events-none absolute"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L100 0 L100 100 L0 100 Z"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.2"
            strokeWidth="3"
          ></path>
        </svg>

        {/* Navbar following the edge */}
        <motion.nav
          className="absolute   text-white"
        //   style={{ width: isVertical ? "80px" : "150px", height: isVertical ? "150px" : "80px" }} // Adjust the size of the navbar
          animate={controls}
          layout
        >
          {/* Dynamically adjust flex direction based on whether we're on a vertical or horizontal edge */}
          <motion.div
          layout
            className={`flex ${
              isVertical ? "flex-col" : "flex-row"
            } justify-between gap-4 w-full h-full items-center`}
            style={{
              transition: "all 1s ease-in-out", // Smooth transition when orientation changes
            }}
          >
            {/* <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li> */}
            <Navbar isVertical={isVertical} side={side}/>
          </motion.div>
        </motion.nav>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
