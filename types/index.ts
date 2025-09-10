// types/index.ts

// Game roles
export type Role = 'Mafia' | 'Detective' | 'Doctor' | 'Townsperson';

// Player in a game
export interface Player {
    id: string;            // unique player id
    name: string;          // player name
    role?: Role;           // assigned role (optional before game starts)
    alive: boolean;        // is player alive
    socketId?: string;     // for real-time connection (future WebSockets)
}

// Room representation
export interface Room {
    id: string;                    // unique room id
    name: string;                  // room name
    players: Player[];             // players in room
    gameState: 'waiting' | 'night' | 'day' | 'ended';
    votes: Record<string, string>; // mapping: playerId => votedPlayerId
}
