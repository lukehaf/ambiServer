// route.js

// Each action (in Zustand store) connects to a unique route in route.js.
// Zustand is not the place for code-reuse; route.js is where you do that. route.js lets you combine the more-granular controllers into conglomerates (one for each route).

import { Router } from 'express';

// import * as Participants from '../controllers/controller';
// then access via Participants.createParticipant();
import createParticipant from '../controllers/controller';

const router = Router();

// handle each route. Forward its __ into "request" and return to __ the "response".
// router CRUD verbs (used here in router): get, post, patch, delete.
// axios CRUD verbs (in zustand store): get, post, put, delete. // With post & put you need to supply an object with key,value data. These are passed into the "request" body.

// default route. It's what you'd get if you typed in the URL. Currently it's not set up for getting anything (returning any results). It hoards them like Smaug.
router.get('/', (req, res) => {
  res.json({ message: 'welcome to Luke\'s memory test api!' });
});

// create a participant, for participants with no Dartmouth ID. return the participant that was created, for its nthParticipant key for the frontend.
router.post('/nth/no-ID', async (req, res) => {
  try {
    // First, create the participant. It's added to the MongoDB collection, and the saved version is returned for further use here.
    const savedParticipant = await createParticipant();

    /// ///////////
    const updatedParticipant = savedParticipant;
    // // Then, update the participant's ID using the result from the first call
    // const updatedParticipant = await Participants.updateParticipantID({
    //   nthParticipant: savedParticipant.nthParticipant,
    //   f00: null,
    // });

    // Return the updated participant document
    return res.json(updatedParticipant);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

// // create a participant, for participants who have a Dartmouth ID. return the participant that was created, for its nthParticipant key for the frontend.
// /// //////////////////////////////////////////
// // - - version 2: create a Participant, in the case where they submit a Dartmouth ID. (check that it's a valid format, and that it doesn't already exist.) Return them their nthParticipant # & a "proceed" message, or "invalid format", or "f00 already taken."
// router.post('/nth/no-ID', async (req, res) => {
//   try {
//     // First, create the participant. It's added to the MongoDB collection, and the saved version is returned for further use here.
//     const savedParticipant = await Participants.createParticipant();

//     // Then, update the participant's ID using the result from the first call
//     const updatedParticipant = await Participants.updateParticipantID({
//       nthParticipant: savedParticipant.nthParticipant,
//       f00: req.body.f00, // make sure to pass the f00 as a key of the object. EG: // With POST and PUT you need to supply an object with key,value data. Something like the following would work: const fields = {title: 'test', content:'blah blah', coverUrl: 'http://someimage.gif', tags: 'testing123'}; const result = await axios.post(`${ROOT_URL}/posts${API_KEY}`, fields);
//     });

//     // Return the updated participant document
//     return res.json(updatedParticipant);
//   } catch (error) {
//     return res.status(422).json({ error: error.message });
//   }
// });

// router.patch('/participants/:id', async (req, res) => { // :id indicates pattern matching, allowing this router.patch to handle multiple routes. EG, GET /participants/42
//   const participantId = req.params.id;
//   const { roomKey, status } = req.body; // note how the ID from the url is under params, rather than body.
// });
// NEXT I WANT TO SEE WHERE THE GET /participant/24 would be typed. Does that go in my zustand somewhere?

export default router;
