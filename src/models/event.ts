import { Event as IEvent } from '@interfaces/event';
import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  createdBy: {
    ip: String,
    email: String,
    userId: String,
  },
  sdk: {
    version: String,
    name: String,
  },
  os: {
    version: String,
    name: String,
  },
  browser: {
    version: String,
    name: String,
  },
  timeStamp: Date,
  url: String,
  type: String,
  value: String,
  stactTrace: [Object],
  platform: String,
  context: [String],
});
export default mongoose.model<IEvent & mongoose.Document>('Event', Event);