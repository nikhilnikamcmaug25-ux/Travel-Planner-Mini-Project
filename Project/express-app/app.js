import express from 'express';
import {connectDb} from './src/configs/DbConfig.js';

const app = express();


app.get("/", (req, res) => {
  res.send("Hello, Express is running!");
});

app.listen(3000, () => {
  connectDb();
});
