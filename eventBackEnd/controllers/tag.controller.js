const Tag = require('../models/tag');
exports.getAllTAgs = async (req, res, next) => {
    const tag = await Tag.find()
    res.send(tag)
}

exports.getTagBYId = async (req, res, next) => {
    const tag = await Tag.findById(req.params.id);
    res.send(tag);

}

exports.createTag = async (req, res, next) => {
    const tag = await Tag.create(req.body);
    res.send(tag)
}

exports.updateTagById = async (req, res, next) => {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body)
    res.send(tag);

}

exports.deleteTag = async (req, res, next) => {
    const tag = await Tag.findByIdAndRemove(req.params.id);
    res.send(tag);

}