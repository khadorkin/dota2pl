import { Router } from 'express';
const router = new Router();





const handleSteamResponse = async (req, res) => {

  const authenticateSteamResponse = (req) => {
    return new Promise((res, rej) => {
      passport.authenticate('steam', (err, usr) => {
        if (err) {
          rej(err);
        } else {
          res(usr);
        }
      })(req);
    });
  }

  try {
    const user = await authenticateSteamResponse(req);
    // res.send(user);
    res.json(user);
  } catch (e) {
    res.json({ token: false });
  }
}

router.route('/auth/steam').get(passportInstance.authenticate('steam'))


app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', handleSteamResponse);