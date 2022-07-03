const express = require('express');
const Event = require('../models/event');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.resolve('./uploads');
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const newFileName = Date.now() + extension;
        const link='http://localhost:3000/uploads/'+newFileName;
        cb(null, newFileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.png', '.jpeg', '.jpg']
    const extension = path.extname(file.originalname);
    cb(null, allowedFileExtensions.includes(extension));
}
exports.imgUpload =multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 52428800,
    },
});

exports.getAllEvent = async (req, res, next) => {
    try {
        const event = await Event.find()
        res.send(event)
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.getTagById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        res.send(event);
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.createEvent = async (req, res, next) => {
    try {
        const eventFound = await Event.findOne({ eventName: req.body.eventName });
        if (eventFound == null) {
            req.body.photo = req.body.photo
            await Event.create(req.body);
            res.json({ message: ' Event created succssefully' });
        }
        else {
            res.status(400).json({ message: 'Event already exist' })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' })

    }
}

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated succssefully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' })
    }
}

exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndRemove(req.params.id);
        res.json({ message: 'deleted succssefully' });
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}
