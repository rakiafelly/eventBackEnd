const express = require('express');
const Company = require('../models/company');

const router = express.Router();

exports.getAllCompany=async (req, res, next) => {
    const company = await Company.find();
    res.send(company);
}

exports.getCompanyById= async(req, res, next) => {
    const company=await Company.findById(req.params.id);
    res.send(company);
    
}

exports.createCompany=async(req, res, next) => {
    const company=await Company.create(req.body);
    res.send(company)
    }

    exports.updateCompany=async(req, res, next) => {
        const company=await Company.findByIdAndUpdate(req.params.id,req.body) 
        res.send(company);
        
        }

        exports.deleteCompany=async (req, res, next) => {
            const company=await Company.findByIdAndRemove(req.params.id);
            res.send(company);
            
            }