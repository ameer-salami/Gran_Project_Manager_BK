import express, { type Express, type Request, type Response } from 'express';

// const connectDB = require('./config/db');
import connectDB from "./config/db.js"
import workspaceRoutes from "./routes/workspaceRoutes.js"
import boardRoutes from './routes/boardRoutes.js'
import listRoutes from './routes/listRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import dotenv from 'dotenv'
dotenv.config();

  
  const app: Express = express();
  connectDB();
  app.use(express.json());
  app.use('/gran_proj_mng', workspaceRoutes)
  app.use('/gran_proj_mng', boardRoutes)
  app.use('/gran_proj_mng', listRoutes)
  app.use('/gran_proj_mng', taskRoutes)

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
