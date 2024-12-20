import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { socketCtrl } from './controllers/socket.controller.js';
import documentRouter from './routes/document.routes.js';
import userRouter from './routes/user.routes.js';
import dbConnect from './utils/dbConnect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents', documentRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const server = app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketCtrl(io);
