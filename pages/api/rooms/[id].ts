import type { NextApiRequest, NextApiResponse } from 'next';
import { rooms } from '../../../lib/rooms';
import { Player } from '../../../types';
import { v4 as uuid } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const room = rooms.find(r => r.id === id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (req.method === 'GET') {
        // Fetch room state
        return res.status(200).json(room);
    }

    if (req.method === 'POST') {
        // Join room
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Player name required' });

        const newPlayer: Player = {
            id: uuid(),
            name,
            alive: true,
        };

        room.players.push(newPlayer);

        return res.status(201).json(newPlayer);
    }

    res.status(405).json({ error: 'Method not allowed' });
}
