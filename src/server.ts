import express, { type Express, type Request, type Response , type Application } from 'express';

// const connectDB = require('./config/db');
import connectDB from "./config/db.js"
import workspaceRoutes from "./routes/workspaceRoutes.js"
import boardRoutes from './routes/boardRoutes.js'
import listRoutes from './routes/listRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import dotenv from 'dotenv'
import Logger from './util/logger.js';
import cors, {type  CorsOptions } from 'cors';
dotenv.config();

  
  const app: Application= express();

  const corsOptions:CorsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed custom headers
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

  connectDB();
  app.use(express.json());
  app.use('/gran_proj_mng', workspaceRoutes)
  app.use('/gran_proj_mng', boardRoutes)
  app.use('/gran_proj_mng', listRoutes)
  app.use('/gran_proj_mng', taskRoutes)

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!');
  Logger.info("Main route accessed.")
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
