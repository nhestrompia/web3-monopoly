"use client";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users } from "lucide-react";
import { useState } from "react";
import CreateGameForm from "./CreateGameForm";
import RoomList from "./RoomList";

export default function MainMenu() {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoinGame, setIsJoinGame] = useState(false);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-yellow-300 font-mono">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "blur(10px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-center text-6xl font-black uppercase tracking-tighter text-purple-800 shadow-hard">
          Table Game
        </h1>
        <div className="grid gap-6 sm:grid-cols-2">
          <Button
            onClick={() => {
              if (isCreatingGame) {
                setIsCreatingGame(false);
              }
              setIsJoinGame(true);
            }}
            className="h-24 w-64 rounded-none border-4 border-black bg-cyan-400 text-2xl font-bold uppercase text-black shadow-hard transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
          >
            <Users className="mr-2 h-8 w-8" />
            Join Room
          </Button>
          <Button
            onClick={() => {
              if (isJoinGame) {
                setIsJoinGame(false);
              }
              setIsCreatingGame(true);
            }}
            className="h-24 w-64 rounded-none border-4 border-black bg-pink-400 text-2xl font-bold uppercase text-black shadow-hard transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
          >
            <Gamepad2 className="mr-2 h-8 w-8" />
            Create Game
          </Button>
        </div>
        {isJoinGame && <RoomList />}
        {isCreatingGame && <CreateGameForm />}
      </div>
    </div>
  );
}
