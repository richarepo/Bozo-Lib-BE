import express from 'express';
import dbConnection from './db/connection';
const app = express();
const port = 8000;
import mainRoute from "./routes/index";

app.use(express.json());
app.use("/", mainRoute);

dbConnection.once('open', (err, db) => {
  if (err) throw err;
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});