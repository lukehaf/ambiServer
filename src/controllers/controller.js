// controller.js
// contains the methods which perform all the main functionality of our API. (Create, read, update, delete.)

import Participant from '../models/participant_model';
// so, I need CRUD by participant. Create participant, read participant, update participant, delete participant.

export async function createParticipant(f00) {
  // await creating a post
  // return post
  /// /////////////////////////////////////////////////
// - append another Results to the end of the array? (or more procedurally: get the length, and use that as the nthParticipant # and array index?)
// GO FIND TIM'S EXAMPLE. HOW TO WRITE THE CREATE FUNCTION? DOES IT APPEND A DOCUMENT TO THE COLLECTION? WHAT DO?

  /// /////////////////////////////////////////////////
  // Create participant:
  // - IF they're not in sandbox mode, & IF they entered a Dartmouth ID that's not already taken.
  // - so, I need 2 versions:
  // - - version 1: create a Results, in the case where they don't submit a Dartmouth ID. Simply return them their nthParticipant #, and add a null entry at that array Index, for the duration of them taking the test.
  // - - version 2: create a Results, in the case where they submit a Dartmouth ID. (check that it's a valid format, and that it doesn't already exist.) Return them their nthParticipant # & a "proceed" message, or "invalid format", or "f00 already taken."

}

// Update a participant: Add some more columns to their row. First their row gets their nthParticipant # and Date of first contact, then it gets their Results object, then it gets their selfreport Qs.
export async function updatePost(id, postFields) {
  // await updating a post by id
  // return *updated* post
}
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
// export async function deleteParticipant(id) {
//   // await deleting a post
//   // return confirmation
// }
