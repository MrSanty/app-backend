import { Schema, model } from "mongoose";

const MovementSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  }
})

export default model('Movement', MovementSchema);