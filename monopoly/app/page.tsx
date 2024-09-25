"use client";
import SocketConnection from "@/components/SocketConnection";
import Board from "../components/Board";

export default function Home() {
  return (
    <div className="">
      <Board />
      <SocketConnection />
    </div>
  );
}
