import { Router } from "express";
import UserController from "./controllers/UserController";
const routes = Router();

// we don't need to type the req, res cause it's typed by inference
routes.get("/", (req, res) => {
  return res.send("Hello World");
});

routes.get("/users", UserController.index);

routes.post("/users", UserController.create);

export default routes;
