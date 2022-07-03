const express = require('express');
const Reservation = require('../models/reservation');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const randomString = require('randomstring');

exports.createReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.create(req.body);
        const transporter = nodemailer.createTransport({
          port: 465,               // true for 465, false for other ports
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
          secure: true,
        });
        const templatePath = path.resolve('./templates', 'reservation.html');
        const reservationTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' })
        const render = ejs.render(reservationTemplate, { link: `http://localhost:4200/#/reservation` })
        const info = await transporter.sendMail({
          from: ' event <sahbigara10@gmail.com>', // sender address
          to: req.body.email,
          subject: "Reservation",
          html: render
        });
        res.status(200).json({ message: 'Successfully reservation' })
      }
      
     catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}
