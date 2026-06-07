import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { ContentModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secondBrain';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.get('/', (_req: Request, res: Response) => {
//   res.json({ message: 'Welcome to the SecondBrain API!' });
// });

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Attempting to start server without MongoDB connection...');

    // Start server anyway so the user can verify the HTTP server works
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (MongoDB connection failed)`);
    });
  });

app.post("/api/v1/signup", async (req, res) => {

  //add Zod  validation here and hash the password
  const username = req.body.username;
  const password = req.body.password;
  
  try {
    await UserModel.create({
      username: username,
      password: password
  })

  res.json({
    message: "User is signed Up"
  })
  } catch(e){
    res.json({
      message: "user already exists"
    })
  }

})

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password
  })

  if(existingUser){
    const token = jwt.sign({
      id: existingUser._id
    }, JWT_PASSWORD)

    res.json({
      token
    })
  } else {
    res.status(403).json({
      message: "incorrect credentials"
    })
  }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    userId: (req as any).userId, // Cast req to any to resolve the TypeScript error
    tags: []
  })
  
  res.json({
    message: "Content added successfully"
  })
})

// app.get("/api/v1/content", (req, res) => {

// })

// app.delete("/api/v1/content", (req, res) => {

// })

// app.post("/api/v1/brain/share", (req, res) => {

// })

// app.get("/api/v1/brain/:shareLink", (req, res) => {

// })