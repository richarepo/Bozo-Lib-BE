import express from 'express';
import dbConnection from './db/connection';
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
import mainRoute from "./routes/index";

app.use(express.json());
app.use("/", mainRoute);

dbConnection.once('open', (err) => {
  if (err) throw err;
});

app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});