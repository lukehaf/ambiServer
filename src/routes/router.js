// route.js

// Each action (in Zustand store) connects to a unique route in route.js.
// Zustand is not the place for code-reuse; route.js is where you do that. route.js lets you combine the more-granular controllers into conglomerates (one for each route).

import { Router } from 'express';

import * as Participants from '../controllers/controller'; // These are the controllers. Access them via Participants.createParticipant();
import Participant from '../models/participant_model'; // This is the model. You can treat it as if it's the collection itself, to find a particular document within it. Most of the time I try to keep this kind of business logic siloed away in controller.js
// import createParticipant from '../controllers/controller';

const router = Router();

// handle each route. Forward its __ into "request" and return to __ the "response".
// router CRUD verbs (used here in router): get, post, put, patch, delete. // post = create. // put = fully replace. // patch = partial replace.
// axios CRUD verbs (in zustand store): get, post, put, patch delete. // With post, put, & patch you need to supply an object with key,value data. The keys are accessible as keys under req.body. For get & delete you can also supply an object, but IDK why. for delete the ID usually just goes in the url?

// default route. It's what you'd get if you typed in the URL. Currently it's not set up for getting anything (returning any results). It hoards them like Smaug.
router.get('/', (req, res) => {
  res.json({ message: 'welcome to Luke\'s memory test api!' });
});

// create a participant, for participants with no Dartmouth ID. return the participant that was created, for its nthParticipant key for the frontend.
router.post('/nth/no-ID', async (req, res) => {
  try {
    // First, create the participant. It's added to the MongoDB collection, and the saved version is returned for further use here.
    const savedParticipant = await Participants.createParticipant();

    // Then, update the participant's ID using the result from the first call
    const updatedParticipant = await Participants.updateParticipantID({
      nthParticipant: savedParticipant.nthParticipant,
      f00: null,
    });

    // Return the updated participant document. It will become the "data" object under response.data.
    // First though, convert the Mongoose document to a plain object. (Mongoose documents have internal properties (like $_doc$) that you usually don't want to send to the client)
    const participantObj = updatedParticipant.toObject();
    return res.json(participantObj);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

// create a participant, for participants who have a Dartmouth ID. return the participant that was created, for its nthParticipant key for the frontend. Also return serverSays: invalid, taken, or proceed.
router.post('/nth/with-ID', async (req, res) => {
  // Ensure that req.body.studentID is a valid format. If not, return early.
  const { studentID } = req.body;
  if (!/^f00[a-zA-Z0-9]{4}$/.test(studentID)) {
    return res.json({ serverSays: 'invalid' });
  }

  try {
    // Ensure this studentID hasn't already been submitted.
    const duplicate = await Participant.findOne({ studentID });
    if (duplicate) {
      return res.json({ serverSays: 'taken' });
    }

    // First, create the participant. It's added to the MongoDB collection, and the saved version is returned for further use here.
    const savedParticipant = await Participants.createParticipant();

    // Then, update the participant's ID using the result from the first call
    const updatedParticipant = await Participants.updateParticipantID({
      nthParticipant: savedParticipant.nthParticipant,
      f00: req.body.studentID,
    });

    // Convert the Mongoose document to a plain object. (Mongoose documents have internal properties (like $_doc$) that you usually don't want to send to the client)
    const participantObj = updatedParticipant.toObject();

    // Return the updated participant document with an extra key
    return res.json({ ...participantObj, serverSays: 'proceed' });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

// find this nthParticipant's document and add the results object. If a results object already exists, overwrite it, since we're assuming the new results object is more recent.
router.patch('/results', async (req, res) => {
  const { nthParticipant, results } = req.body;
  try {
    const success = await Participants.updateParticipantResults({
      nthParticipant,
      results,
    });
    return res.json(success);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

// find this nthParticipant's document and add the survey object. If a results object already exists, overwrite it, since we're assuming the new results object is more recent.
router.patch('/survey', async (req, res) => {
  const { nthParticipant, survey } = req.body;
  try {
    const success = await Participants.updateParticipantSurvey({
      nthParticipant,
      survey,
    });
    return res.json(success);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});
export default router;
