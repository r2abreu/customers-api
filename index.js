import server from "./config/server";
import "./config/database";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running`);
});
