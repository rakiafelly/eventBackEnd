const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'Name fiels is required'],
    },
    companyDescription: {
        type: String,
         required: [true, 'Description is required'],
    },
    email: {
        type: String,
        required: [true, 'email fiels is required'],
    },
    password: {
        type: String,
        required: [true, 'Password fiels is required'],
    },
    role: {
        type: String,
        default:'Admin',
    },
    photo: {
        type: String,
        required: [false, 'photo fiels is not required'],
        default:'https://imgur.com/a/NZPQy90',
    },
    events:[
        {
            type:Schema.Types.ObjectId,
            ref:"event"
        }
    ]
})
const Company= mongoose.model('company',companySchema);
module.exports=Company;
