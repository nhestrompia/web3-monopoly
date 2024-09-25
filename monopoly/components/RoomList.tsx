import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface Room {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
}

const rooms: Room[] = [
  { id: "1", name: "Poker Night", players: 4, maxPlayers: 6 },
  { id: "2", name: "Chess Masters", players: 2, maxPlayers: 2 },
  { id: "3", name: "Monopoly Madness", players: 3, maxPlayers: 4 },
  { id: "4", name: "Scrabble Scramble", players: 1, maxPlayers: 4 },
  { id: "5", name: "Uno Chaos", players: 5, maxPlayers: 8 },
];

export default function RoomList() {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-purple-800 shadow-hard">
        Join a Room
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="group relative overflow-hidden rounded-none border-4 border-black bg-gradient-to-br from-cyan-400 to-blue-500 p-4 shadow-hard transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
          >
            <h3 className="text-2xl font-bold text-black">{room.name}</h3>
            <div className="mt-2 flex items-center text-lg font-bold text-purple-800">
              <Users className="mr-2 h-6 w-6" />
              {room.players} / {room.maxPlayers}
            </div>
            <Button className="mt-4 w-full rounded-none border-2 border-black bg-yellow-300 text-xl font-bold uppercase text-black shadow-hard transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-none">
              Join Room
            </Button>
            <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-pink-400 shadow-hard transition-transform group-hover:scale-110"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
