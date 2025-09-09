import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
    {
        weekId: { type: Schema.Types.ObjectId, ref: "Week" },
        title: { type: String, required: true },
        description: { type: String },
        estimatedHours: { type: Number, default: 0 },
        committedHours: { type: Number, default: 0 },
        deadline: { type: Date },
        status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },
        notes: { type: String },
    },
    { timestamps: true }
);

export default models.Task || model("Task", TaskSchema);
