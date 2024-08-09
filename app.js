const  express = require('express');
const Api_data = require('./src/db/Scahema');
const path = require('path');
const multer = require('multer')
const bodyparser = require('body-parser');
const { trusted } = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const { resourceLimits } = require('worker_threads');
const cloudinary = require('cloudinary').v2 


require('./src/db/connection');

const  app = express();
const port = process.env.PORT || 3000;
const static_path = path.join('./API_Pracice/views')
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended : true}));

app.use(bodyparser.urlencoded({extended : true , parameterLimit : 1000000  , limit  : "500mb"}))
app.use(express.static(static_path))
app.use(bodyparser.json({limit: '500mb'}))

app.use(cors({
    origin : 'http://localhost:3001'
}));

// THIS IS FOR CLOUD  STRIRAGE
app.use(fileupload({ useTempFiles : true }))

// Return "https" URLs by setting secure: true
cloudinary.config({ secure: true });
cloudinary.config({ 
    cloud_name: 'de2nzvcrd', 
    api_key: '825669894714912', 
    api_secret: 'oF8KTSpoHsYcBYiA7mo-pJDAgtA' 
  });
 




app.set( 'view engine' , "hbs")

app.get('/' , (req , res) => {
     res.send({
        "name" : "my hn "
     });
});

app.get('/uploaddata' , async(req , res) => {
    try {
        const datafind = await Api_data.find(); 
   
            res.status(200).json(datafind)
        
        
    } catch (error) {
           res.status(400).send(error)
    }
      
})

// const storage = multer.diskStorage({
//     destination : function (req , file , cb){
//         cb(null , './src/uploads')
//     },
//     filename : function (req , file , cb){
       
//        cb(null , `${Date.now}-${file.originalname}`)
//     }
// })
// const upload = multer({storage :  storage})
// app.post('/uploadform' ,  upload.single('images'), async(req , res , next) =>{
app.post('/uploadform' ,  async(req , res) =>{
     
    try {
        console.log(req.body)
      

        const file = req.files.images
        console.log(file)
        cloudinary.uploader.upload(file.tempFilePath , async(err , result) => {
            const Create_API = new Api_data({
                productname : req.body.productname,
                desc : req.body.desc,
                images : result.url,
            }) 
        
            const data = await Create_API.save();
            
           if(data){ 
            res.status(200).json({
            message : "ho gya upoload"
            })
    }
        })
    
 
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }

});



app.listen( port , ()=>{
    console.log(`express starated ${port}`)
});