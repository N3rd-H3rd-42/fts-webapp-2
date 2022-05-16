import dotenv from 'dotenv';
import console from 'console';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routerRoutes from './server/index.mjs';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { initializePassportStrategy } from './config/passport.mjs';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const {
  ADMIN_ID,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_NAME,
  SESSION_SECRET,
  NODE_ENV,
  MONGO_URI,
} = process.env;

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const users = [
  {
    id: ADMIN_ID,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    name: ADMIN_NAME,
  },
];

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

initializePassportStrategy(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

mongoose.connect(MONGO_URI, {}, () => console.log('db conntected'));

app.use('/', routerRoutes);
app.listen(PORT, () =>
  console.log(`webapp running in ${NODE_ENV} mode on port ${PORT}`)
);
