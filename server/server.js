import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import getWord from "./utils/getWords.js"
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import rateLimit from 'express-rate-limit'
import User from "./model/userModel.js"
import WordModel from "./model/wordsModel.js"
import generateToken from "./utils/generateToken.js"
import http from "http"
import axios from "axios"
// import Limiter from './middleware/Limiter.js';


const app = express();
connectDB();
dotenv.config();

const wordMiddleware = async (_req, res, next) => {
  try {
    http.get({ host: 'api.ipify.org', port: 80, path: '/' }, function (resp) {
      resp.on('data', async function (ip) {
        const location = await getLocation(ip.toString());
        if (!location?.canAccess) {
          return res
            .status(401)
            .send(
              `Your location ${location.country} cannot access our service`
            );
        }
      });
    });
    next();
  } catch (error) {
    next(error);
  }
};

// app.use(Limiter)
app.use(express.json());
 

app.get('/search', [wordMiddleware], async (req, res) => {
  try {
    const response = await getWord(req.query.word);
    if (response && response.length > 0) {
      return res.send(response);
    }
    res.status(404).send('No result found');
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get('/get-favorite/:word', wordMiddleware, async (req, res) => {
  try {
    const response = await getWord(req.params.word);
    if (response && response.length > 0) {
      return res.send(response);
    }
    res.status(404).send('No result found');
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post('/add-favorite', async (req, res) => {
  try {
    if (!req.body?.word) {
      return res.status(400).send('Word is required');
    }
    const word = await WordModel.create(req.body);
    res.send(word);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get('/get-favorites', async (req, res) => {
  try {
    const words = await WordModel.find({});
    res.send(words);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.delete('/remove-favorite/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    if (!req.params?.id) {
      return res.status(400).send('Id of the word is required');
    }
    const word = await WordModel.findByIdAndDelete(req.params.id);
    res.send(word);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});


// app.get("/profile", async (req, res) => {
//   let user = await User.findById(req.user.id).select('-password');
//   if (user) {
//     user = user.toObject();
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('User Not Found');
//   }
// });


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    const newUser = user.toObject();
    res.json({
      ...newUser,
      password: undefined,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

app.post("/register", async (req, res) => {
  const { firstname, lastname,middlename, email, password} =  req.body;
  
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send('User already exists');
    }

    const user = new User({
      firstname,
      lastname,
      middlename,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  } 
});

const getLocation = async (ip) => {
  const key = process.env.LOCATION_API_KEY;
  const url = process.env.LOCATION_API_URL;
  console.log('location: ', ip);
  try {
    const { data } = await axios.get(`${url}?ip=${ip}&auth=${key}`);
    if (!data) throw Error('Can not resolve IP');
    return {
      canAccess: ['Nigeria', 'United States'].some((c) => c === data.country),
      country: data.country,
    };
  } catch (error) {
    throw Error(error);
  }
};


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} mode`));
