"use client";
import MainMenu from "@/components/MainMenu";
import MarqueeNavbar from "@/components/MarqueeNavbar";
import SocketConnection from "@/components/SocketConnection";
import Board from "../components/Board";

export default function Home() {
  return (
    <div className="">
      <MainMenu />
      <MarqueeNavbar />
      <Board />
      <SocketConnection />
    </div>
  );
}
