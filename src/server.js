import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/router'; // when importing a default route you can name it whatever you want router, routes, apiRoutes, etc.
// unused imports, explained below by Tim
// import path from 'path';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary. Allows requests from my frontend, while testing locally.
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
// app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
// app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
// app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API.
// Note: This code is using Express’s built-in body-parsing middleware. In older versions of Express, you’d use a separate package called body-parser to handle this.
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// additional init stuff should go before hitting the routing

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api (handy bc the routes are eventually going to be ambidextrous.app/api/...)
// this should go AFTER body parser
app.use('/api', apiRoutes);

// START THE SERVER, now using mongoose
// =============================================================================
async function startServer() {
  try {
    // connect DB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/ambi'; // lets you connect to mongoDB in two different environments. The first is provided by mongoDB Atlas & is copy/pasted into Render, which Render then provides. The second is for using your local mongoDB daemon, while testing. I guess this line of code provides the name?
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);

    const port = process.env.PORT || 9090; // again, enables two different environments.
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();

// testing:
// curl -X GET "http://localhost:9090/api"
// curl -X POST "http://localhost:9090/api/nth/no-ID"
