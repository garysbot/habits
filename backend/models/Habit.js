const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  frequency: { type: String, required: true, enum: ['Daily', 'Weekly', 'Monthly'] },
  type: { type: String, required: true, enum: ['Physical', 'Mental', 'Nutrition', 'Family', 'Love', 'Community', 'Spiritual', 'Career'] },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['Complete', 'Incomplete'] },
  progress: [{ type: Date }], // Array of dates when habit was marked complete
  reminderTime: Date, // Time for sending reminders
  lastUpdated: { type: Date, default: null }, // Last time the habit was updated
}, 
  {timestamps: true}
);

module.exports = mongoose.model('Habit', habitSchema);