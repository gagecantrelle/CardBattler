import express from 'express'
import db from './db'
import router from './routes';
import path, { dirname } from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';


dotenv.config();

const app = express()
const port: number = 8080;
const DIST_PATH = path.resolve(__dirname, '../Client/dist');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env

const isLoggedIn = (req: any, res: any, next: any) =>{
  req.user ? next() : res.sendStatus(401)
}

app.use(express.json())
app.use(router)
app.use(express.static(DIST_PATH))

app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

interface User {
  id: number;
  google_id: string | number;
  user_name: string | null;
  ligthOrDark: boolean;

}

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:8080/auth/google/callback",
  },
  function(accessToken: String, refreshToken: String, profile: Profile, cb: (err: any, user?: Express.User) => void) {
    console.log('my google profile', profile)
      return cb(null, profile)
  }
));


passport.serializeUser((user, doneCB) => {
  doneCB(null, user);
});


passport.deserializeUser((user, doneCB) => {
  doneCB(null, user);
});



app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'consent',
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', 
    { failureRedirect: '/login'}),
      (req, res) => {
        res.redirect('/Home');
      }
);

app.listen(port, ()=>{
  console.log(`listing on port ${port}`)
  db.runSQLFile()
  .then(()=>{})
  .catch((err)=>{
    console.error('❌ERROR server: ', err)
  })
})

export default port