"use client";
import { properties } from "@/constants/properties";
import { useState } from "react";
import Dice from "./Dice";

export default function Board() {
  const [playerPosition, setPlayerPosition] = useState(0);

  const handleRollComplete = (total: number) => {
    setPlayerPosition(
      (prevPosition) => (prevPosition + total) % properties.length
    );
  };
  return (
    <div className=" h-[80vh] relative  max-w-2xl mx-auto ">
      <div className="aspect-square h-[80vh]">
        <div className="grid grid-cols-6 grid-rows-6 h-full border-4 border-black bg-green-100">
          {properties.map((property, index) => {
            const isCorner = property.type === "corner";
            const isVertical = (index > 5 && index <= 10) || index > 15;
            const gridArea =
              index === 0
                ? "6 / 6 / span 1 / span 1"
                : index === 5
                ? "6 / 1 / span 1 / span 1"
                : index === 10
                ? "1 / 1 / span 1 / span 1"
                : index === 15
                ? "1 / 6 / span 1 / span 1"
                : index < 5
                ? `6 / ${6 - index} / span 1 / span 1`
                : index < 10
                ? `${11 - index} / 1 / span 1 / span 1`
                : index < 15
                ? `1 / ${index - 9} / span 1 / span 1`
                : `${index - 14} / 6 / span 1 / span 1`;

            return (
              <div
                key={property.name}
                className={`flex flex-col items-center justify-between p-1 text-[0.4rem] sm:text-[0.5rem] md:text-xs font-semibold border border-black ${
                  property.color
                } ${isCorner ? "col-span-1 row-span-1" : ""}`}
                style={{ gridArea }}
              >
                {!isCorner && (
                  <div className={`w-full h-1/4 ${property.color}`}></div>
                )}
                <div
                  className={`${
                    isVertical ? "-rotate-90" : ""
                  } text-center flex-grow flex items-center justify-center`}
                >
                  {property.icon ? (
                    <span className="text-lg">{property.icon}</span>
                  ) : (
                    <span className="text-center">{property.name}</span>
                  )}
                </div>
                {property.price && <div>{property.price}</div>}
              </div>
            );
          })}

          {/* Center */}
          <div className="col-start-2 col-end-6 row-start-2 row-end-6 flex items-center justify-center">
            {/* <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Monopoly Logo"
              width={300}
              height={150}
              className="max-w-full max-h-full"
            /> */}
            <Dice onRollComplete={handleRollComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
