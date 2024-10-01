import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
    <div className="space-y-6 z-0">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-purple-800 shadow-hard">
        Join a Room
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card className="group relative" key={room.id}>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="mt-2 flex items-center text-lg font-bold text-purple-800">
              <Users className="mr-2 h-6 w-6" />
              {room.players} / {room.maxPlayers}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <Button
                variant={"default"}
                // className="mt-4 w-full rounded-none border-2 border-black bg-yellow-300 text-xl font-bold uppercase text-black shadow-hard transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-none"
              >
                Join Room
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
