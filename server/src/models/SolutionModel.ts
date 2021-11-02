import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema(
  { solution: { type: Array, required: true } },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const SolutionModel = mongoose.model("Solution", SolutionSchema);
