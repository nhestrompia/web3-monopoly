import useSupabaseBrowser from "@/lib/supabase-browser";
import { Room as RoomData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

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
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const { data: rooms } = useQuery({
    queryKey: ["roomList"],
    queryFn: () => {
      return supabase
        .schema("public")
        .from("rooms")
        .select("*")
        .eq("active", true);
    },
  });
  const handleJoin = (roomId: string) => {
    router.push(`/game/${roomId}`);
  };

  console.log("🚀 ~ RoomList ~ rooms:", rooms);
  return (
    <div className="space-y-6 z-0 ">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-purple-800 shadow-hard">
        Join a Room
      </h2>
      <div className="grid gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
        {rooms ? (
          //@ts-ignore
          rooms?.data?.map((room: RoomData) => (
            <Card className="group relative w-48" key={room.id}>
              <CardHeader>
                <CardTitle>{room.room_name}</CardTitle>
              </CardHeader>
              <CardContent className="mt-2 flex flex-col items-center text-lg font-bold text-purple-800">
                <Users className="mr-2 h-6 w-6" />
                <p>Players: {room.users.length}</p>
                <p>Entry Wager: {room.wager ? room.wager : "N/A"} </p>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <Button onClick={() => handleJoin(room.room_id)}>
                  Join Room
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="group flex flex-col justify-center items-center relative h-48  ">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 flex flex-col gap-2 items-center text-lg font-bold ">
              <Skeleton className="h-4 w-24" />
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
