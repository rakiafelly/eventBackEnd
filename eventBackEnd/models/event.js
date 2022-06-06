const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    eventName: {
        type: String,
        required: [true, 'Name fiels is required'],
    },
    eventDescription: {
        type: String,
         required: [true, 'Description is required'],
    },
    startDate: {
        type: String,
        required: [true, 'The start date is required'],
    },
    endDate: {
        type: String,
        required: [true, 'the end date is required'],
    },
    startTime: {
        type: Date,
        required: [true, 'The start time is required'],

    },
    endTime: {
        type: Date,
        required: [true, 'The end time is required'],
    },
    photo: {
        type: String,
         required: [false, 'Photo is required'],
    },
    price: {
        type: String,
         required: [true, 'Price is required'],
    },
    availableTicketNumber: {
        type: Number,
         required: [true, 'Number of ticket is required'],
    },
    eventType: {
        type: String,
         required: [true, 'Type of event is required'],
    },
    location: {
        type: String,
         required: [true, 'location is required'],
    },
})
const Event= mongoose.model('event',eventSchema);
module.exports=Event;