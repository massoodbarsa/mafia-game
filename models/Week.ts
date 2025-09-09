import { Schema, model, models } from "mongoose";

const WeekSchema = new Schema(
    {
        projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
        title: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        progress: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default models.Week || model("Week", WeekSchema);
