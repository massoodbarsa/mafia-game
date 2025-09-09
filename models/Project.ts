import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
