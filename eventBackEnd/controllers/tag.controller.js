const Tag = require('../models/tag');
exports.getAllTAgs = async (req, res, next) => {
    try {
        const tag = await Tag.find()
        res.json(tag)
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

exports.getTagBYId = async (req, res, next) => {
    try {
        const tag = await Tag.findById(req.params.id);
        res.json(tag);
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

exports.createTag = async (req, res, next) => {
    try {
        const tag = await Tag.create(req.body);
        res.json({ message: 'created succssefully' });
    } catch (err) {
        res.status(500).json({ message: 'server error' })

    }
}

    exports.updateTagById = async (req, res, next) => {
        try {
            const tag = await Tag.findByIdAndUpdate(req.params.id, req.body)
            res.json({ message: 'updated succssefully' });

        } catch (err) {
            res.status(500).json({ message: 'server error' })

        }
    }

    exports.deleteTag = async (req, res, next) => {
        try {
            const tag = await Tag.findByIdAndRemove(req.params.id);
            res.json({ message: 'deleted succssefully' });

        }
        catch (err) {
            res.status(500).json({ message: 'server error' })

        }
    }
