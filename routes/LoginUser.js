import express from "express";
import { PasswordHash } from "../helpers/PassHash.js";
import OptUser from "../modules/User.js";
import {body} from "express-validator";
import { generateOTP } from "../helpers/PassHash.js";
import { data } from "../env.js";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import emailValidator from "email-validator";

const router = express.Router();

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const useremail = req.body.name;
    if (!emailValidator.validate(useremail)) {
      return res.status(400).send({ message: "Enter a valid email" });
    }
    if (!emailValidator.validate(useremail, { checkDNS: true })) {
      return res.status(400).send({ message: "Enter a valid email" });
    }
    const hashedPassword = await PasswordHash(req.body.password);
    try {
      const OTP = generateOTP();
      const registeruser = await OptUser.create({
        name: req.body.name,
        password: hashedPassword,
        otp: OTP,
      });
      let config = {
        service: "gmail",
        auth: {
          user: data.EMAIL,
          pass: data.PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
        },
      });

      let response = {
        body: {
          name: req.body.name,
          intro: "You have received an OTP",
          table: {
            data: [
              {
                item: "This is your login OTP",
                description: `Your OTP is ${OTP}`,
              },
            ],
          },
          outro: "Enter your OTP carefully!",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: data.EMAIL,
        to: req.body.name,
        subject: "Your OTP",
        html: mail,
      };

      transporter.sendMail(message);

      return res.status(201).send({
        success: true,
        message: "Sign up successful",
        registeruser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export default router;
