const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const reservationSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Name fiels is required'],
    },
    lastName: {
        type: String,
         required: [true, 'Description is required'],
    },
    email: {
        type: String,
         required: [true, 'Description is required'],
    },
})
const Reservation= mongoose.model('reservation',reservationSchema);
module.exports=Reservation;
