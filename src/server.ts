import express, { type Express, type Request, type Response } from 'express';

// const connectDB = require('./config/db');
import connectDB from "./config/db.js"
import workspaceRoutes from "./routes/workspaceRoutes.js"
import boardRoutes from './routes/boardRoutes.js'
import listRoutes from './routes/listRoutes.js'
// import path from 'path';
// console.log(`db configuration done.`)
// const authRoutes = require('./routes/authRoutes');

// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();

// const app = express();
// app.use('/api/auth', authRoutes);

// Simple route
// app.get('/', (req, res) => {
  // ;  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // });
  
  
  const app: Express = express();
  connectDB();
  app.use(express.json());
  app.use('/gran_proj_mng', workspaceRoutes)
  app.use('/gran_proj_mng', boardRoutes)
  app.use('/gran_proj_mng', listRoutes)

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
