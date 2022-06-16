const express = require('express');
const Company = require('../models/company');

const router = express.Router();

exports.getAllCompany=async (req, res, next) => {
  try{  const company = await Company.find();
    res.send(company);
}
catch(err){
    res.status(500).json({ message: 'server error' })

}
}

exports.getCompanyById= async(req, res, next) => {
try{    const company=await Company.findById(req.params.id);
    res.send(company);
    
}
catch(err){
    res.status(500).json({ message: 'server error' })

}
}

exports.createCompany=async(req, res, next) => {
try{    const company=await Company.create(req.body);
    res.json({ message: 'created succssefully' });

    }
catch(err){
    res.status(500).json({ message: 'server error' })

}
}

    exports.updateCompany=async(req, res, next) => {
try{        const company=await Company.findByIdAndUpdate(req.params.id,req.body) 
        res.json({ message: 'updated succssefully' });

        
        }
        catch(err){
            res.status(500).json({ message: 'server error' })

        }
    }

        exports.deleteCompany=async (req, res, next) => {
    try{        const company=await Company.findByIdAndRemove(req.params.id);
            res.json({ message: 'deleted succssefully' });

            
            }
            catch(err){
                res.status(500).json({ message: 'server error' })

            }
        }