import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secondbrain';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.get('/', (_req: Request, res: Response) => {
//   res.json({ message: 'Welcome to the SecondBrain API!' });
// });

// // Connect to MongoDB and start server
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log('Successfully connected to MongoDB.');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//     console.log('Attempting to start server without MongoDB connection...');
    
//     // Start server anyway so the user can verify the HTTP server works
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT} (MongoDB connection failed)`);
//     });
//   });

app.post("/api/v1/signup", (req, res) => {

})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {
  
})

app.delete("/api/v1/content", (req, res) => {
  
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {
  
})