// counter_model.js
import mongoose, { Schema } from 'mongoose';

// this counter is used for incrementing nthParticipant atomically. The findOneAndUpdate call in participant_model.js uses the counter and makes sure that two concurrent createParticipant calls don't try to use the same nthParticipant (for instance, if createParticipant counted the length of the Participant collection, and used that to create nthParticipant).
const CounterSchema = new Schema({
  _id: { type: String, required: true }, // for instance, 'participantCounter'. Having the _id field just lets me keep multiple counters going, if I were to need that. Makes this counter collection more extensible.
  seq: { type: Number, default: 0 }, // this holds the actual numeric value of the counter, eg 0, 1, 2...
  //             // This ^^ default applies when you create a new document using Mongoose’s document creation (for example, with new Counter()) and then save it. But it doesn't apply for the documents created "on the fly" by findOneAndUpdate() (where upsert is true). Hence $inc handling that, inside findOneAndUpdate()
});

const CounterModel = mongoose.model('Counter', CounterSchema);
export default CounterModel;
