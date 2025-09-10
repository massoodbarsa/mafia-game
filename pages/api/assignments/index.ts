import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = await clientPromise;
    const db = client.db("project-management");
    const collection = db.collection("assignments");

    if (req.method === "POST") {
        const assignment = req.body;
        assignment.createdAt = new Date();
        const result = await collection.insertOne(assignment);
        return res.status(201).json({ ok: true, id: result.insertedId });
    }

    if (req.method === "GET") {
        const assignments = await collection.find().toArray();
        return res.status(200).json({ ok: true, assignments });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
}
