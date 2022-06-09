const Event = require('../models/event');
exports.getAllEvent = async (req, res, next) => {
    const event = await Event.find()
    res.send(event)
}

exports.getTagById = async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    res.send(event);
}

exports.createEvent = async (req, res, next) => {
    const event = await Event.create(req.body);
    res.send(event)
}

exports.updateEvent= async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body)
    res.send(event);

}

exports.deleteEvent = async (req, res, next) => {
    const event = await Event.findByIdAndRemove(req.params.id);
    res.send(event);

}