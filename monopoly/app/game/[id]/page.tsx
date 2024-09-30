"use client";

interface IPage {}

export default function Page({ params }: { params: { id: string } }) {
  return <div>Page {params.id}</div>;
}
