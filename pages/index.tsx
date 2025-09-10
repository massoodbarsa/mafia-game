// pages/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import { Room } from "../types";
import { ApiResponse } from "../types/api";

interface LobbyProps {
  rooms: Room[];
}

// This will use ISR (revalidate every 5 seconds)
export const getStaticProps: GetStaticProps<LobbyProps> = async () => {
  const res = await fetch("http://localhost:3000/api/rooms");
  const json: ApiResponse<Room[]> = await res.json();

  return {
    props: {
      rooms: json.data || [],
    },
    revalidate: 5, // ISR: rebuild every 5 seconds
  };
};

export default function Lobby({ rooms }: LobbyProps) {
  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Mafia Game Lobby</h1>

      {rooms.length === 0 ? (
        <p className="text-center text-red-500">No active rooms. Create one!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <li
              key={room.id}
              className="bg-red shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{room.name}</h2>
                <p className="text-gray-600">Players: {room.players.length}</p>
                <p className="text-gray-600">State: {room.gameState}</p>
              </div>
              <Link
                href={`/rooms/${room.id}`}
                className="mt-4 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
              >
                Join Room
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/create-room"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Create New Room
        </Link>
      </div>
    </div>
  );
}
