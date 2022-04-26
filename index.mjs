import dotenv from 'dotenv';
import console from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './server/index.mjs';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.listen(PORT, () => console.log(`webapp running on port ${PORT}`));
