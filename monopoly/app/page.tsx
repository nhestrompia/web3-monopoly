"use client";
import MainMenu from "@/components/MainMenu";
import SocketConnection from "@/components/SocketConnection";
import Board from "../components/Board";

export default function Home() {
  return (
    <div className="">
      <MainMenu />
      <Board />
      <SocketConnection />
    </div>
  );
}
