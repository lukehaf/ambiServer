// participant_model.js
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose, { Schema } from 'mongoose'; // If your ESLint is running from a different directory (e.g., your home folder instead of the project root), it may not detect mongoose correctly. Try running ESLint explicitly from your project root:
import Counter from './counter_model';

// create a ParticipantSchema
export const ParticipantSchema = new Schema({
  // Each participant will submit the following fields sequentially. That's the point of an UPDATE rather than a CREATE.
  nthParticipant: { type: Number, unique: true }, // unique true: If you try to insert a new Participant with an nthParticipant value that already exists, MongoDB will reject the insertion with a duplicate key error.
  // timestamp for first contact: Mongoose can create this automatically! I'll use it to know if a Participant document is in-progress vs abandoned.
  Results: { type: mongoose.Schema.Types.Mixed },
  SelfReportQs: { type: mongoose.Schema.Types.Mixed },
}, {
  timestamps: true, // In Mongoose, setting the timestamps option (e.g., { timestamps: true }) automatically adds two fields—createdAt and updatedAt—to your documents
  toObject: { virtuals: true }, // Both toObject and toJSON are transformation options available in Mongoose schemas. They allow you to customize how a Mongoose document is converted into a plain JavaScript object or a JSON object, respectively.
  toJSON: { virtuals: true }, // For instance, specifying { virtuals: true } in these options means that any virtual properties defined on the schema (computed values not stored in the database) will be included in the output.
});

ParticipantSchema.pre('save', async function assignNthParticipant(next) { // some middleware to run before each Participant document is saved. Assigns a value to nthParticipant. // having nthParticipant: {required: true} was breaking it, or requiring that it be initialized with something, or that the middleware had to be run pre 'validate' rather than just pre 'save'
  if (this.isNew) { // this.isNew: a built-in property of mongoose. Is false if the document already exists and is being updated. Makes sure that nthParticipant is only assigned upon document creation, not updates.
    try {
      // Atomically increment the counter
      const counter = await Counter.findOneAndUpdate( // Finds a matching document in the Counter collection, updates it according to the update arg, passing any options. A Query object is returned.
        // format: A.findOneAndUpdate(conditions, update, options)
        { _id: 'participantCounter' }, // conditions to match.
        { $inc: { seq: 1 } }, // updater rule. // $inc is a MongoDB update operator that increments a numeric field by a given value.
        { new: true, upsert: true }, // some options. // options.upsert: true: if no documents found, insert a new document
        //                                            // options.new: true: return the modified document rather than the original
      );
      // Subtract 1 if you want to start at 0
      this.nthParticipant = counter.seq - 1;
      next(); // required by mongoose middleware. Relinquishes control by the middleware.
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// create ParticipantModel class from schema
const ParticipantModel = mongoose.model('Participant', ParticipantSchema);

export default ParticipantModel;

// remember: In MongoDB, a collection of documents is like a table of rows. So I'll have one Participant document per participant. & I'll have a collection of participants.
