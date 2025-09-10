import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Assignment } from "@/types/assignment";

type Data =
    | { ok: true; assignments: Assignment[] }
    | { ok: true; id: string }
    | { ok: false; error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const client = await clientPromise;
    const db = client.db("projecttracker");
    const collection = db.collection<Assignment>("assignments");

    if (req.method === "POST") {
        const assignment: Assignment = {
            ...req.body,
            createdAt: new Date().toISOString(),
        };
        const result = await collection.insertOne(assignment);
        return res.status(201).json({ ok: true, id: result.insertedId.toString() });
    }

    if (req.method === "GET") {
        const assignments = await collection.find().toArray();
        return res.status(200).json({ ok: true, assignments });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
}
