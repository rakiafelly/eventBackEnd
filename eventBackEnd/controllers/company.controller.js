const express = require('express');
const Company = require('../models/company');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event=require('../models/event')

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



exports.getAllCompany = async (req, res, next) => {
    try {
        //  console.log(req.user);
        const company = await Company.find();
        res.send(company);
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ message: 'server error' })

    }
}

exports.getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        res.send(company);

    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.createCompany = async (req, res, next) => {
    try {
        const companyFound = await Company.findOne({ companyName: req.body.companyName });
        if (companyFound == null) {
            const company = await Company.create(req.body);
            res.json({ message: 'created succssefully' });
        }
        else {
            res.status(400).json({ message: 'Company already exist' })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated succssefully' });
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndRemove(req.params.id);
        res.json({ message: 'deleted succssefully' });


    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        let response=[]
        events.forEach(event=>{
            response.push( { label: event.eventName, value: event._id })
        })   
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

exports.getCompany=async(req,res)=>{
    try{
        // const connectedCompany=await Company.findById(req.params.id);
        res.json(connectedCompany)
    }

    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}