// route.js
// Each route defines a url that a client of the API can hit to either retrieve data or send new data to be stored.
// Our API will listen to requests at these routes and respond accordingly, usually by calling one of the controller methods we defined above.
// They all await a function in the controller file and handle sending res which is the response back to the client.

import { Router } from 'express';

// import * as Posts from './controllers/post_controller';
import * as Participants from '../controllers/controller';

const router = Router();

// here we set up handling of endpoints
// each route will talk to a controller and return a response

router.post('/participants', async (req, res) => {
  // const roomInitInfo = req.body;

  try {
    const result = await Participants.createRoom(participantInitInfo); // see controller for what's needed? I guess just their f00? &...
    return res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.patch('/participants/:id', async (req, res) => { // :id indicates pattern matching, allowing this router.patch to handle multiple routes. EG, GET /participants/42
    const participantId = req.params.id;
    const { roomKey, status } = req.body;

// NEXT I WANT TO SEE WHERE THE GET /participant/24 would be typed. Does that go in my zustand somewhere?

// default index route. It's what you'd get if you typed in the URL. Currently it's not set up for getting anything (returning any results). It hoards them like Smaug.
router.get('/', (req, res) => {
  res.json({ message: 'welcome to Luke\'s memory test api!' });
});

export default router;
