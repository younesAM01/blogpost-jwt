const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.URI;


mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database: ',error);
  });
 app.use('/users',userRouter)
  app.use('/blogs/',postRouter)
 












  app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`)
})