import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";

interface DiceProps {
  onRollComplete: (total: number) => void;
}

const Dice: React.FC<DiceProps> = ({ onRollComplete }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [dice1Face, setDice1Face] = useState(1);
  const [dice2Face, setDice2Face] = useState(1);

  const rollDice = useCallback(() => {
    if (isRolling) return;

    setIsRolling(true);

    // Animate dice faces over 1 second
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const randomFace1 = Math.floor(Math.random() * 6) + 1;
      const randomFace2 = Math.floor(Math.random() * 6) + 1;

      setDice1Face(randomFace1);
      setDice2Face(randomFace2);

      rollCount += 1;
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        setIsRolling(false);
        onRollComplete(randomFace1 + randomFace2);
      }
    }, 100); // Change dice faces every 100ms
  }, [isRolling, onRollComplete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-8">
        {/* Dice 1 */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1], opacity: [0.8, 1] }}
          transition={{ duration: 0.5 }}
          key="dice1"
        >
          <img
            src={`/dices/light-dice-${dice1Face}.png`}
            alt={`Dice 1: ${dice1Face}`}
            width={60}
            height={60}
          />
        </motion.div>

        {/* Dice 2 */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1], opacity: [0.8, 1] }}
          transition={{ duration: 0.5 }}
          key="dice2"
        >
          <img
            src={`/dices/light-dice-${dice2Face}.png`}
            alt={`Dice 2: ${dice2Face}`}
            width={60}
            height={60}
          />
        </motion.div>
      </div>
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
