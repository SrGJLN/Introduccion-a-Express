import express from 'express';
import cors from 'cors';
import {logger} from 'logger-express'
import cancionesRoutes from './routes/cancionesRoutes.js'
import path from 'path'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger())

app.use('/', cancionesRoutes)

app.get('/', (req, res) => {
  res.sendFile(path.resolve("index.html"))
});

app.listen(PORT, console.log(`Server on http://localhost:PORT: ${PORT}`));

