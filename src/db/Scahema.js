const mongoose = require('mongoose');


const  Api_Schema = new mongoose.Schema({

    productname : {
        type : String,
        require : true
    },

    desc : {
        type : String,
        require : true
    },

    images : {
        type : String,
     
    },
    
})

const  Api_data = mongoose.model('products' , Api_Schema);

module.exports = Api_data;