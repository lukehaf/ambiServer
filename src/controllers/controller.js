// controller.js
// contains the methods which perform all the main functionality of our API. (Create, read, update, delete.) The controllers are supposed to be as granular as possible, to promote code-reuse by router.js

import Participant from '../models/participant_model';
// so, I need CRUD by participant. Create participant, read participant, update participant, delete participant.

async function createParticipant() { // get the length of the collection of documents, and append one, and return the nthParticipant/index of this document. // add a null entry for f00 to show they don't have one.
  const participant = new Participant(); // uses the schema! Now all the mongoose methods are available for it, accessible via participant.save(), participant.find(), etc. https://mongoosejs.com/docs/queries.html
  // Now we just have to save the object (so far we’ve been working with a new instance purely in memory).
  try {
    const savedParticipant = await participant.save(); // The save() method returns a promise. If save() succeeds, the promise resolves to the document that was saved. // you can also .save(someCallbackFunction), for it to execute once complete. But that's optional.
    return savedParticipant; // the document that was saved. Perfect! It's an object with a key called nthParticipant.
  } catch (error) {
    throw new Error(`createParticipant error: ${error}`);
  }
}

export default createParticipant;

// // Update a participant: Add some more columns to their row. First their row gets their nthParticipant # and Date of first contact, then it gets their Results object, then it gets their selfreport Qs.
// export async function updateParticipantID(id, postFields) {
//   // await updating a post by id
//   // return *updated* post
// }
/// ////////////////////////////////////////////////////////////////
// Read participant: I guess for the data analysis? Read out the whole array? It's not needed by the frontend, that's for sure. What happens if I create this Read functionality later?
// // can I update my src/controllers/controller.js while render is hosting the mongoDB instance? I should be able to. Ask chatGPT later, once I have a little better language for all this.

// Delete a participant: unnecessary, for now. Some people won't complete their test, and they'll just have an empty row. That's fine.
// // Eventually I'll take down all the Results, for data privacy reasons, and anonymize it/strip it of f00s and names, and put it back up.
/// ////////////////////////////////////////////////////////////////

// export async function getParticipants() {
//   // await finding posts
//   // return posts
// }
// export async function getParticipant(id) {
//   // await finding one post
//   // return post
// }
// it would be so easy to accidentally delete data from the backend. Let's not have that be a possibility.
// export async function deleteParticipant(id) {
//   // await deleting a post
//   // return confirmation
// }
