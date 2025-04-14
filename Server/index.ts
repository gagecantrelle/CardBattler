import express from 'express'
import db from './db'
import obj from './routes';
import path, { dirname } from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';
import axios from 'axios';



dotenv.config();

const app = express()
const port: number = 8080;
const DIST_PATH = path.resolve(__dirname, '../Client/dist');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env

const isLoggedIn = (req: any, res: any, next: any) =>{
  req.user ? next() : res.sendStatus(401)
}

app.use(express.json())
app.use(
  session({
    secret: 'your_session_secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 365},
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(obj.router)
app.use(express.static(DIST_PATH))
interface User {
  id: number;
  google_id: string | number;
  user_name: string | null;
  ligthOrDark: boolean;
 real: boolean;
}

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:8080/auth/google/callback",
  },
  function(accessToken: String, refreshToken: String, profile: Profile, cb: (err: User, user?: Express.User | false) => void) {
    obj.users.findOne({where:{google_id: profile.id}})
    .then((data)=>{
      const userSession = {
        google_id: profile.id,
        user_name: profile.displayName,
        ligthOrDark: true,
        real: data === null ? false : true
      };
      return cb(null, userSession)
    })
    .catch((err)=>{
      const userSession = {
        google_id: profile.id,
        user_name: profile.displayName,
        ligthOrDark: true,
        real: false
      };
      return cb(null, userSession)
    })  
  }
  
));


passport.serializeUser((user: User, doneCB) => {
  doneCB(null, user);
});


passport.deserializeUser((user, doneCB) => {
  doneCB(null, user)
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'consent',
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', 
    { failureRedirect: '/login',
      successRedirect: '/'
    })
);

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null, message: 'Not authenticated'});
  }
});

app.listen(port, ()=>{
  console.log(`listing on port ${port}`)
  db.runSQLFile()
  .then(()=>{})
  .catch((err)=>{
    console.error('❌ERROR server: ', err)
  })
})

export default port