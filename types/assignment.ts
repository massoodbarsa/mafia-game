export type AssignmentStatus = "pending" | "in-progress" | "done";

export interface Assignment {
    _id?: string; // MongoDB ObjectId, optional when creating new
    title: string;
    description?: string;
    week: number;
    estimatedHours: number;
    deadline: string; // ISO date string
    status: AssignmentStatus;
    createdAt: string; // ISO date string
}