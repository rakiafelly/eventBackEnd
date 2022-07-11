const express = require('express');
const Reservation = require('../models/reservation');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
var pdf = require("pdf-creator-node");
const randomString = require('randomstring');
const Event=require('../models/event');

exports.createReservation = async (req, res, next) => {
  try {
    const event=await Event.findById(req.params.id)
    console.log(event.availableTicketNumber);
    
    const reservation = await Reservation.create(req.body);
    const templatePath = path.resolve('./templates', 'reservation.html');
    const reservationTemplate = fs.readFileSync(templatePath, { encoding: 'utf-8' })
    const render = ejs.render(reservationTemplate, { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email })
    const Document = {
      html: render,
      data: {
        users: reservation,
      },
     path: path.resolve(`reservation.pdf`),
      type: "",
    };
    var options = {
    
     orientation: "landscape",
      border: "10mm"
    };
    pdf.create(Document, options).then(async (res) => {
      const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
        secure: true,
      });


      const info = await transporter.sendMail({
        from: ' event <sahbigara10@gmail.com>', // sender address
        to: req.body.email,
        subject: "Reservation",
        html: render,
        attachments: [
          {
            filename: 'reservation.pdf',
            content: fs.createReadStream(res.filename)
          },]
      });
    await Event.findByIdAndUpdate(req.params.id,{'$inc':{availableTicketNumber:-1}},{new:true})
    })
    

      res.json({ message: 'Reservation created successfully!' })
  }
  catch (err) {
    res.status(500).json({ message: 'server error' })

  }
}

