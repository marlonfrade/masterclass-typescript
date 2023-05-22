// need to import request and response, because express was not imported into this file
import { Request, Response } from "express";
// when the user signs up, a email service will be sent to his inbox
import EmailService from "../services/EmailServices";

const users = [{ name: "Marlon", email: "marlonteste@gmail.com" }];

export default {
  //[fix] - need to understand more about async inside the export default
  //this function will be requested by the routes, so need to be async
  async index(req: Request, res: Response) {
    return res.json(users);
  },

  // function create user
  async create(req: Request, res: Response) {
    const emailService = new EmailService();

    // function sendMail has two parameters
    emailService.sendMail({
      to: {
        name: "Marlon Frade",
        email: "marlonteste@gmail.com",
      },
      message: {
        subject: "Bem vindo ao sistema",
        body: "Seja bem vindo",
      },
    });

    //just return a success
    return res.send();
  },
};
