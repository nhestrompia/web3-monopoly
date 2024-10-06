"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export const MovingFrame = React.memo(
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
          x: [0, window.innerWidth - (205)], // 205: Width of the navbar
          y: [0, 0],
          transition: { duration: 5, ease: "linear" },
        });

        // Phase 2: Top-right to bottom-right (vertical)
        setIsVertical(true); // Set to vertical
        setSide("right")
        await controls.start({
          x: [window.innerWidth - 60, window.innerWidth - 60],
          y: [0, window.innerHeight - 205], // 80: Height of the navbar
          transition: { duration: 3, ease: "linear" },
        });

        // Phase 3: Bottom-right to bottom-left (horizontal)
        setIsVertical(false); // Set to horizontal
        setSide("bottom")
        await controls.start({
          x: [window.innerWidth - 180, 0],
          y: [window.innerHeight - 60, window.innerHeight - 60],
          transition: { duration: 5, ease: "linear" },
        });

        // Phase 4: Bottom-left back to top-left (vertical)
        setIsVertical(true); // Set to vertical
        setSide("left")

        await controls.start({
          x: [0, 0],
          y: [window.innerHeight - 205, 0],
          transition: { duration: 3, ease: "linear" },
        });

        // Loop the animation
        sequence();
      };

      sequence();
    }, [controls]);

    return (
      <div className="absolute  inset-0 h-full w-full">
            <div className="relative w-full  h-full overflow-hidden ">
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-auto flex gap-4 justify-center items-center bg-yellow-300 border-b-4 border-black">
          {/* {links.map((link, index) => (
            <NavLink key={`top-${index}`} link={link} />
          ))} */}
          
      </div>
      <div className="absolute top-16 right-0 w-32 pointer-events-auto h-[calc(100%-32px)] bg-yellow-300 border-l-4 border-black">
        {/* <Marquee autoFill gradient={false} speed={30} direction="up">
          {links.map((link, index) => (
            <div
              key={`right-${index}`}
              className="my-4 transform -rotate-90 whitespace-nowrap"
            >
              <NavLink link={link} />
            </div>
          ))}
        </Marquee> */}
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-auto z-10 w-full h-16 flex gap-4 justify-center items-center bg-yellow-300 border-t-4 border-black">
        
      </div>
      <div className="absolute top-16 left-0 pointer-events-auto w-32 h-[calc(100%-32px)] bg-yellow-300 border-r-4 border-black">
        {/* <Marquee gradient={false} speed={30} direction="down">
          {links.map((link, index) => (
            <div
              key={`left-${index}`}
              className="my-4 transform -rotate-90 whitespace-nowrap"
            >
              <NavLink link={link} />
            </div>
          ))}
        </Marquee> */}
      </div>
    </div>
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

