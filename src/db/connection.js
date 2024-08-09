
const mongoose = require('mongoose');

 const mongo  = mongoose.connect('mongodb://127.0.0.1/E-commerce').then(() =>{
    console.log('MongoDB connected')
}).catch((err) => {
    console.log(err)
})

module.exports = mongo;



