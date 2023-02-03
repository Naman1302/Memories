import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/posts.js';
const PORT       = 5000;


dotenv.config();

//==================App Config==================

const app = express();
app.use(bodyParser.json({limit :"30mb", extended : true}));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());

//===========Database Connection===========

mongoose
  .connect(process.env.db_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

  mongoose.set('useFindAndModify', false);
//=====================================

//==============Routes=================


app.get('/',(req,res)=>{
  res.send("Hello There");
});

//--------Posts--------
app.use('/posts',postRoutes);
//---------------------
app.get('*', (req, res) => {
      res.redirect('/');
  });

//=====================================
