const mongoose=require('mongoose');
//connect to database
mongoose.connect('mongodb://localhost/27017').then(succes=>{
    console.log('succes to connect to database');
}).catch(error=>{
    console.log('failed to connect to database');
})