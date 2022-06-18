const Event = require('../models/event');
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
        const eventFound=await Event.findOne({title:req.body.eventName});
        if(eventFound==null){
        const event = await Event.create(req.body);
        res.json({ message: 'created succssefully' });}
        else{
            res.status(400).json({message:'Event already exist'})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated succssefully' });
    }
    catch (err) {
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
