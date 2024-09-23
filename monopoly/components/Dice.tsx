import Matter from "matter-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface DiceProps {
  onRollComplete: (total: number) => void;
}

const Dice: React.FC<DiceProps> = ({ onRollComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRolling, setIsRolling] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const dice1Ref = useRef<Matter.Body | null>(null);
  const dice2Ref = useRef<Matter.Body | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: 300,
        height: 200,
        wireframes: false,
        background: "transparent",
      },
    });

    const diceSize = 40;
    const dice1 = Bodies.rectangle(100, 100, diceSize, diceSize, {
      chamfer: { radius: 5 },
      render: {
        sprite: {
          texture: "/dices/light-dice-1.png",
          xScale: diceSize / 200,
          yScale: diceSize / 200,
        },
      },
    });
    const dice2 = Bodies.rectangle(200, 100, diceSize, diceSize, {
      chamfer: { radius: 5 },
      render: {
        sprite: {
          texture: "/dices/light-dice-1.png",
          xScale: diceSize / 200,
          yScale: diceSize / 200,
        },
      },
    });
    dice1Ref.current = dice1;
    dice2Ref.current = dice2;

    const ground = Bodies.rectangle(150, 190, 300, 20, { isStatic: true });
    const leftWall = Bodies.rectangle(10, 100, 20, 200, { isStatic: true });
    const rightWall = Bodies.rectangle(290, 100, 20, 200, { isStatic: true });

    Composite.add(engine.world, [dice1, dice2, ground, leftWall, rightWall]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  const animateDiceFaces = (
    dice: Matter.Body,
    duration: number,
    finalFace: number
  ) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      if (progress < 1) {
        const randomFace = Math.floor(Math.random() * 6) + 1;
        dice.render.sprite!.texture = `/dices/light-dice-${randomFace}.png`;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        dice.render.sprite!.texture = `/dices/light-dice-${finalFace}.png`;
      }
    };
    animate();
  };

  const rollDice = useCallback(() => {
    if (isRolling || !dice1Ref.current || !dice2Ref.current) return;

    setIsRolling(true);

    const throwForce = 0.03;
    const throwAngle = (Math.random() * Math.PI) / 4 + Math.PI / 8; // Angle between PI/8 and 3PI/8

    Matter.Body.setPosition(dice1Ref.current, { x: 50, y: 150 });
    Matter.Body.setPosition(dice2Ref.current, { x: 100, y: 150 });

    Matter.Body.setVelocity(dice1Ref.current, {
      x: Math.cos(throwAngle) * throwForce,
      y: -Math.sin(throwAngle) * throwForce,
    });
    Matter.Body.setVelocity(dice2Ref.current, {
      x: Math.cos(throwAngle) * throwForce,
      y: -Math.sin(throwAngle) * throwForce,
    });

    Matter.Body.setAngularVelocity(
      dice1Ref.current,
      (Math.random() - 0.5) * 0.2
    );
    Matter.Body.setAngularVelocity(
      dice2Ref.current,
      (Math.random() - 0.5) * 0.2
    );

    setTimeout(() => {
      const result1 = Math.floor(Math.random() * 6) + 1;
      const result2 = Math.floor(Math.random() * 6) + 1;

      if (dice1Ref.current && dice2Ref.current) {
        animateDiceFaces(dice1Ref.current, 1000, result1);
        animateDiceFaces(dice2Ref.current, 1000, result2);
      }

      setTimeout(() => {
        setIsRolling(false);
        onRollComplete(result1 + result2);
      }, 1000);
    }, 1000);
  }, [isRolling, onRollComplete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas ref={canvasRef} width={300} height={200} />
      <Button
        onClick={rollDice}
        disabled={isRolling}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </Button>
    </div>
  );
};

export default Dice;
