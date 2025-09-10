import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { Room } from '../../../types';
import { rooms } from '../../../lib/rooms';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Room name is required' });
        }

        const newRoom: Room = {
            id: uuid(),
            name,
            players: [],
            gameState: 'waiting',
            votes: {},
        };

        rooms.push(newRoom);

        return res.status(201).json(newRoom);
    }

    res.status(405).json({ error: 'Method not allowed' });
}
