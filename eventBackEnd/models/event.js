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
        type: Date,
        required: [true, 'The start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'the end date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'The start time is required'],

    },
    endTime: {
        type: String,
        required: [true, 'The end time is required'],
    },
    photo: {
        type: String,
         required: [false, 'Photo is not required'],
    },
    price: {
        type: Number,
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