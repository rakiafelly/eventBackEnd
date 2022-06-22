const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/company');
const nodemailer = require('nodemailer');
const Token = require('../models/token');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const randomString = require('randomstring');

exports.registre = async (req, res) => {
  try {
    const user = await Company.findOne({ email:req.body.email })
    if (user != null) {
      res.status(400).send({ message: "email already used" })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password=hash
      await Company.create(req.body);
      res.send({ message: 'register succssefully' });
    }

  } catch (err) {
    res.status(500).json({ message: 'erreur interne dans le serveur' })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await Company.findOne({ email: req.body.email })
    if (user == null) {
      res.status(400).send({ message: 'email or password are incorrect' })
    }
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          userId: user._id
        }, 'secret', { expiresIn: '1d' });
        res.send({
          message: 'login successfully', token: token
        })
      }
      else {
        res.status(400).send({ message: 'email or password are incorrect' })
      }
    }
  }
  catch (err) {
    res.status(500).json({ message: 'erreur interne dans le serveur' })

  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const user = await Company.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: 'user not exist' })
    }
    else {
      const token = await Token.findOne({ userId: user._id });
      if (token) {
        await token.deleteOne()
      };
      const resetToken = randomString.generate(30)
      const createdToken = await new Token({
        userId: user._id,
        token: resetToken,
      }).save();

      const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
        secure: true,

      });
      const templatePath = path.resolve('./templates', 'forgetPassword.html');
      const forgetTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' })
      const render = ejs.render(forgetTemplate, { name: user.firstName, link: `http://localhost:4200/#/reset-password/${createdToken.token}` })
      const info = await transporter.sendMail({
        from: ' event <sahbigara10@gmail.com>', // sender address
        to: req.body.email,
        subject: "Password reset",
        html: render
      });
      //envoyer un email ,restauration de compte

      res.json({ message: 'reset password email is sent' })
    }

  }
  catch (err) {
    res.status(500).json({ message: 'internal error in server' })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    let passwordResetToken = await Token.findOne({ token: req.body.token });
    if (!passwordResetToken) {
      res.status(400).json({ message: "Invalid or expired password reset link" });
    }
    else {
      const currentDate = new Date();
      const expireTime = new Date(passwordResetToken.createdAt)
      const diff = currentDate - expireTime
      const seconds = Math.floor(diff / 1000);
      if (seconds < 900) {
        const bcryptSalt = process.env.BCRYPT_SALT;
        const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
        await Company.updateOne(
          { _id: passwordResetToken.userId },
          { $set: { password: hash } },
          { new: true }
        );
        const user = await Company.findById(passwordResetToken.userId);
        await passwordResetToken.deleteOne();
        const transporter = nodemailer.createTransport({
          port: 465,               // true for 465, false for other ports
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
          secure: true,

        });
        const templatePath = path.resolve('./templates', 'resetPassword.html');
        const resetTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' })
        const render = ejs.render(resetTemplate, { link: `http://localhost:4200/#/login` })
        const info = await transporter.sendMail({
          from: ' event <sahbigara10@gmail.com>', // sender address
          to: user.email,
          subject: "Password reset",
          html: render
        });
        res.status(200).json({ message: 'Successfully reset' })
      } else {
        await passwordResetToken.deleteOne();
        res.status(401).json({ message: 'Invalid or expired password reset link' })
      }
    }
  }

  catch (err) {
    res.status(500).json({ message: 'internal error in server' })

  }
}
