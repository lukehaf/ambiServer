import { Router } from 'express';

/// ////////////////////////////////////////////
// go find out what a post is like, in the controller :)
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

/// your routes will go here

export default router;
