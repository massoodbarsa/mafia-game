import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("project-management");
        const collection = db.collection("assignments");

        const { id } = req.query;

        if (!ObjectId.isValid(id as string)) {
            return res.status(400).json({ ok: false, error: "Invalid ID" });
        }

        switch (req.method) {
            case "PUT": {
                const { title, description, week, estimatedHours, deadline, status } = req.body;

                const result = await collection.updateOne(
                    { _id: new ObjectId(id as string) },
                    {
                        $set: {
                            ...(title && { title }),
                            ...(description && { description }),
                            ...(week && { week }),
                            ...(estimatedHours && { estimatedHours }),
                            ...(deadline && { deadline }),
                            ...(status && { status }),
                            updatedAt: new Date(),
                        },
                    }
                );

                return res.json({ ok: true, modifiedCount: result.modifiedCount });
            }

            case "DELETE": {
                const result = await collection.deleteOne({ _id: new ObjectId(id as string) });
                return res.json({ ok: true, deletedCount: result.deletedCount });
            }

            default:
                return res.status(405).json({ ok: false, error: "Method not allowed" });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return res.status(500).json({ ok: false, error: err.message });
    }
}
