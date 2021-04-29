import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI;
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    console.log("Establishing new connection with:", url);
    mongoose
      .connect(url, connectionParams)
      .then(() => console.log("Connected to database"))
      .catch((err) => console.log(`Error connecting to database: \n${err}`));
  }
}

export default new Connection();
