const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Name fiels is required'],
    },
    description: {
        type: String,
         required: [true, 'Description is required'],
    }
})
const Tag= mongoose.model('tag',tagSchema);
module.exports=Tag;
