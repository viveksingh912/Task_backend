const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true }, // User ID to associate tasks with users
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    state: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do",
    },
    history: [
      {
        timestamp: { type: Date, default: Date.now },
        action: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", taskSchema);
