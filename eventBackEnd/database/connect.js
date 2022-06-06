const mongoose=require('mongoose');
//connect to database
mongoose.connect('mongodb://localhost/database').then(succes=>{
    console.log('succes to connect to database');
}).catch(error=>{
    console.log('failed to connect to database');
})