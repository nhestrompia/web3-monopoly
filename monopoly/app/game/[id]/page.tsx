"use client";

import Board from "@/components/Board";

interface IPage {}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Board />
    </div>
  );
}
