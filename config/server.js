import express from "express";
import setRoutes from "./routes";
import bodyParser from "body-parser";
const server = express();

server.use(bodyParser.json());

setRoutes(server);

export default server;
