import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === "POST") {
        const project = await Project.create(req.body);
        return res.status(201).json(project);
    }

    if (req.method === "GET") {
        const projects = await Project.find({});
        return res.status(200).json(projects);
    }

    res.status(405).end();
}
