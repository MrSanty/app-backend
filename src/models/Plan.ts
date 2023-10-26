import { Schema, model } from "mongoose";

const PlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  initPrice: {
    type: Number,
    required: true,
    trim: true
  },
  dateRange: [{
    type: Date,
    required: true,
    trim: true
  }],
  movements: [{
    type: Schema.Types.ObjectId,
    ref: 'Movement'
  }],
  finalPrice: {
    type: Number,
    required: true,
    trim: true
  }
})


export default model('Plan', PlanSchema);